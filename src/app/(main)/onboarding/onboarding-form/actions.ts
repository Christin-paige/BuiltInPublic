'use server';

import { createAnonClient } from 'utils/supabase/server';
import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from './onboarding-form.schema';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { UpdateUserProfile } from '@/use-cases/updateUserProfile/UpdateUserProfile';
import { PolicyRepository } from '@/repositories/policyRepository/policy.repository';
import { UserConsent } from '@/use-cases/userConsent/UserConsent';
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

  const getClientIP = (): string => {
    if (!requestHeaders.get('x-forwarded-for')) return '0.0.0.0';

    const ips = requestHeaders
      .get('x-forwarded-for')!
      .split(',')
      .map((ip) => ip.trim());

    return ips.find((ip) => ip && ip.toLowerCase() !== 'unknown') || '0.0.0.0';
  };

  const ipAddress = getClientIP();

  const supabase = await createAnonClient();

  // Get all active policies and record user consent
  const userConsent = new UserConsent(supabase);
  const policyRepository = new PolicyRepository(supabase);
  const policies = await policyRepository.getAllActivePolicies();

  try {
    for (const policy of policies) {
      await userConsent.execute({
        userId: id,
        policyId: policy.id,
        ipAddress,
        userAgent,
        consentMethod: 'checkbox',
      });
    }
  } catch (error) {
    console.error('Error recording user consent:', error);
    return { success: false, message: 'Error recording user consent' };
  }

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
