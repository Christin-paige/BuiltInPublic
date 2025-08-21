import { z } from 'zod';

// Schema function for user profile display name
export const displayNameSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be no more than 50 characters')
    .regex(
      /^[a-zA-Z'\- ]+$/,
      'Can only contain letters, apostrophes, hyphens, and spaces'
    )
    .optional(),
});

// Schema function for user profile bio
export const bioSchema = z.object({
  bio: z
    .string()
    .max(300, 'Bio must be no more than 300 characters')
    .optional(),
});

export type DisplayNameSchema = z.infer<typeof displayNameSchema>;
export type BioSchema = z.infer<typeof bioSchema>;
