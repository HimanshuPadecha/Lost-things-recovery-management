import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  clerkId: text("clerk_id").notNull(),
  profileImage: text("profile_image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const things = pgTable("things", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  location : text("location").notNull(),
  description: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const thingsImages = pgTable("thing_images", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  thingId: uuid("thing_id")
    .references(() => things.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  thingId: uuid("thing_id")
    .references(() => things.id, { onDelete: "cascade" })
    .notNull(),
  questionText: text("question_text").notNull(),
  answerText: text("answer_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const meetings = pgTable("meetings", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ownerId: uuid("owner_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  founderId: uuid("founder_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  thingId: uuid("thing_id")
    .references(() => things.id, { onDelete: "cascade" })
    .notNull(),
  location: text("location").notNull(),
  meetingTime: timestamp("meeting_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
