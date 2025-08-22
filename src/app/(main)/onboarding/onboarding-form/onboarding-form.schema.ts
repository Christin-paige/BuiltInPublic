import emojiRegex from 'emoji-regex';
import { z } from 'zod';

export const onboardingFormSchema = z.object({
  userName: z
    .string()
    .min(3, {
      message: 'Username must contain at least 3 characters',
    })
    .max(32, {
      message: 'Username cannot be longer than 32 characters',
    })
    .refine((name) => /^[a-z0-9_-]+$/.test(name) && !emojiRegex().test(name), {
      message:
        'Username must only contain lowercase letters, numbers, _ and - symbols',
    }),
  displayName: z
    .string()
    .min(3, {
      message: 'Display name must contain at least 3 characters',
    })
    .max(32, {
      message: 'Display name cannot be longer than 32 characters',
    }),
  bio: z.string().max(300, {
    message: 'bio cannot cannot be longer than 300 characters',
  }),
});

export type OnboardingFormSchema = z.infer<typeof onboardingFormSchema>;
