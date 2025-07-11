import { Share2, MessageSquareCode, MessagesSquare, Shrub } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

const Home: FC = () => {
  return (
    <section className="px-4 md:px-10 py-20 w-full h-full bg-gray-900 min-h-screen relative">
      <div className="absolute top-0 left-0 size-40 md:size-100 xl:size-120 rounded-full bg-radial from-sky-500/60 to-indigo-900/60 via-indigo-900/60 blur-3xl"></div>
      <div className="absolute top-[15%] md:top-[20%] lg:top-[20%] left-[-10] md:left-[25%] xl:left-[30%] w-full md:w-1/2 xl:w-2/5 h-1/5 lg:h-1/4 xl:h-1/3 rounded-full bg-radial from-pink-500/60 to-indigo-600/60 blur-3xl"></div>
      <div className="relative pt-[20vh] h-full bg-cover bg-center flex flex-col items-center justify-center font-sans pb-8 gap-20">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full md:w-1/2 mx-auto px-4 gap-4">
          <h1 className="text-5xl text-white font-bold">BuiltInPublic</h1>
          <h3 className="font-bold text-white text-3xl">
            Where Devs Build in Public - Together
          </h3>
          <p className="text-white max-w-md text-lg">
            Join our supportive community where developers collaborate, share
            progress, and grow together
          </p>
          <Link
            href="/auth"
            className="w-xs md:w-sm bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full mt-4
              hover:scale-105 transition-all duration-300 cursor-pointer text-xl hover:shadow-lg hover:shadow-violet-500/40"
          >
            Join
          </Link>
        </div>

        <div className="flex w-full md:-3/4 lg:w-2/3 justify-around px-2 gap-8 md:px-20">
          <div className="flex flex-col items-center">
            <Share2 size={36} />
            <h3 className="font-bold text-lg">Post</h3>
            <p className="text-md">your builds</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquareCode size={36} />
            <h3 className="font-bold text-lg">Connect</h3>
            <p className="text-md">with devs</p>
          </div>
          <div className="flex flex-col items-center">
            <MessagesSquare size={36} />
            <h3 className="font-bold text-lg">Get</h3>
            <p className="text-md">feedback fast</p>
          </div>
          <div className="flex flex-col items-center">
            <Shrub size={36} />
            <h3 className="font-bold text-lg">Learn</h3>
            <p className="text-md">by building</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full lg:w-2/3 gap-x-8 xl:gap-x-20 gap-y-8">
          <div className="flex flex-col text-center border-2 border-cyan-500 p-4 bg-black/40 flex-1">
            <p className="font-bold text-xl">1</p>
            <p className="font-bold text-xl">Create a build log</p>
            <p>Start sharing your project</p>
          </div>
          <div className="flex flex-col text-center border-2 border-purple-500 p-4 bg-black/40 flex-1">
            <p className="font-bold text-xl">2</p>
            <p className="font-bold text-xl">Engage</p>
            <p>Get feedback, give feedback</p>
          </div>
          <div className="flex flex-col text-center border-2 border-rose-500 p-4 bg-black/40 flex-1">
            <p className="font-bold text-xl">3</p>
            <p className="font-bold text-xl">Grow</p>
            <p>Track your progress, learn from others</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;