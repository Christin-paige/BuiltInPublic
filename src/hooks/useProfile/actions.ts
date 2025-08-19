'use server';

import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { Profile } from '@/repositories/profileRepository/profile.types';
import {
  UserProfileUpdateData,
  UpdateUserProfile,
} from '@/use-cases/updateUserProfile/UpdateUserProfile';
import {
  bioSchema,
  displayNameSchema,
} from '@/hooks/useProfile/profile.schema';
import { createAnonClient } from 'utils/supabase/server';
import { ValidationError } from 'utils/errors/ValidationError';

export async function getProfileByUsername(
  username: string
): Promise<Profile | null> {
  const supabase = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);

  const profile = await profileRepository.getByUsername(username);

  return profile ?? null;
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);
  return await profileRepository.checkUsernameExists(username);
}

export async function updateProfile({
  id,
  bio,
  display_name,
}: UserProfileUpdateData) {
  const validateDisplayName = displayNameSchema.safeParse({
    displayName: display_name,
  });
  const validateBio = bioSchema.safeParse({ bio: bio });

  if (!validateDisplayName.success || !validateBio.success) {
    const errors: Record<string, string[]> = {};

    if (!validateDisplayName.success) {
      for (const issue of validateDisplayName.error.issues) {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      }
    }

    if (!validateBio.success) {
      for (const issue of validateBio.error.issues) {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      }
    }

    throw new ValidationError('Validation failed', errors);
  } else {
    const supabase = await createAnonClient();
    const profileRepository = new ProfileRepository(supabase);
    const updateUserProfile = new UpdateUserProfile(
      profileRepository,
      supabase
    );

    const result = await updateUserProfile.execute({
      id,
      bio,
      display_name,
    });

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  }
}
