// This file tests business logic and authorization flaws related to the profiles table in Supabase.
// It ensures that custom rules, like only updating your own profile or validating unique constraints, are enforced properly.

import { describe, it, expect } from 'vitest';
import { authedClient, unauthClient } from '../testClients';

// Helper to get the current authenticated user's ID
const getAuthedUserId = async () => {
  const { data: userData } = await authedClient.auth.getUser();
  return userData.user?.id;
};

describe('Business Logic / Authorization Tests for Profiles Table', () => {
  // 🛑 Prevent unauthenticated users from updating any profile
  it('should not allow unauthenticated users to update a profile', async () => {
    const { data, error } = await unauthClient
      .from('profiles')
      .update({ username: 'hacker' })
      .eq('id', 'some-id')
      .select();

    expect(data).toBeNull();
    expect(error).toBeDefined();
  });

  // ✅ Authenticated users can update their own profile
  it('should allow authenticated users to update their own profile', async () => {
    const userId = await getAuthedUserId();

    const { data, error } = await authedClient
      .from('profiles')
      .update({ username: 'updated_user' })
      .eq('id', userId)
      .select();

    expect(Array.isArray(data)).toBe(true);
    expect(data?.[0].username).toBe('updated_user');
    expect(error).toBeNull();
  });

  // 🛑 Authenticated users should NOT be able to update someone else’s profile
  it("should not allow authenticated users to update other users' profiles", async () => {
    // Use a hardcoded, known-to-exist other user's ID (not your own)
    const otherUserId = '14049f2d-d59e-4628-bfc9-6c564f482c9d'; // Replace with a valid test user if needed

    const { data, error } = await authedClient
      .from('profiles')
      .update({ username: 'malicious_update' })
      .eq('id', otherUserId)
      .select();

    // ✅ Supabase returns empty array + no error if RLS silently blocks access
    expect(data).toEqual([]);
    expect(error).toBeNull();
  });

  // 🛑 Enforce unique constraint on username (assuming unique index exists)
  it('should not allow duplicate usernames', async () => {
    const userId = await getAuthedUserId();

    // First, set a known username
    await authedClient
      .from('profiles')
      .update({ username: 'taken_name' })
      .eq('id', userId);

    // Then try to insert another profile with the same username (simulate conflict)
    const { error } = await authedClient.from('profiles').insert({
      id: crypto.randomUUID(),
      username: 'taken_name',
    });

    expect(error).toBeDefined();
    expect(error?.message).toMatch(/duplicate|already exists/i);
  });

  // ✅ Authenticated users can read their own profile
  it('should allow authenticated users to read their own profile', async () => {
    const userId = await getAuthedUserId();

    const { data, error } = await authedClient
      .from('profiles')
      .select('*')
      .eq('id', userId);

    expect(Array.isArray(data)).toBe(true);
    expect(data?.[0]?.id).toBe(userId);
    expect(error).toBeNull();
  });

  // 🛑 Ensure private fields (e.g. email) are not exposed to unauthenticated users
  it('should not allow unauthenticated users to access sensitive profile data', async () => {
    const { data, error } = await unauthClient.from('profiles').select('*');

    expect(Array.isArray(data)).toBe(true);
    expect(data?.[0]?.email).toBeUndefined(); // assuming email is protected
    expect(error).toBeNull();
  });
});
