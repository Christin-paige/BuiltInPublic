"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

export async function signOutUser() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error signing out");
    }

    return redirect("/");
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
