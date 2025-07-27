import { NextResponse } from 'next/server';
import { createAnonClient } from '../../../../utils/supabase/server';
import { isSafeNextPath } from '@/lib/utils';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams, origin, hash } = new URL(request.url);
  const code = searchParams.get('code');

  const rawNext = searchParams.get('next') ?? '/';
  const next = isSafeNextPath(rawNext) ? rawNext : '/';
  console.log(request.url);
  console.log(code);
  console.log(hash);
  if (code) {
    const supabase = await createAnonClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(data);
    console.log(error);
    if (!error) {
      const profileRepository = new ProfileRepository(supabase);

      const userProfile = await profileRepository.getById(data.user.id);
      console.log(userProfile);
      if (userProfile?.username) {
        return redirect(`/${userProfile.username}`);
      } else {
        return NextResponse.redirect('/dashboard');
      }
      // // Safe: only using origin and a validated next path
      // return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Fallback to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
