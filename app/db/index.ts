/** @format */

// file: src/app/db/index.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { generatedExercises, User, userProfile } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { User, userProfile, generatedExercises },
});
