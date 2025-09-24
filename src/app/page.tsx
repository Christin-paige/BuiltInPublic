// app/page.tsx or src/pages/index.tsx (depending on your structure)

import { FC } from 'react';
import { Share2, MessageSquareCode, MessagesSquare, Shrub } from 'lucide-react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

const Home: FC = () => {
  return (
    <section className='px-4 pb-8 md:px-10 pt-24 sm:pt-36 xl:pt-54 gap-16 xl:gap-20 w-full min-h-screen relative bg-primary-950/30 flex flex-col items-center'>
      <div className='absolute top-0 left-0 size-40 md:size-100 xl:size-120 rounded-full bg-radial from-sky-500/60 to-indigo-900/60 via-indigo-900/60 blur-3xl z-0'></div>
      <div className='absolute top-[7%] md:top-[20%] lg:top-[16%] xl:top-[20%] left-[-10] md:left-[25%] xl:left-[30%] w-full md:w-1/2 xl:w-2/5 h-1/5 lg:h-1/4 xl:h-1/3 rounded-full bg-radial from-pink-500/60 to-indigo-600/60 blur-3xl z-0'></div>

      <div className='flex flex-col items-center gap-4 md:gap-8 z-10 relative'>
        <header className='flex flex-col items-center gap-2 text-center z-10 relative'>
          <h1 className='text-3xl md:text-4xl xl:text-5xl font-heading font-bold text-text-100'>
            BuiltInPublic
          </h1>
          <h2 className='text-xl md:text-2xl xl:text-3xl font-subheading text-text-200'>
            Where we build in public — together.
          </h2>
        </header>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-lg xl:text-xl text-text-300 max-w-md text-center'>
            Join our supportive community where developers collaborate, share
            progress, and grow together.
          </p>
          <div className="flex gap-2">
            <Link
              href='#waitlist'
              className='w-fit bg-linear-to-bl from-secondary-900 via-secondary-600 to-secondary-900 text-text-100 font-bold py-2 px-8 rounded-full mt-4 border 
              border-secondary-800 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-lg sm:text-xl hover:shadow-md hover:shadow-black/30 
                active:scale-100 font-subheading ease-in-out hover:border-white/40'
            >
              Join now
            </Link>
            <Link
              href='/auth'
              className='w-fit bg-linear-to-bl from-primary-900 via-primary-600 to-primary-900 text-text-100 font-bold py-2 px-8 rounded-full mt-4 border 
              border-primary-800 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-lg sm:text-xl hover:shadow-md hover:shadow-black/30 
                active:scale-100 font-subheading ease-in-out hover:border-white/40'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className='flex w-full md:-3/4 lg:w-2/3 justify-center px-2 gap-x-20 gap-y-8 lg:gap-32 md:px-20 text-text-300 md:flex-nowrap flex-wrap text-center'>
        <div className='flex flex-col items-center'>
          <Share2 size={36} />
          <h3 className='font-bold text-lg'>Post</h3>
          <p className='text-md'>your builds</p>
        </div>
        <div className='flex flex-col items-center'>
          <MessageSquareCode size={36} />
          <h3 className='font-bold text-lg'>Connect</h3>
          <p className='text-md'>with builders</p>
        </div>
        <div className='flex flex-col items-center'>
          <MessagesSquare size={36} />
          <h3 className='font-bold text-lg'>Get</h3>
          <p className='text-md'>feedback fast</p>
        </div>
        <div className='flex flex-col items-center'>
          <Shrub size={36} />
          <h3 className='font-bold text-lg'>Learn</h3>
          <p className='text-md'>by building</p>
        </div>
      </div>

      <div className='flex justify-center gap-6 md:gap-8 xl:gap-24 flex-wrap w-full'>
        <div className='flex flex-col text-center border-2 border-secondary-700 p-4 bg-secondary-950/50 w-xs shadow-md shadow-black/50'>
          <p className='font-bold text-xl'>1</p>
          <p className='font-bold text-xl'>Create a build log</p>
          <p>Start sharing your project</p>
        </div>
        <div className='flex flex-col text-center border-2 border-primary-700 p-4 bg-primary-950/50 w-xs shadow-md shadow-black/50'>
          <p className='font-bold text-xl'>2</p>
          <p className='font-bold text-xl'>Engage</p>
          <p>Get feedback, give feedback</p>
        </div>
        <div className='flex flex-col text-center border-2 border-accent-700 p-4 bg-accent-950/50 w-xs shadow-md shadow-black/50'>
          <p className='font-bold text-xl'>3</p>
          <p className='font-bold text-xl'>Grow</p>
          <p>Track your progress, learn from others</p>
        </div>
      </div>

      <WaitlistForm />
    </section>
  );
};

export default Home;
