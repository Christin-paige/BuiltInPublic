import { z } from 'zod';

const StagingAuthSchema = z.object({
  password: z.string().min(2).max(32),
});

export type StagingAuthSchemaType = z.infer<typeof StagingAuthSchema>;

export default StagingAuthSchema;
