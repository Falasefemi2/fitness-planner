/** @format */

import { relations, type InferSelectModel } from "drizzle-orm";
import {
  jsonb,
  pgTableCreator,
  text,
  timestamp,
  // uuid,
  varchar,
} from "drizzle-orm/pg-core";
// import { InferModel } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `fitness_${name}`);

// Define tables first
export const User = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
});

export const userProfile = pgTable("user_profiles", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  gender: text("gender"),
  goal: text("goal"),
  focusArea: text("focus_area"),
});

export const generatedExercises = pgTable("generated_exercises", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  exercises: jsonb("exercises").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Define types
export type User = InferSelectModel<typeof User>;
export type UserProfile = InferSelectModel<typeof userProfile>;
export type GeneratedExercise = InferSelectModel<typeof generatedExercises>;

// Define relations after all tables are defined
export const userRelations = relations(User, ({ one }) => ({
  profile: one(userProfile, {
    fields: [User.id],
    references: [userProfile.userId],
  }),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(User, {
    fields: [userProfile.userId],
    references: [User.id],
  }),
}));

export const generatedExercisesRelations = relations(
  generatedExercises,
  ({ one }) => ({
    user: one(User, {
      fields: [generatedExercises.userId],
      references: [User.id],
    }),
  })
);
