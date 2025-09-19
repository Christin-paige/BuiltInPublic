'use server';

import { createAnonClient } from 'utils/supabase/server';
import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from './onboarding-form.schema';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { UpdateUserProfile } from '@/use-cases/updateUserProfile/UpdateUserProfile';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function onboardingFormSubmit(
  formData: OnboardingFormSchema,
  id: string
): Promise<{ success: boolean; message: string } | undefined> {
  const validatedData = onboardingFormSchema.safeParse(formData);

  if (!validatedData.success) {
    return { success: false, message: validatedData.error.message };
  }

  // Obtain the users IP address and user agent from the request headers
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get('user-agent') || 'unknown';
  const ipAddress = requestHeaders.get('x-forwarded-for') || 'unknown';

  const supabase = await createAnonClient();
  const profileRepository = new ProfileRepository(supabase);
  const updateUserProfile = new UpdateUserProfile(profileRepository, supabase);

  const {
    userName: username,
    displayName: display_name,
    bio,
  } = validatedData.data;

  const onboardingFormData = {
    id,
    username,
    display_name,
    bio,
    userAgent,
    ipAddress,
  };

  const result = await updateUserProfile.execute(onboardingFormData);

  if (!result.success) {
    return result;
  } else {
    const user = await profileRepository.getById(id);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return redirect(`/${user.username}`);
  }
}
