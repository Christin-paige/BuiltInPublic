'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import './profile.css';
import { supabase } from '../../../utils/supabase/client';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import CalendarStreak from './components/CalendarStreak';
import GitHubCalendar from 'react-github-calendar';
import FeedSection from './components/FeedSection';

export default function Profile({ user }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [view, setView] = useState('calendar');
  const [blobPositions, setBlobPositions] = useState([]);

  const numBlobs = 8;

  // Define gradient combinations for the blobs
  const gradientCombinations = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-purple-600',
    'from-pink-600 to-rose-600',
    'from-cyan-600 to-blue-600',
    'from-emerald-600 to-teal-600',
  ];

  useEffect(() => {
    // Generate random positions for all blobs
    const positions = Array.from({ length: numBlobs }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 250,
    }));
    setBlobPositions(positions);
  }, []);

  const selectLastHalfYear = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - 6 &&
        monthOfDay <= currentMonth
      );
    });
  };

  return (
    <main className='h-screen flex flex-col py-16 items-center gap-8 -z-10 overflow-hidden'>
      <Image
        src='/example-cover-img.jpg'
        alt='Cover Photo'
        width={2000}
        height={1200}
        className='w-full h-48 object-cover hover:opacity-80 transition-all duration-100 transform-content object-top'
      />

      <div className='flex p-8 gap-12 w-full relative'>
        {blobPositions.map((position, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${gradientCombinations[index]} rounded-full blur-[100px] absolute z-[-1] opacity-30 transition-all duration-1000`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              width: `${position.size}px`,
              height: `${position.size}px`,
            }}
          />
        ))}

        <section className='flex flex-col gap-4 w-1/4 transform translate-y-[-8rem] relative'>
          <div className='rounded-full border-2 border-[#00c7ff] w-40 h-40 flex items-center relative justify-center cyan-glow'>
            Image Goes Here
          </div>
          <h1 className='text-3xl'>Profile Name</h1>
          <div className='bg-slate-950 p-4 rounded-lg border'>
            <p>
              This is the bio section. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-slate-950 p-2 rounded-lg border text-center'>
              <h2 className='text-xl'>Followers</h2>
              <p className='text-lg'>100</p>
            </div>
            <div className='bg-slate-950 p-2 rounded-lg border text-center'>
              <h2 className='text-xl'>Following</h2>
              <p className='text-lg'>100</p>
            </div>
            <div className='bg-slate-950 p-2 rounded-lg border text-center'>
              <h2 className='text-xl'>Projects</h2>
              <p className='text-lg'>100</p>
            </div>
            <div className='bg-slate-950 p-2 rounded-lg border text-center'>
              <h2 className='text-xl'>Posts</h2>
              <p className='text-lg'>100</p>
            </div>
          </div>
          <button
            className='bg-slate-950 p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all 
            duration-100 active:scale-95 flex items-center gap-2'>
            <Settings className='w-6 h-6' />
            <p>Settings</p>
          </button>
        </section>

        <FeedSection />

        <section className='flex flex-col gap-4 w-1/4'>
          <div className='flex gap-2'>
            <button
              className={`p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all 
            duration-100 active:scale-95 flex items-center gap-2 ${
              view === 'calendar'
                ? 'bg-slate-700 border-cyan-800'
                : 'bg-slate-950'
            }`}
              onClick={() => setView('calendar')}>
              <p>Calendar View</p>
            </button>
            <button
              className={`p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all 
            duration-100 active:scale-95 flex items-center gap-2 ${
              view === 'github'
                ? 'bg-slate-700 border-cyan-800'
                : 'bg-slate-950'
            }`}
              onClick={() => setView('github')}>
              <p>GitHub View</p>
            </button>
          </div>

          <div className='relative min-h-[300px]'>
            <div className={`${view === 'calendar' ? 'block' : 'hidden'}`}>
              <CalendarStreak />
            </div>
            <div
              className={`bg-slate-950 p-4 rounded-lg border ${
                view === 'github' ? 'block' : 'hidden'
              }`}>
              <GitHubCalendar
                username='G-Hensley'
                transformData={selectLastHalfYear}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
