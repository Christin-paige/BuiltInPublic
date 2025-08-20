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
    ),
});

// Schema function for user profile bio
export const bioSchema = z.object({
  bio: z
    .string()
    .max(256, 'Bio must be no more than 256 characters')
    .regex(/^[a-zA-Z0-9'.,!?":;()\-\s]*$/, 'Bio contains invalid characters')
    .optional(),
});

export type DisplayNameSchema = z.infer<typeof displayNameSchema>;
export type BioSchema = z.infer<typeof bioSchema>;
