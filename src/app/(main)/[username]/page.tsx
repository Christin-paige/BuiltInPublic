'use client';

import React, { use } from 'react';
import './profile.css';
import Image from 'next/image';
import FeedSection from './components/FeedSection';
import UserInfo from './components/UserInfo';
import StreakSection from './components/StreakSection';
import GradientBlobs from './components/GradientBlobs';
import useProfile from '@/hooks/useProfile/useProfile';
import { notFound } from 'next/navigation';
import { ProfileEditProvider } from '@/contexts/ProfileEditContext';

interface ProfileProps {
  params: Promise<{
    username: string;
  }>;
}

export default function Profile({ params }: ProfileProps) {
  const { username } = use(params);

  const { data: profile, isLoading, error } = useProfile(username);

  // TODO: better job handling loading state (skeletons), and error state
  if (isLoading) {
    return null;
  }

  if (!profile || error) {
    return notFound();
  }

  return (
    <ProfileEditProvider profileUserId={profile.id}>
      <main className='h-screen flex flex-col items-center gap-4 -z-10 overflow-hidden bg-primary-950/30 pt-16 lg:pt-28 overflow-x-hidden'>

        <div className="w-full h-36 lg:h-48 absolute top-0 left-0 z-0 bg-linear-90 from-primary-950/30 via-primary-900/50 to-primary-950/30 overflow-hidden border-b">
          <Image
            src='/BuiltInPublic.png'
            alt={`BuiltInPublic Banner`}
            className="absolute top-6 lg:top-8 xl:top-16 md:left-1/2 md:-translate-x-1/2 transform xl:-translate-y-10 lg:w-1/3 w-4/5 sm:w-1/2 left-16"
            width={400}
            height={200}
          />
        </div>

        <div className='p-8 gap-8 lg:gap-12 w-full relative grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]'>
          <GradientBlobs />
          <UserInfo profile={profile} />
          <FeedSection username={username} />
          <StreakSection />
        </div>
      </main>
    </ProfileEditProvider>
  );
}
