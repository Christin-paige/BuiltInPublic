'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';
import DevSignIn from './DevSignIn';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='w-96 text-center rounded-md border p-5 space-y-5 relative bg-slate-950'>
        <div className='flex items-center gap-2 justify-center mr-4'>
          <Globe />

          <h1 className='text-2xl font-bold'>BuiltInPublic</h1>
        </div>
        <p className='text-md text-gray-300'>Register or Sign In</p>
        <div className='flex flex-col gap-4'>
          <a
            role='button'
            aria-label='Login with google'
            href={'/auth/oauth?provider=google'}
          >
            <div className='w-full flex justify-center p-2 rounded-md cursor-pointer border-[1px] dark:border-input'>
              <div className='flex flex-row items-center gap-2'>
                <FcGoogle /> <span>Google</span>
              </div>
            </div>
          </a>
          <a
            role='button'
            aria-label='Login with github'
            href={'/auth/oauth?provider=github'}
          >
            <div className='w-full flex justify-center p-2 rounded-md cursor-pointer border-[1px] dark:border-input'>
              <div className='flex flex-row items-center gap-2'>
                <FaGithub />
                <span>Github</span>
              </div>
            </div>
          </a>
        </div>
        <DevSignIn />
      </div>
    </div>
  );
}
