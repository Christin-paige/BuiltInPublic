import { NextResponse } from 'next/server';
import {
  createAnonClient,
  createServiceClient,
} from '../../../../utils/supabase/server';
import { isSafeNextPath } from '@/lib/utils';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { redirect } from 'next/navigation';

const alphaTokenSystemActive = process.env.ALPHA_TOKEN_SYSTEM_ACTIVE === 'true';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token = searchParams.get('token');

  if (code && alphaTokenSystemActive) {
    const supabase = await createServiceClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const selectCol = token ? 'id' : 'user_id';
      const selectVal = token ? token : data.user.id;

      const { data: tokenData, error: tokenDataError } = await supabase
        .from('alpha_tokens')
        .select('*')
        .eq(selectCol, selectVal)
        .maybeSingle();

      if (tokenDataError) {
        return redirect(`${origin}/auth/auth-code-error`);
      }

      if (!tokenData) {
        return redirect(`${origin}/auth/thanks`);
      }

      const { id, user_id } = tokenData;

      if (user_id && user_id !== data.user.id) {
        return redirect(`${origin}/auth/auth-code-error`);
      }

      if (!user_id) {
        await supabase
          .from('alpha_tokens')
          .update({ user_id: data.user.id })
          .eq('id', id);
      }

      const profileRepository = new ProfileRepository(supabase);
      const userProfile = await profileRepository.getById(data.user.id);

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
