'use client';

import React, { useMemo, useState } from 'react';

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  const randomImage = useMemo(() => {
    const seed = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed}/800/600`;
  }, []);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center gap-6'>
      <h1 className='text-4xl sm:text-5xl font-bold text-primary'>
        404 - Page Not Found 😵
      </h1>
      <p className='text-muted-foreground text-lg max-w-xl'>
        We couldn’t find what you’re looking for, but here’s a random image to
        make up for it:
      </p>

      <div className='w-full max-w-xl aspect-video overflow-hidden rounded-xl shadow-lg ring-2 ring-border bg-muted'>
        <img
          src={randomImage}
          alt='Random placeholder'
          onLoad={() => setLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <a
        href='/'
        className='text-sm text-primary underline hover:text-accent transition'
      >
        🔙 Go back home
      </a>
    </main>
  );
}
