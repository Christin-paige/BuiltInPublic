import { NextResponse } from "next/server";
import { createAnonClient } from "../../../../utils/supabase/server";
import { isSafeNextPath } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const rawNext = searchParams.get("next") ?? "/";
  const next = isSafeNextPath(rawNext) ? rawNext : "/";

  if (code) {
    const supabase = await createAnonClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // ✅ Safe: only using origin and a validated next path
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 🔒 Fallback to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
