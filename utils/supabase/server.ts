import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../../supabase/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

export type SupabaseServiceClient = SupabaseClient<Database> & {
  _brand: "service-role";
};

export type SupabaseAnonClient = SupabaseClient<Database> & {
  _brand: "anon-role";
};

export type AnySupabaseClient = SupabaseServiceClient | SupabaseAnonClient;

export function isServiceRoleClient(
  client: AnySupabaseClient,
): client is SupabaseServiceClient {
  return (client as any)._brand === "service-role";
}

export async function createAnonClient(): Promise<SupabaseAnonClient> {
  // change to supabase server to reduce confusion?
  const cookieStore = await cookies();

  const client: SupabaseClient<Database> = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );

  (client as any)._brand = "anon-role";

  return client as SupabaseAnonClient;
}

export async function createServiceClient(): Promise<SupabaseServiceClient> {
  // change to supabase server to reduce confusion?
  const cookieStore = await cookies();

  const client: SupabaseClient<Database> = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );

  (client as any)._brand = "service-role";

  return client as SupabaseServiceClient;
}
