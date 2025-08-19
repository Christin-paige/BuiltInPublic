import z from 'zod';

export const updateProjectSchema = z.object({
  update: z.string().min(1).max(255),
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
