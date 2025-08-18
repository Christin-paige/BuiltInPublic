'use client';

import React from 'react';
import './profile.css';
import Image from 'next/image';
import FeedSection from './components/FeedSection';
import UserInfo from './components/UserInfo';
import StreakSection from './components/StreakSection';
import GradientBlobs from './components/GradientBlobs';
import useProfile from '@/hooks/useProfile/useProfile';
import { notFound, useParams } from 'next/navigation';
import { ProfileEditProvider } from '@/contexts/ProfileEditContext';

import ProjectsSection from '@/components/Projects/ProjectsSection';

export default function Profile() {
  // Read param from the URL in a client component
  const { username } = useParams() as { username: string };

  const { data: profile, isLoading, error } = useProfile(username);

  // TODO: better job handling loading state (skeletons), and error state
  if (isLoading) return null;
  if (!profile || error) return notFound();

  return (
    <ProfileEditProvider profileUserId={profile.id}>
      <main className='h-screen flex flex-col py-16 items-center gap-8 -z-10 overflow-hidden'>
        <Image
          src='/example-cover-img.jpg'
          alt='Cover Photo'
          width={2000}
          height={1200}
          className='w-full h-48 object-cover hover:opacity-80 transition-all duration-100 transform-content object-top'
        />

        <div className='flex p-8 gap-12 w-full relative'>
          <GradientBlobs />
          <UserInfo profile={profile} />

          {/* 👉 Projects in the middle column, full width of that lane */}
          <div className='flex-1 min-w-[320px]'>
            <ProjectsSection username={username} />
          </div>

          <FeedSection />
          <StreakSection />
        </div>
      </main>
    </ProfileEditProvider>
  );
}
