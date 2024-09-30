/** @format */

"use server";

import { auth } from "@clerk/nextjs/server";
import { userProfileSchema } from "./types/user-profile";
import { db } from "./db";
import { User, UserProfile, userProfile } from "./db/schema";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { generatedExercises } from "@/app/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUserProfile(formData: any) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const dataWithUserId = { ...formData, userId };

    // const validatedData = userProfileSchema.parse(formData);
    const validatedData = userProfileSchema.parse(dataWithUserId);
    console.log("Validated data:", validatedData);

    // Check if user exists in the User table
    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.id, userId))
      .execute();

    if (existingUser.length === 0) {
      throw new Error("User not found in database");
    }

    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId))
      .execute();

    if (existingProfile.length > 0) {
      // Update existing profile
      await db
        .update(userProfile)
        .set({
          ...validatedData,
          userId, // Ensure userId is added explicitly if needed
        })
        .where(eq(userProfile.userId, userId));
    } else {
      // Generate a unique ID for the new profile
      const id = crypto.randomUUID(); // Generate a UUID for the profile ID

      // Insert new profile
      await db.insert(userProfile).values({
        id, // Include the generated ID
        ...validatedData, // Include other validated fields
      });
    }

    revalidatePath("/personalized-exercise");
    return { success: true, message: "Profile created/updated successfully" };
  } catch (error) {
    console.error("Error creating/updating user profile", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to create/update profile" };
  }
}

const apiKey = `AIzaSyAc3aClnonmqBoCZ8zLdFZyWjSd-qMD3DQ`;
const genAI = new GoogleGenerativeAI(apiKey);

type UserWithProfile = User & {
  profile: UserProfile | null;
};

type Exercise = {
  name: string;
  description: string;
  setsAndReps: string;
  equipment: string;
};

type GeneratedExercises = {
  id: string;
  userId: string;
  exercises: Exercise[];
  createdAt: Date;
};

async function generateExercises(
  gender: string,
  goal: string,
  focusArea: string
): Promise<Exercise[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Generate a list of 5 exercises for a ${gender} who wants to ${goal} and focus on ${focusArea}. 
      For each exercise, provide:
      1. name of the exercise
      2. brief description
      3. number of sets and reps
      4. any equipment needed
      Format the response as a JSON array with lowercase keys: name, description, setsAndReps, equipment.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  // Remove any Markdown code block formatting
  text = text.replace(/```json\n?/, "").replace(/\n?```$/, "");

  // Trim any whitespace
  text = text.trim();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedExercises = JSON.parse(text) as any[];

    // Transform and validate the structure of each exercise
    const validatedExercises: Exercise[] = parsedExercises.map((exercise) => {
      const transformedExercise: Exercise = {
        name: exercise.name || exercise.Name,
        description: exercise.description || exercise.Description,
        setsAndReps: exercise.setsAndReps || exercise["Sets and Reps"],
        equipment: exercise.equipment || exercise.Equipment,
      };

      if (
        typeof transformedExercise.name !== "string" ||
        typeof transformedExercise.description !== "string" ||
        typeof transformedExercise.setsAndReps !== "string" ||
        typeof transformedExercise.equipment !== "string"
      ) {
        throw new Error("Invalid exercise structure");
      }
      return transformedExercise;
    });

    return validatedExercises;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    console.error("Raw AI response:", text);
    throw new Error("Failed to generate valid exercises");
  }
}

export async function getPersonalizedExercises(
  userId: string
): Promise<GeneratedExercises> {
  try {
    // Fetch user
    const user = await db.query.User.findFirst({
      where: eq(User.id, userId),
    });

    if (!user) {
      throw new Error(`User not found for ID: ${userId}`);
    }

    // Fetch user profile
    const profile = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, userId),
    });

    if (!profile) {
      throw new Error(`Profile not found for user ID: ${userId}`);
    }

    // Generate exercises
    const exercises = await generateExercises(
      profile.gender || "",
      profile.goal || "",
      profile.focusArea || ""
    );

    // Save exercises to the database
    const [savedExercise] = await db
      .insert(generatedExercises)
      .values({
        id: uuidv4(),
        userId: user.id,
        exercises: exercises,
      })
      .returning();

    if (!savedExercise) {
      throw new Error("Failed to save generated exercises");
    }

    return {
      id: savedExercise.id,
      userId: savedExercise.userId,
      exercises: savedExercise.exercises as Exercise[],
      createdAt: savedExercise.createdAt,
    };
  } catch (error) {
    console.error("Error in getPersonalizedExercises:", error);
    throw error;
  }
}

export async function getLatestExercisesForUser(
  userId: string
): Promise<GeneratedExercises | null> {
  try {
    const latestExercises = await db.query.generatedExercises.findFirst({
      where: eq(generatedExercises.userId, userId),
      orderBy: [desc(generatedExercises.createdAt)],
    });

    if (!latestExercises) {
      return null;
    }

    return {
      id: latestExercises.id,
      userId: latestExercises.userId,
      exercises: latestExercises.exercises as Exercise[],
      createdAt: latestExercises.createdAt,
    };
  } catch (error) {
    console.error("Error fetching latest exercises:", error);
    throw error;
  }
}
