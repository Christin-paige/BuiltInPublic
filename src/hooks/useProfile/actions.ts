'use server';

import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { Profile } from '@/repositories/profileRepository/profile.types';
import { createAnonClient, SupabaseAnonClient } from 'utils/supabase/server';

export async function getProfileByUsername(
  username: string
): Promise<Profile | null> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);

  const profile = await profileRepository.getByUsername(username);

  return profile ?? null;
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);
  return await profileRepository.checkUsernameExists(username);
}

export async function updateProfile(
  profileId: string,
  fields: Partial<{ username: string; bio: string }>
): Promise<boolean> {
  try {
    const supabase: SupabaseAnonClient = await createAnonClient();
    const profileRepository = new ProfileRepository(supabase);

    await profileRepository.updateProfileFields(profileId, fields);
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
}