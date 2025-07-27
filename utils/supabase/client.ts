// utils/supabase/client.ts
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '../../supabase/supabase.types';

// only to be used for launching oauth signin flow
const supabaseClient: SupabaseClient<Database> = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: {
        getItem: (key: string) => {
          if (typeof window === 'undefined') return null;

          // Use document.cookie to read cookies
          const cookies = document.cookie.split(';');
          for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === key) {
              return decodeURIComponent(value);
            }
          }
          return null;
        },
        setItem: (key: string, value: string) => {
          if (typeof window === 'undefined') return;

          // Set cookie with same configuration as server
          const secure = window.location.protocol === 'https:';
          document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax${secure ? '; Secure' : ''}`;
        },
        removeItem: (key: string) => {
          if (typeof window === 'undefined') return;

          // Remove cookie by setting max-age to 0
          document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`;
        },
      },
    },
  }
);

export default supabaseClient;
