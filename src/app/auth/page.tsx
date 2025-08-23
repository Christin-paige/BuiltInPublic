'use client';

import React, { Suspense } from 'react';
import { Globe } from 'lucide-react';
import DevSignIn from './DevSignIn';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function AuthContent() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const googleOauthUrlParams = new URLSearchParams();
  googleOauthUrlParams.set('provider', 'google');

  const githubOauthUrlParams = new URLSearchParams();
  githubOauthUrlParams.set('provider', 'github');

  if (token) {
    googleOauthUrlParams.set('token', token);
    githubOauthUrlParams.set('token', token);
  }

  return (
    <main className='flex items-center justify-center w-full h-screen bg-primary-950/30 relative'>
      <div
        className='absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-radial from-accent-700 to-primary-700 rounded-full
        blur-3xl opacity-40'
      ></div>
      <div
        className='w-full md:w-fit text-center rounded-md md:border p-8 relative backdrop-blur-3xl flex flex-col gap-8 border-secondary-900/70 shadow-md shadow-black/30
        transition-all duration-300 hover:border-secondary-800/80 ease-in-out h-full md:h-fit items-center justify-center bg-linear-0 from-transparent via-secondary-950/50 to-transparent
        md:from-secondary-950/50 md:to-secondary-950/50'
      >
        <div className='flex flex-col'>
          <div className='flex items-center gap-2 justify-center text-text-100'>
            <Globe className='text-accent-600' />
            <h1 className='text-2xl font-heading'>BuiltInPublic</h1>
            <Globe className='text-accent-600' />
          </div>
          <p className='text-lg text-text-300 font-subheading'>
            Register or Sign In
          </p>
        </div>
        <div className='flex flex-col gap-2 w-full items-center justify-center'>
          <a
            role='button'
            aria-label='Login with google'
            href={`/auth/oauth?${googleOauthUrlParams.toString()}`}
          >
            <Image
              src='/icons/web_neutral_rd_si.svg'
              alt='Google Sign in button'
              width={184}
              height={32}
            />
          </a>
          <a
            role='button'
            aria-label='Login with github'
            href={`/auth/oauth?${githubOauthUrlParams.toString()}`}
          >
            <Image
              src='/icons/github-sign-in-btn.svg'
              alt='GitHub Sign in button'
              width={184}
              height={32}
            />
          </a>
        </div>
        <DevSignIn />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}
