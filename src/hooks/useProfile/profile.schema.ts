import z from 'zod';

// Schema function for user profile display name
export const displayNameSchema = z.string().min(2).max(50).regex(/^[a-zA-Z' ]+$/, "Can only contain letters, apostrophes, and spaces");

// Schema function for user profile bio
export const bioSchema = z.string().max(256).regex(/^[a-zA-Z0-9'.,!?" ]*$/, "Can only contain letters, numbers, and punctuation").optional();