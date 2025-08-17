import z from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(2).max(100),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
