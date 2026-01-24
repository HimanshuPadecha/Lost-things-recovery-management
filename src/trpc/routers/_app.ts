import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/index";
import { meetings, things, thingsImages } from "@/db/schema";
import { and, eq, ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
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
        .where(and(ilike(things.name, name), ilike(things.location, location)))
        .leftJoin(thingsImages, eq(thingsImages.thingId, things.id))
        .limit(1);

      return result;
    }),

  addThing: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        location: z.string().nonempty(),
      }),
    )
    .mutation(async ({ input }) => {
      const { description, location, name } = input;
      console.log(description);
      console.log(location);
      console.log(name);

      const [thing] = await db
        .insert(things)
        .values({ description, location, name })
        .returning();

      if (!thing) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return thing;
    }),

  fetchThings: protectedProcedure.query(async () => {
    const fetched = await db
      .select()
      .from(things)
      .leftJoin(thingsImages, eq(thingsImages.thingId, things.id));
    console.log(fetched);

    return fetched || [];
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
