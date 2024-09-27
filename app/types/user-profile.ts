/** @format */

import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  gender: z.enum(["male", "female"]),
  goal: z.enum(["lose-weight", "build-muscle", "keep-fit"]),
  focusArea: z.enum(["upper-body", "lower-body", "full-body"]),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
