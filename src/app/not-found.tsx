'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  '/404/funny1.png',
  '/404/funny2.png',
  '/404/funny3.png',
  '/404/funny4.png',
  '/404/funny5.png',
  '/404/funny6.png',
  '/404/funny7.png',
  '/404/funny8.png',
  '/404/funny9.png',
  '/404/funny10.png',
];

// 🔹 Function to get a random image path
function getRandomImage() {
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  const randomImage = useMemo(() => getRandomImage(), []);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center gap-6'>
      <h1 className='text-4xl sm:text-5xl font-bold text-primary'>
        404 - Page Not Found 😵
      </h1>

      <p className='text-muted-foreground text-lg max-w-xl'>
        We couldn’t find what you’re looking for, but here’s something fun instead:
      </p>

      <div className='w-full max-w-xl overflow-hidden rounded-xl shadow-lg ring-2 ring-border bg-muted'>
        <Image
          src={randomImage}
          alt='Funny 404'
          width={800}
          height={600}
          onLoad={() => setLoaded(true)}
          priority
          className={`object-cover w-full h-full transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <Link
        href='/'
        className='text-sm text-primary underline hover:text-accent transition'
      >
        🔙 Go back home
      </Link>
    </main>
  );
}