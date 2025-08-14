'use server';

import { Profile } from '@/repositories/profileRepository/profile.types';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { createAnonClient, SupabaseAnonClient } from 'utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getCurrentUser(): Promise<Profile | null> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);

  const userProfile = await profileRepository.getCurrentUser();

  return userProfile ?? null;
}

export async function signOutUser() {
  const supabase = await createAnonClient();

  // Sign out the user from the client
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Error signing out');
    }

    // Sign out the user from the server
    await supabase.auth.signOut();

    return redirect('/');
  } catch (e) {
    return {
      message: 'Could not log out',
    };
  }
}
