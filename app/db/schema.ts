/** @format */

import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  text,
  timestamp,
  // uuid,
  varchar,
} from "drizzle-orm/pg-core";

// const pgTable = pgTableCreator((name) => `fitness_${name}`);

// export const User = pgTable("users", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   profileImageUrl: text("profile_image_url"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
//   firstName: varchar("first_name", { length: 100 }).notNull(),
//   lastName: varchar("last_name", { length: 100 }).notNull(),
// });

// export const userProfile = pgTable("user_profiles", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   userId: varchar("user_id", { length: 255 })
//     .notNull()
//     .references(() => User.id),
//   gender: text("gender"),
//   goal: text("goal"),
//   focusArea: text("focus_area"),
// });

const pgTable = pgTableCreator((name) => `fitness_${name}`);

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
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .unique()
    .references(() => User.id),
  gender: text("gender"),
  goal: text("goal"),
  focusArea: text("focus_area"),
});

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
