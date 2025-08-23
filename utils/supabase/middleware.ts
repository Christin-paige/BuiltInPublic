import { NextRequest, NextResponse } from 'next/server';
import { createAnonClient, createServiceAdminClient } from './server';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';

const protectedRoutes = ['/dashboard', '/profile', '/onboarding'];
const publicRoutes = ['/auth'];

async function validateAlphaToken(
  request: NextRequest,
  userId?: string
): Promise<boolean> {
  const alphaTokenCookie = request.cookies.get('alpha-token');

  if (!alphaTokenCookie?.value) {
    return false;
  }

  try {
    const supabase = await createServiceAdminClient();
    const { data: tokenData, error } = await supabase
      .from('alpha_tokens')
      .select('*')
      .eq('id', alphaTokenCookie.value)
      .maybeSingle();

    if (error || !tokenData) {
      return false;
    }

    if (userId && tokenData.user_id !== userId) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Alpha token validation error:', error);
    return false;
  }
}

export async function updateSession(request: NextRequest) {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === 'true';
  const isStagingAuthPage = request.nextUrl.pathname === '/staging-auth';
  const alphaTokenSystemActive = process.env.NEXT_PUBLIC_ALPHA_TOKEN_ACTIVE;

  if (!isStaging && isStagingAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isStaging) {
    const stagingAuth = request.cookies.get('staging-auth');

    if (!stagingAuth?.value && !isStagingAuthPage) {
      return NextResponse.redirect(new URL('/staging-auth', request.url));
    }

    if (stagingAuth?.value && isStagingAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (isStagingAuthPage) {
      return NextResponse.next();
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = await createAnonClient();

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route)
  );

  const isOnboardingRoute = path === '/onboarding';

  const isDashboardRoute = path === '/dashboard';

  const isRoot = path === '/';
  const isAuthCallbackRoute = path.startsWith('/auth/callback');

  if (
    alphaTokenSystemActive &&
    !isAuthCallbackRoute &&
    (isProtectedRoute || isOnboardingRoute)
  ) {
    const hasValidAlphaToken = await validateAlphaToken(request, user?.id);

    if (!hasValidAlphaToken && user) {
      supabase.auth.signOut();
      const redirectUrl = new URL('/thanks', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if ((isDashboardRoute || isRoot) && user) {
    const profileRepository = new ProfileRepository(supabase);
    const userProfile = await profileRepository.getById(user.id);

    if (userProfile?.username) {
      const redirectUrl = new URL(`/${userProfile.username}`, request.url);

      return NextResponse.redirect(redirectUrl);
    } else {
      const redirectUrl = new URL('/onboarding', request.url);

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth', request.url);

    return NextResponse.redirect(redirectUrl);
  }

  if (isOnboardingRoute && user) {
    const profileRepository = new ProfileRepository(supabase);
    const userProfile = await profileRepository.getById(user.id);

    if (userProfile?.username) {
      const redirectUrl = new URL(`/${userProfile.username}`, request.url);

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isPublicRoute && user) {
    const profileRepository = new ProfileRepository(supabase);
    const userProfile = await profileRepository.getById(user.id);

    if (userProfile?.username) {
      const redirectUrl = new URL(`/${userProfile.username}`, request.url);

      return NextResponse.redirect(redirectUrl);
    } else {
      const redirectUrl = new URL('/onboarding', request.url);

      return NextResponse.redirect(redirectUrl);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
