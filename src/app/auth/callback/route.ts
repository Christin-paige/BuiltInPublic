import { NextResponse } from 'next/server';
import { createAnonClient } from '../../../../utils/supabase/server';
import { isSafeNextPath } from '@/lib/utils';
import { ProfileRepository } from "@/repositories/profileRepository/profile.repository";
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  const rawNext = searchParams.get('next') ?? '/';
  const next = isSafeNextPath(rawNext) ? rawNext : '/';

  if (code) {
    const supabase = await createAnonClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const profileRepository = new ProfileRepository(supabase);

      const userProfile = await profileRepository.getById(data.user.id);

      if (userProfile?.username) {
        return redirect(`/${userProfile.username}`);
      } else {
        return NextResponse.redirect('/dashboard');
      }
    }
  }

  // Fallback to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
