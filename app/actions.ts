/** @format */

"use server";

import { auth } from "@clerk/nextjs/server";
import { userProfileSchema } from "./types/user-profile";
import { db } from "./db";
import { User, userProfile } from "./db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

    revalidatePath("/");
    return { success: true, message: "Profile created/updated successfully" };
  } catch (error) {
    console.error("Error creating/updating user profile", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to create/update profile" };
  }
}
