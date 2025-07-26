// This file tests Row Level Security (RLS) policies for the profiles table in Supabase

import { describe, it, expect } from 'vitest';
import { authedClient, unauthClient } from '../testClients';

// Create a new profile object
const newProfile = async () => {
  return {
    avatar_url: 'https://example.com/avatar.png' as string,
    username: 'testuser' as string,
    id: (await authedClient.auth.getUser()).data.user?.id,
  };
};

// Test suite for RLS policies on the profiles table
describe('RLS Policies for Profiles Table', async () => {
  // Test case: Ensure unauthenticated users cannot create profiles
  it('should not allow unauthenticated users to create profiles', async () => {
    // Create a new profile object
    const profile = await newProfile();

    // Use the unauthenticated client to attempt to insert a new profile
    const { data, error } = await unauthClient
      .from('profiles')
      .insert(profile)
      .select();

    // Expect no data and an error
    expect(data).toBeNull();
    expect(error).toBeDefined();
  });

  // Test case: Ensure unauthenticated users cannot read profiles
  it('should not allow unauthenticated users to read profiles', async () => {
    // Use the unauthenticated client to attempt to select profiles
    const { data, error } = await unauthClient.from('profiles').select();

    // Expect no data and an error
    expect(data).toEqual([]);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can read profiles
  it('should allow authenticated users to read profiles', async () => {
    // Use the authenticated client to select profiles
    const { data, error } = await authedClient.from('profiles').select('*');
    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });

  // Test case: Ensure unauthenticated users cannot update profiles
  it('should not allow unauthenticated users to update profiles', async () => {
    const { data: authData } = await authedClient.auth.getUser();
    const userId = authData.user?.id;

    // Use the unauthenticated client to attempt to update a profile
    const { data, error } = await unauthClient
      .from('profiles')
      .update({ username: 'updateduser' })
      .eq('id', userId)
      .select();

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can update their own profiles
  it('should allow authenticated users to update their own profiles', async () => {
    const { data: authData } = await authedClient.auth.getUser();
    const userId = authData.user?.id;

    // Use the authenticated client to update their own profile
    const { data, error } = await authedClient
      .from('profiles')
      .update({ username: 'updateduser' })
      .eq('id', userId)
      .select();

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(data?.length).toBe(1);
    expect(data?.[0].username).toBe('updateduser');
    expect(error).toBeNull();
  });

  // Test case: Ensure authenticated users cannot update others' profiles
  it("should not allow authenticated users to update others' profiles", async () => {
    const { data: profileData } = await authedClient
      .from('profiles')
      .select('*')
      .eq('id', '14049f2d-d59e-4628-bfc9-6c564f482c9d') // Some other user's ID
      .limit(1);

    const otherUserId = profileData?.[0]?.id;

    // Use the authenticated client to attempt to update the other user's profile
    const { data, error } = await authedClient
      .from('profiles')
      .update({ username: 'malicioususer' })
      .eq('id', otherUserId)
      .select();

    // Expect no data and an error
    expect(data).toBeNull();
    expect(error).toBeDefined();
  });

  // Test case: Ensure unauthenticated users cannot delete profiles
  it('should not allow unauthenticated users to delete profiles', async () => {
    const { data: profileData } = await authedClient
      .from('profiles')
      .select('*')
      .limit(1);

    const userId = profileData?.[0]?.id;

    // Use the unauthenticated client to attempt to delete a profile
    const { data, error } = await unauthClient
      .from('profiles')
      .delete()
      .eq('id', userId)
      .select();

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users cannot delete their own profiles or others' profiles
  it("should not allow authenticated users to delete their own profiles or others' profiles", async () => {
    const { data: profileData } = await authedClient
      .from('profiles')
      .select('*')
      .limit(1);

    const userId = profileData?.[0]?.id;

    // Use the authenticated client to attempt to delete their own profile
    const { data, error } = await authedClient
      .from('profiles')
      .delete()
      .eq('id', userId)
      .select();

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });
});
