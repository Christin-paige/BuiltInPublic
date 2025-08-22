'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { Auth } from '@supabase/auth-ui-react';
import DevSignIn from './DevSignIn';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='flex items-center justify-center w-full h-screen bg-primary-950/30 relative'>
      <div
        className='absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-radial from-accent-700 to-primary-700 rounded-full
        blur-3xl opacity-40'
      ></div>
      <div
        className='w-full md:w-96 text-center rounded-md md:border p-5 relative backdrop-blur-3xl flex flex-col gap-2 border-secondary-900/70 shadow-md shadow-black/30
        transition-all duration-300 hover:border-secondary-800/80 ease-in-out h-full md:h-fit items-center justify-center bg-linear-0 from-transparent via-secondary-950/50 to-transparent
        md:from-secondary-950/50 md:to-secondary-950/50'
      >
        <div className='flex items-center gap-2 justify-center text-text-100'>
          <Globe className='text-accent-600' />
          <h1 className='text-2xl font-heading'>BuiltInPublic</h1>
          <Globe className='text-accent-600' />
        </div>
        <p className='text-lg text-text-300 font-subheading'>
          Register or Sign In
        </p>
        <div className='flex flex-col gap-2 w-full items-center justify-center'>
          <Link className='w-fit' href={'/auth/oauth?provider=google'}>
            <Image src='/icons/web_neutral_rd_si.svg' alt='Google Icon' width={160} height={32} />
          </Link>
          <Link className='w-fit flex bg-[#f2f2f2] text-[13px] text-black rounded-full font-semibold font-mono items-center py-1 gap-1 h-10 px-2' href={'/auth/oauth?provider=github'}>
            <Image src='/icons/github-mark.svg' className='relative transform -translate-x-[0.5px] -translate-y-[0.3px]' alt='GitHub Icon' width={22} height={22} />
            Sign in with GitHub
          </Link>
        </div>
        <DevSignIn />
      </div>
    </main>
  );
}
