import { cookies } from 'next/headers';
import { Database } from '../../supabase/supabase.types';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { NextJSCookieStorage } from './NextJSCookieStorage';

export type SupabaseServiceClient = SupabaseClient<Database> & {
  _brand: 'service-role';
};

export type SupabaseAnonClient = SupabaseClient<Database> & {
  _brand: 'anon-role';
};

export type AnySupabaseClient = SupabaseServiceClient | SupabaseAnonClient;

export function isServiceRoleClient(
  client: AnySupabaseClient
): client is SupabaseServiceClient {
  return (client as any)._brand === 'service-role';
}

export async function createAnonClient(): Promise<SupabaseAnonClient> {
  const cookieStore = await cookies();
  const storage = new NextJSCookieStorage(cookieStore);

  const client: SupabaseClient<Database> = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        storage,
      },
    }
  );

  (client as any)._brand = 'anon-role';

  return client as SupabaseAnonClient;
}

export async function createServiceClient(): Promise<SupabaseServiceClient> {
  const cookieStore = await cookies();
  const storage = new NextJSCookieStorage(cookieStore);

  const client: SupabaseClient<Database> = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        flowType: 'pkce',
        storage,
      },
    }
  );

  (client as any)._brand = 'service-role';

  return client as SupabaseServiceClient;
}

// for updating alpha tokens only
export async function createServiceAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
