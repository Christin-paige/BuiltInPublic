import { z } from 'zod';

// Schema function for user profile display name
export const displayNameSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be no more than 50 characters'),
});

// Schema function for user profile bio
export const bioSchema = z.object({
  bio: z
    .string()
    .min(1, 'Bio must be at least 1 character')
    .max(256, 'Bio must be no more than 256 characters'),
});

export type DisplayNameSchema = z.infer<typeof displayNameSchema>;
export type BioSchema = z.infer<typeof bioSchema>;
