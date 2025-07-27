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
        <a
          className='w-full flex items-center gap-2 p-2 cursor-pointer'
          href={'/auth/oauth?provider=google'}
        >
          <FcGoogle /> Google
        </a>
        <a
          className='w-full flex items-center gap-2 p-2 cursor-pointer'
          href={'/auth/oauth?provider=github'}
        >
          <FaGithub />
          Github
        </a>
        <DevSignIn />
      </div>
    </div>
  );
}
