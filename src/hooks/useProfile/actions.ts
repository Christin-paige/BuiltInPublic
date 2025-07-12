"use server";

import { ProfileRepository } from "@/repositories/profileRepository/profile.repository";
import { Profile } from "@/repositories/profileRepository/profile.types";
import { createAnonClient } from "utils/supabase/server";

export async function getProfileByUsername(
  username: string,
): Promise<Profile | null> {
  const supabase = await createAnonClient();

  const profileRepository = new ProfileRepository(supabase);

  const profile = await profileRepository.getByUsername(username);

  return profile ?? null;
}
