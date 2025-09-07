import { SupabaseAnonClient } from 'utils/supabase/server';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { UserConsent } from '../UserConsent';

const mockSupabase = {
  schema: (schemaName: string) => mockSupabase,
  from: (table: string) => mockSupabase,
  insert: vi.fn().mockResolvedValue({ error: null }),
} as unknown as SupabaseAnonClient;

const mockSupabaseFails = {
  schema: (schemaName: string) => mockSupabaseFails,
  from: (table: string) => mockSupabaseFails,
  insert: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('UserConsent use case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success: true when insert succeeds', async () => {
    const userConsent = new UserConsent(mockSupabase);

    const actual = await userConsent.execute({
      userId: 'testuser',
      userAgent: 'mozilla',
      policyId: 'policyid',
      ipAddress: '192.168.0.1',
      consentMethod: 'checkbox',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Consent added');
  });

  it('returns success: false when insert fails', async () => {
    const userConsent = new UserConsent(mockSupabaseFails);

    const actual = await userConsent.execute({
      userId: 'testuser',
      userAgent: 'mozilla',
      policyId: 'policyid',
      ipAddress: '192.168.0.1',
      consentMethod: 'checkbox',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Cannot insert user consent');
  });
});
