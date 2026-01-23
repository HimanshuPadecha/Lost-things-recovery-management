import { questions, thingsImages } from "@/db/schema";
import { db } from "@/index";
import { ai } from "@/utils/gemini";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import sharp from "sharp";

interface Input {
  thingId: string;
  description: string;
}

async function convertImage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const arrBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrBuffer);

    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    return compressedBuffer.toString("base64");
  } catch (error) {
    console.error("Image processing failed:", error);
    throw new Error("Failed to process image");
  }
}

export const { POST } = serve(async (context) => {
  const { thingId, description } = context.requestPayload as Input;

  if (!thingId) {
    throw new Error("thingId is required");
  }

  const images = await context.run("get-images", async () => {
    return db
      .select()
      .from(thingsImages)
      .where(eq(thingsImages.thingId, thingId));
  });

  if (!images.length) {
    throw new Error("No images found for this thing");
  }

  const buffers = await context.run("convert-images", async () => {
    return Promise.all(images.map((img) => convertImage(img.url)));
  });

  const seedData = await context.run("gemini-generate", async () => {
    const PROMPT = `The "Sherlock Holmes" Verifier
You need this first. This prompt takes the Founder's unstructured text/images and converts them into the "Secret Questions" you described in your flow.

Role: You are an expert forensic interrogator and item analyst.

Task: Analyze the provided description and image analysis of a found item. Your goal is to generate 10 specific "Trap Questions" to verify a potential owner.

Rules:

The Hidden Detail Rule: Questions must strictly focus on details not revealed in the public listing. (e.g., If the public listing says "Blue Wallet found in CP," do NOT ask "What color is it?". Ask "What is the 3rd digit of the credit card inside?" or "What brand is the gum wrapper in the coin pocket?").

Format: Generate simple text questions and the correct answers based on the founder's data.

Language: English (or specific locale if detected).

Input:

Item Description: {{finder_description}}

Detected Objects (from Image AI): {{image_labels}}

make sure to include the thingId in the schema : thingId : ${thingId}
also make sure to check the description to generate the questions : 
description : ${description}

Publicly Visible Info: {{public_title}}

  [
    {
      "thingId" : ${thingId},
      "questionText: "how much money is there in the wallet ? ",
      "answerText" : "500rs"
    }
    // ... enough question
  ]
`;

    const parts = [
      {
        text: PROMPT,
        
      },
      ...buffers.map((buffer) => ({
        inlineData: {
          mimeType: "image/webp",
          data: buffer,
        },
      })),
    ];

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts }],
    });

    if (!geminiResponse?.text) {
      throw new Error("Gemini returned empty response");
    }

    let parsed;
    try {
      parsed = JSON.parse(geminiResponse.text as string);
    } catch (error) {
      console.error("Gemini raw output:", geminiResponse.text);
      throw new Error("Gemini returned invalid JSON");
    }

    for (const q of parsed) {
      if (!q.thingId || !q.questionText || !q.answerText) {
        throw new Error("Invalid question schema detected");
      }
    }

    return parsed;
  });

  await context.run("seed-data", async () => {
    try {
      await db.insert(questions).values(seedData);
      console.log("Questions seeded successfully");
    } catch (error) {
      console.error("Database insert failed:", error);
      throw new Error("Failed to seed questions");
    }
  });

  return { success: true };
});
