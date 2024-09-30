/** @format */

// /** @format */

// import { db } from "@/app/db";
// import { generatedExercises, User } from "@/app/db/schema";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { eq } from "drizzle-orm";
// import { v4 as uuidv4 } from "uuid";

// // const apiKey = `AIzaSyAc3aClnonmqBoCZ8zLdFZyWjSd-qMD3DQ`;
// // const genAI = new GoogleGenerativeAI(apiKey);

// // type Exercise = {
// //   name: string;
// //   description: string;
// //   setsAndReps: string;
// //   equipment: string;
// // };

// // type UserWithProfile = {
// //   id: string;
// //   profile: {
// //     gender: string;
// //     goal: string;
// //     focusArea: string;
// //   } | null;
// // };

// // type GeneratedExercises = {
// //   id: string;
// //   userId: string;
// //   exercises: Exercise[];
// //   createdAt: Date;
// // };

// // async function generateExercises(
// //   gender: string,
// //   goal: string,
// //   focusArea: string
// // ): Promise<Exercise[]> {
// //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// //   const prompt = `Generate a list of 5 exercises for a ${gender} who wants to ${goal} and focus on ${focusArea}.
// //       For each exercise, provide:
// //       1. Name of the exercise
// //       2. Brief description
// //       3. Number of sets and reps
// //       4. Any equipment needed
// //       Format the response in JSON.`;

// //   const result = await model.generateContent(prompt);
// //   const response = await result.response;
// //   const text = response.text();

// //   try {
// //     return JSON.parse(text) as Exercise[];
// //   } catch (error) {
// //     console.error("Error parsing AI response:", error);
// //     throw new Error("Failed to generate valid exercises");
// //   }
// // }

// // export async function getPersonalizedExercises(
// //   userId: string
// // ): Promise<GeneratedExercises> {
// //   try {
// //     // Fetch user and profile information
// //     const user = await db.query.User.findFirst({
// //       where: eq(User.id, userId),
// //       with: {
// //         profile: true,
// //       },
// //     }) as UserWithProfile | undefined;

// //     if (!user || !user.profile) {
// //       throw new Error("User or profile not found");
// //     }

// //     // Generate exercises
// //     const exercises = await generateExercises(
// //       user.profile.gender,
// //       user.profile.goal,
// //       user.profile.focusArea
// //     );

// //     // Save exercises to the database
// //     const [savedExercise] = await db
// //       .insert(generatedExercises)
// //       .values({
// //         id: uuidv4(),
// //         userId: user.id,
// //         exercises: exercises,
// //       })
// //       .returning();

// //     return savedExercise as GeneratedExercises;
// //   } catch (error) {
// //     console.error("Error generating personalized exercises:", error);
// //     throw error;
// //   }
// // }

// // export async function getLatestExercisesForUser(
// //   userId: string
// // ): Promise<GeneratedExercises | null> {
// //   try {
// //     const latestExercises = await db.query.generatedExercises.findFirst({
// //       where: eq(generatedExercises.userId, userId),
// //       orderBy: (generatedExercises, { desc }) => [
// //         desc(generatedExercises.createdAt),
// //       ],
// //     }) as GeneratedExercises | undefined;

// //     return latestExercises || null;
// //   } catch (error) {
// //     console.error("Error fetching latest exercises:", error);
// //     throw error;
// //   }
// // }
