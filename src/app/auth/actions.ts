import supabaseClient from "../../../utils/supabase/client";

export async function LoginWithEmail(email: string, password: string) {
  // Logic to login with email and password
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  // If there is an error, throw it
  if (error) {
    console.log("Email login failed", error.message);
    throw error;
  }

  // If there is no error, return the user data
  return data.user;
}
