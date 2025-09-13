'use server';

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from './onboarding-form.schema';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { UpdateUserProfile } from '@/use-cases/updateUserProfile/UpdateUserProfile';
import { PolicyDocumentRepository } from '@/repositories/policyDocumentRepository/policyDocument.repository';

// Make a server-only Supabase client
function makeServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// 👇 NEW: fetch current policy by type
export async function fetchPolicyDocument(
  type: 'terms' | 'privacy' | 'cookies'
) {
  const supabase = makeServerSupabase();
  const repo = new PolicyDocumentRepository(supabase);

  const doc = await repo.getCurrentByType(type);
  if (!doc) {
    return { success: false, message: 'Policy not found' };
  }

  const title =
    type === 'terms'
      ? 'Terms & Conditions'
      : type === 'privacy'
      ? 'Privacy Policy'
      : 'Cookie Policy';

  return {
    success: true as const,
    data: {
      title,
      version: doc.version,
      content: doc.content,
      effective_from: doc.effective_from,
    },
  };
}

// Existing function stays
export async function onboardingFormSubmit(
  formData: OnboardingFormSchema,
  id: string
) {
  const parsed = onboardingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.message };
  }

  const supabase = makeServerSupabase();
  const profileRepository = new ProfileRepository(supabase);
  const updateUserProfile = new UpdateUserProfile(profileRepository, supabase);

  const { userName: username, displayName: display_name, bio } = parsed.data;
  const result = await updateUserProfile.execute({ id, username, display_name, bio });

  if (!result.success) return result;

  const user = await profileRepository.getById(id);
  if (!user) return { success: false, message: 'User not found' };

  return redirect(`/${user.username}`);
}