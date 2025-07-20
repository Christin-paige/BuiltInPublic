// This file will create an authenticated user for testing purposes.
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const testEmail = 'test@example.com';
const testPassword = 'password123';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const getAuthenticatedClient = async () => {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (error) {

      const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (signInError) {
        throw new Error(`Error signing in: ${signInError.message}`);
      }

      return signInData.session?.access_token;
    }

    return data.session?.access_token;
  } catch (error) {
    console.error('Error in getAuthenticatedClient:', error);
    throw error;
  }
};
