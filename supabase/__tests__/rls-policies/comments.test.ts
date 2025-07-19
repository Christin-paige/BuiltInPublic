import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { getAuthenticatedClient } from '../testUser';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Test suite for RLS policies on the comments table
describe('RLS Policies for Comments Table', () => {

  it('should allow authenticated user to get all comments', async () => {
    // Simulate an authenticated user
    const userSession = await getAuthenticatedClient();
    console.log("User session:", userSession);

    const authedClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${userSession}` },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await authedClient.from('comments').select('*');
    console.log("Data:", data, "Error:", error);
  });
});