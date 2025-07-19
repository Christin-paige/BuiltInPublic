// This file tests Row Level Security (RLS) policies for the comments table in Supabase 

import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { getAuthenticatedClient } from '../testUser';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create instances of env variables for easier access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Test suite for RLS policies on the comments table
describe('RLS Policies for Comments Table', () => {

  // Test case: Ensure authenticated users can read comments
  it('should allow authenticated user to get all comments', async () => {
    // Simulate an authenticated user
    const userSession = await getAuthenticatedClient();

    // Create a Supabase client with the user's session
    const authedClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${userSession}` },
      },
      // Disable automatic token refresh for testing, this was causing errors with the test
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await authedClient.from('comments').select('*');
    
    // Expect no error and data to be an array (could be empty if no comments)
    expect(data).toBeInstanceOf(Array);
    expect(error).toBeNull();
  });
});