'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StagingAuthSchemaType } from './stagingAuth.schema';
import { timingSafeEqual } from 'crypto';

export async function authenticateStaging(formData: StagingAuthSchemaType) {
  const { password } = formData;

  if (
    timingSafeEqual(
      Buffer.from(password),
      Buffer.from(process.env.NEXT_PUBLIC_STAGING_PASS!)
    )
  ) {
    (await cookies()).set('staging-auth', 'true', {
      maxAge: 60 * 60 * 2,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    redirect('/');
  }

  return { success: false };
}
