import { thingsImages, users } from "@/db/schema";
import { db } from "@/index";
import { client } from "@/utils/upstash";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        thingId: z.string().uuid(),
        description: z.string(),
      }),
    )
    .middleware(async ({ req, input }) => {
      const { userId: clerkId } = await auth();

      console.log({ clerkId });

      if (!clerkId) {
        throw new UploadThingError({
          code: "NOT_FOUND",
          message: "clerk id not found !!",
        });
      }

      const [user] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.clerkId, clerkId));

      if (!user || !user.id) {
        throw new UploadThingError({
          code: "BAD_REQUEST",
          message: "User not authorized",
        });
      }

      return {
        userId: user.id,
        ...input,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      await db
        .insert(thingsImages)
        .values({ thingId: metadata.thingId, url: file.ufsUrl });

      console.log("file url", file.ufsUrl);

      client.trigger({
        url: `${process.env.UPSTASH_WORKFLOW_URL}/api/workflow`,
        retries: 0,
        body: { description: metadata.description, thingId: metadata.thingId },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
