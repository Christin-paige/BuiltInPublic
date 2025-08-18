import { z } from 'zod';

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().min(2).max(500).optional(),
  status: z
    .enum(['planning', 'in-progress', 'on-hold', 'completed', 'launched'])
    .optional(),
  visibility: z.enum(['public', 'private']).optional(),
  externalUrl: z.url().optional(),
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
