import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/index";
import { things } from "@/db/schema";
import { and, ilike } from "drizzle-orm";
export const appRouter = createTRPCRouter({
  itemsGetMany: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { location, name } = input;

      const result = await db
        .select()
        .from(things)
        .where(and(ilike(things.name, name), ilike(things.location, location)));

        return result;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
