"use server";

import { Profile, ProfileRepository } from "@/repositories/profiles.repository";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "supabase/supabase.types";
import { createClient } from "utils/supabase/server";
import { Maybe } from "utils/types";

export async function getCurrentUser(): Promise<Maybe<Profile>> {
  const supabase: SupabaseClient<Database> = await createClient();
  const profileRepository = new ProfileRepository(supabase);

  const userProfile = await profileRepository.getCurrentUser();

  return userProfile ?? null;
}
