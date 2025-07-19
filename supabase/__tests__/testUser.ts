// This file will create an authenticated user for testing purposes.
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const getAuthenticatedClient = async () => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: "test@example.com",
      password: "password123",
    });

    if (error) {
      const { data: signUpData, error: signUpError } =
        await supabaseClient.auth.signUp({
          email: "test@example.com",
          password: "password123",
        });

      if (signUpError) {
        throw new Error(`Error signing up: ${signUpError.message}`);
      }

      return signUpData.session?.access_token;
    }

    return data.session?.access_token;
  } catch (error) {
    console.error("Error in getAuthenticatedClient:", error);
    throw error;
  }
};
