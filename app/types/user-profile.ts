/** @format */

import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  gender: z.enum(["male", "female"]),
  goal: z.enum(["lose-weight", "build-muscle", "keep-fit"]),
  focusArea: z.enum(["Full-Body", "Arm", "Chest", "Abs", "Leg"]),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
