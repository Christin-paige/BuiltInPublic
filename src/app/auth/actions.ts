'use server';

import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { redirect } from 'next/navigation';
import { createAnonClient } from 'utils/supabase/server';

export async function loginWithEmail(email: string, password: string) {
  // Logic to login with email and password
  const supabase = await createAnonClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If there is an error, return error object
  if (error) {
    return { message: 'Invalid credentials', status: 401 };
  }

  const profileRepository = new ProfileRepository(supabase);

  const userProfile = await profileRepository.getById(data.user.id);

  return redirect(`/${userProfile?.username}`);
}
