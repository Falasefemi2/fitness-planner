/** @format */

import { db } from "@/app/db";
import { User } from "@/app/db/schema";
import { currentUser } from "@clerk/nextjs/server";
// import { eq } from "drizzle-orm";

// export async function CheckUser() {
//   try {
//     const user = await currentUser();
//     console.log("Current user from auth:", user);

//     if (!user) {
//       console.log("No authenticated user found");
//       return null;
//     }

//     // Check if user is in db
//     const existingUser = await db
//       .select()
//       .from(User)
//       .where(eq(User.id, user.id))
//       .limit(1);

//     if (existingUser.length > 0) {
//       console.log("Existing user found in database:", existingUser[0]);
//       return existingUser[0];
//     } else {
//       console.log("User not found in database, creating new user");
//       const newUser = {
//         id: user.id,
//         clerkId: user.id,
//         email: user.emailAddresses[0]?.emailAddress ?? "",
//         profileImageUrl: user.imageUrl ?? "",
//         firstName: user.firstName ?? "",
//         lastName: user.lastName ?? "",
//       };

//       const insertedUser = await db.insert(User).values(newUser).returning();
//       console.log("New user created:", insertedUser[0]);
//       return insertedUser[0];
//     }
//   } catch (error) {
//     console.error("Error in CheckUser:", error);
//     return null;
//   }
// }

export async function CheckUser() {
  try {
    const user = await currentUser();
    console.log("Current user from auth:", user);

    if (!user) {
      console.log("No authenticated user found");
      return null;
    }

    // Directly create a new user if not found in the DB
    const newUser = {
      id: user.id,
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      profileImageUrl: user.imageUrl ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    };

    // Insert the new user into the database
    const insertedUser = await db.insert(User).values(newUser).returning();
    console.log("New user created:", insertedUser[0]);
    return insertedUser[0];
  } catch (error) {
    console.error("Error in CheckUser:", error);
    return null;
  }
}
