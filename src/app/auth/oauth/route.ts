import { Provider } from '@supabase/gotrue-js';
import { redirect } from 'next/navigation';
import { createAnonClient } from 'utils/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get('provider') as Provider;

  const supabase = await createAnonClient();

  const additionalOptions =
    provider === 'google'
      ? {
          scopes: 'openid email profile',
          queryParams: {
            access_type: 'online',
            include_granted_scopes: 'false',
          },
        }
      : {};

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      ...additionalOptions,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_HOST}/auth/callback`,
    },
  });

  if (error) {
    redirect('/auth/auth-code-error');
  }

  redirect(data.url);
}
