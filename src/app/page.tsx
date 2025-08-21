// app/page.tsx or src/pages/index.tsx (depending on your structure)

import { FC } from 'react';
import { Share2, MessageSquareCode, MessagesSquare, Shrub } from 'lucide-react';
import Link from 'next/link';

const Home: FC = () => {
  return (
    <section className='px-4 md:px-10 py-20 w-full h-full min-h-screen relative bg-primary-950/30'>
      <div className='absolute top-0 left-0 size-40 md:size-100 xl:size-120 rounded-full bg-radial from-sky-500/60 to-indigo-900/60 via-indigo-900/60 blur-3xl'></div>
      <div className='absolute top-[15%] md:top-[20%] lg:top-[20%] left-[-10] md:left-[25%] xl:left-[30%] w-full md:w-1/2 xl:w-2/5 h-1/5 lg:h-1/4 xl:h-1/3 rounded-full bg-radial from-pink-500/60 to-indigo-600/60 blur-3xl'></div>
      <div className='relative lg:pt-8 2xl:pt-[20vh] h-full bg-cover bg-center flex flex-col items-center justify-center pb-8 gap-20'>
        <div className='flex flex-col items-center justify-center text-center max-w-3xl w-full md:w-1/2 mx-auto px-4 gap-4'>
          <header className='flex flex-col gap-2'>
            <h1 className='text-3xl sm:text-4xl xl:text-5xl text-text-100 font-bold font-heading'>
              BuiltInPublic
            </h1>
            <h3 className='font-bold text-text-200 text-xl sm:text-2xl xl:text-3xl font-subheading'>
              Where we build in public — together
            </h3>
          </header>
          <p className='text-text-300 max-w-md sm:text-lg font-body'>
            Join our supportive community where developers collaborate, share
            progress, and grow together.
          </p>
          <Link
            href='/auth'
            className='w-fit bg-linear-to-bl from-accent-900 via-accent-600 to-accent-900 text-text-100 font-bold py-2 px-8 rounded-full mt-4 border border-accent-800
             hover:scale-105 transition-all duration-300 cursor-pointer text-lg sm:text-xl hover:shadow-lg hover:shadow-accent-600/30 active:scale-100 font-subheading'
          >
            Join now
          </Link>
        </div>

        <div className='flex w-full md:-3/4 lg:w-2/3 justify-center px-2 gap-x-20 gap-y-8 lg:gap-32 md:px-20 text-text-300 md:flex-nowrap flex-wrap'>
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

        <div className='grid grid-cols-1 lg:grid-cols-3 w-full lg:w-2/3 gap-x-8 xl:gap-x-20 gap-y-8 text-text-300'>
          <div className='flex flex-col text-center border-2 border-secondary-700 p-4 flex-1 bg-secondary-950/50 max-w-md min-w-xs'>
            <p className='font-bold text-xl'>1</p>
            <p className='font-bold text-xl'>Create a build log</p>
            <p>Start sharing your project</p>
          </div>
          <div className='flex flex-col text-center border-2 border-primary-700 p-4 flex-1 bg-primary-950/50 max-w-md'>
            <p className='font-bold text-xl'>2</p>
            <p className='font-bold text-xl'>Engage</p>
            <p>Get feedback, give feedback</p>
          </div>
          <div className='flex flex-col text-center border-2 border-accent-700 p-4 flex-1 bg-accent-950/50 max-w-md'>
            <p className='font-bold text-xl'>3</p>
            <p className='font-bold text-xl'>Grow</p>
            <p>Track your progress, learn from others</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
