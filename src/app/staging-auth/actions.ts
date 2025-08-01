'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StagingAuthSchemaType } from './stagingAuth.schema';

export async function authenticateStaging(formData: StagingAuthSchemaType) {
  const { password } = formData;
  console.log(password);
  if (password === process.env.NEXT_PUBLIC_STAGING_PASS) {
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
