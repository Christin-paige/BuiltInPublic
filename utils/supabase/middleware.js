import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { createClient } from "./server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createClient();

  // refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}
