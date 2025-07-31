import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { createAnonClient } from './server';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'supabase/supabase.types';

const protectedRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/auth'];

export async function updateSession(request: NextRequest) {
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

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth', request.url);

    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicRoute && user) {
    const redirectUrl = new URL('/dashboard', request.url);

    return NextResponse.redirect(redirectUrl);
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
