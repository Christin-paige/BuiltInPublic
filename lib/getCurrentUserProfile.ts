import { supabase } from "./supabase";

/**
 * Check if a user exists based on username
 */
export const checkUserExists = async ({
  username,
}: {
  username?: string;
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

  return { exists: false };
};
