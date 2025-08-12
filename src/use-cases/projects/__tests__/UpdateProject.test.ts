import { describe } from 'node:test';
import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, vi } from 'vitest';

const mockUpdate = vi.fn();
const mockSupabase = {
  from: (table: string) => mockSupabase,
  update: mockUpdate,
} as unknown as SupabaseAnonClient;

const mockUpdateFails = vi.fn();
const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  update: mockUpdateFails,
} as unknown as SupabaseAnonClient;

describe('Use case - UpdateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdate.mockResolvedValue({ error: null, data: { id: 'test-id' } });
    mockUpdateFails.mockResolvedValue({
      error: { message: 'violation or whatever', code: 'string' },
    });
  });
});
