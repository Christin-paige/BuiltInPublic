import { getAuthenticatedClient } from "./testUser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create instances of env variables for easier access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

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

 // Create a Supabase client without authentication
const unauthClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export { authedClient, unauthClient };