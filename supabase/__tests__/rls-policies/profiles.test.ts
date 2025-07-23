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
});
