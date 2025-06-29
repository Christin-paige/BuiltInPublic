"use server";

import { Profile } from "@/repositories/profileRepository/profile.types";
import { ProfileRepository } from "@/repositories/profileRepository/profile.repository";
import { createAnonClient, SupabaseAnonClient } from "utils/supabase/server";

export async function getCurrentUser(): Promise<Profile | null> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);

  const userProfile = await profileRepository.getCurrentUser();

  return userProfile ?? null;
}
