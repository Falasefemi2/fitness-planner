/** @format */

"use server";

import { auth } from "@clerk/nextjs/server";
import { userProfileSchema } from "./types/user-profile";
import { db } from "./db";
import { userProfile } from "./db/schema";
import { revalidatePath } from "next/cache";

export async function createUserProfile(formData: FormData) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const rawFormData = Object.fromEntries(formData.entries());
    console.log("Raw Form Data:", rawFormData); // Add this line
    const validatedData = userProfileSchema.parse({ ...rawFormData, userId });

    await db.insert(userProfile).values(validatedData);
    revalidatePath("/");
    return { success: true, message: "Profile created successfully" };
  } catch (error) {
    console.error("Error creating user profile", error);
    return { success: false, message: "Failed to create profile" };
  }
}
