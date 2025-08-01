'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StagingAuthSchemaType } from './stagingAuth.schema';

export async function authenticateStaging(formData: StagingAuthSchemaType) {
  const { password } = formData;

  if (password === process.env.STAGING_AUTH_PASS) {
    (await cookies()).set('staging-auth', 'true', {
      maxAge: 60 * 60 * 2,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    redirect('/');
  }

  return { success: false };
}
