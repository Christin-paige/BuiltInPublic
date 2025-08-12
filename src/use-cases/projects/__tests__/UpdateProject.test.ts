import { describe } from 'node:test';
import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, vi } from 'vitest';

const mockSupabase = {
  from: (table: string) => mockSupabase,
  update: vi.fn().mockResolvedValue({ error: null, data: { id: 'test-id' } }),
} as unknown as SupabaseAnonClient;

const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  update: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('Use case - UpdateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
