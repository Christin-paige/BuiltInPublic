import { cookies } from 'next/headers';
import { Database } from '../../supabase/supabase.types';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

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
  // change to supabase server to reduce confusion?
  const cookieStore = await cookies();

  const client: SupabaseClient<Database> = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value ?? null,
          setItem: (key: string, value: string) => {
            cookieStore.set({
              name: key,
              value: value,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 365,
            });
          },
          removeItem: (key) => {
            cookieStore.set({
              name: key,
              value: '',
              httpOnly: true,
              maxAge: 0,
            });
          },
        },
      },
    }
  );

  (client as any)._brand = 'anon-role';

  return client as SupabaseAnonClient;
}

export async function createServiceClient(): Promise<SupabaseServiceClient> {
  // change to supabase server to reduce confusion?
  const cookieStore = await cookies();

  const client: SupabaseClient<Database> = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        flowType: 'pkce',
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value ?? null,
          setItem: (key: string, value: string) => {
            cookieStore.set({
              name: key,
              value: value,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 365,
            });
          },
          removeItem: (key) => {
            cookieStore.set({
              name: key,
              value: '',
              httpOnly: true,
              maxAge: 0,
            });
          },
        },
      },
    }
  );

  (client as any)._brand = 'service-role';

  return client as SupabaseServiceClient;
}

export async function createServiceAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // use a *server-only* env var
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
