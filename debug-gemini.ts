import { ai } from "./src/utils/gemini";

console.log("Keys of ai object:", Object.keys(ai));
console.log("Prototype of ai object:", Object.getPrototypeOf(ai));
try {
  // @ts-ignore
  console.log("ai.models:", ai.models);
} catch (e) {}
