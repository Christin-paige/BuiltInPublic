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
    <main className='flex items-center justify-center w-full h-screen bg-primary-950/30 relative'>
      <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-radial from-accent-700 to-primary-700 rounded-full
        blur-3xl opacity-40"
      >
      </div>
      <div className='w-96 text-center rounded-md border p-5 relative bg-secondary-950/50 backdrop-blur-3xl flex flex-col gap-2 border-secondary-900/70 shadow-md shadow-black/30
        transition-all duration-300 hover:border-secondary-800/80 ease-in-out'>
        <div className='flex items-center gap-2 justify-center text-text-100'>
          <Globe className='text-accent-600' />
          <h1 className='text-2xl font-heading'>BuiltInPublic</h1>
          <Globe className='text-accent-600' />
        </div>
        <p className='text-lg text-text-300 font-subheading mb-4'>Register or Sign In</p>
        <div className='flex gap-3 items-center justify-center mb-4'>
          <Link className='w-fit' href={'/auth/oauth?provider=google'}>
            <Button>
              <FcGoogle className='w-5 h-5' />
              Google
            </Button>
          </Link>
          <Link className='w-fit' href={'/auth/oauth?provider=github'}>
            <Button>
              <FaGithub className='w-5 h-5' />
              Google
            </Button>
          </Link>
        </div>
        <DevSignIn />
      </div>
    </main>
  );
}
