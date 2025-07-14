import { supabase } from "./supabase";

/**
 * Check if a user exists based on username or email
 */
export const checkUserExists = async ({
  username,
  email,
}: {
  username?: string;
  email?: string;
}): Promise<{ exists: boolean; message?: string }> => {
  const query = supabase.from("profiles").select("id");

  if (username) {
    const { data, error } = await query.eq("username", username).maybeSingle();
    if (error) {
      console.error("Error checking username:", error);
      return { exists: false, message: "Unable to check username right now" };
    }
    if (data) return { exists: true, message: "Username already taken" };
  }

  if (email) {
    const { data, error } = await query.eq("email", email).maybeSingle();
    if (error) {
      console.error("Error checking email:", error);
      return { exists: false, message: "Unable to check email right now" };
    }
    if (data) return { exists: true, message: "Email already in use" };
  }

  return { exists: false };
};
