import { Client } from "@upstash/workflow";
console.log({token : process.env.QSTASH_TOKEN});

// export const client = new Client({ token: process.env.QSTASH_TOKEN! });
export const client = new Client({ token: process.env.QSTASH_TOKEN! });
