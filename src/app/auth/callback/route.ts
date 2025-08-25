'use server';

import { NextResponse } from 'next/server';
import {
  createAnonClient,
  createServiceAdminClient,
} from '../../../../utils/supabase/server';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Database } from 'supabase/supabase.types';

const alphaTokenSystemActive =
  process.env.NEXT_PUBLIC_ALPHA_TOKEN_ACTIVE === 'true';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token = searchParams.get('token');

  if (code && alphaTokenSystemActive) {
    const supabase = await createAnonClient();
    const { data: userData, error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      let tokenData = {} as
        | Database['public']['Tables']['alpha_tokens']['Row']
        | null;

      const supabaseService = await createServiceAdminClient();

      if (token) {
        const { data, error } = await supabaseService
          .from('alpha_tokens')
          .select('*')
          .eq('id', token)
          .maybeSingle();

        const { data: count, error: countError } = await supabaseService
          .from('alpha_tokens')
          .select('*', { count: 'exact' });

        if (error) {
          return redirect(`${origin}/auth/auth-code-error`);
        }
        tokenData = data;
      } else {
        const { data, error } = await supabaseService
          .from('alpha_tokens')
          .select('*')
          .eq('user_id', userData.user.id)
          .maybeSingle();

        if (error) {
          return redirect(`${origin}/auth/auth-code-error`);
        }

        tokenData = data;
      }

      if (!tokenData) {
        return redirect(`${origin}/thanks`);
      }

      const { id, user_id } = tokenData;

      if (user_id && user_id !== userData.user.id) {
        return redirect(`${origin}/auth/auth-code-error`);
      }

      if (!user_id) {
        const { error } = await supabaseService
          .from('alpha_tokens')
          .update({ user_id: userData.user.id })
          .eq('id', id);

        if (error) {
          return redirect(`${origin}/auth/auth-code-error`);
        }
      }

      const cookieStore = await cookies();

      cookieStore.set({
        name: 'alpha-token',
        value: id,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });

      const profileRepository = new ProfileRepository(supabase);
      const userProfile = await profileRepository.getById(userData.user.id);

      if (userProfile?.username) {
        return redirect(`/${userProfile.username}`);
      } else {
        return redirect('/onboarding');
      }
    }
  }

  if (code && !alphaTokenSystemActive) {
    const supabase = await createAnonClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const profileRepository = new ProfileRepository(supabase);

      const userProfile = await profileRepository.getById(data.user.id);

      if (userProfile?.username) {
        return redirect(`/${userProfile.username}`);
      } else {
        return redirect('/onboarding');
      }
    }
  }

  // Fallback to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
