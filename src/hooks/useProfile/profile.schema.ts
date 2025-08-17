import z from 'zod';

// Schema function for user profile display name
export const displayNameSchema = z.object({
  displayName: z.string().min(2).max(50).regex(/^[a-zA-Z' ]+$/, "Can only contain letters, apostrophes, and spaces")
});

// Schema function for user profile bio
export const bioSchema = z.object({
  bio: z.string().max(256).regex(/^[a-zA-Z0-9'.,!?" ]*$/, "Can only contain letters, numbers, and punctuation").optional()
});

export type DisplayNameSchema = z.infer<typeof displayNameSchema>;
export type BioSchema = z.infer<typeof bioSchema>;
