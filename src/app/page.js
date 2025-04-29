import { Share2, MessageSquareCode, MessagesSquare, Shrub } from 'lucide-react';


export default function Home() {

  return (
  <div className=" bg-[url('/door.jpg')] h-screen bg-cover bg-center min-h-screen flex flex-col items-center justify-center font-sans pt-72 gap-12">
    
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 gap-4">

      <h1 className="text-5xl text-white font-bold">CodeSphere</h1>
      <h3 className="font-bold text-white text-3xl">Where Devs Build in Public - Together</h3>
      <p className="text-white max-w-md text-lg">Join our supportive community where developers collaborate, share progress, and grow together</p>
      <button 
        className="w-sm bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full mt-4
        hover:scale-105 transition-all duration-300 cursor-pointer text-xl hover:shadow-lg hover:shadow-violet-500/40"
      >
        Join the Sphere
      </button>

    </div>

    <div className="flex w-full justify-around px-20">
      <div className='flex flex-col items-center'>
        <Share2 size={36}/>
        <h3 className="font-bold text-lg">Post</h3>
        <p className='text-md'>your builds</p>
      </div>
      <div className='flex flex-col items-center'>
        <MessageSquareCode size={36}/>
        <h3 className="font-bold text-lg">Connect</h3>
        <p className='text-md'>with devs</p>
      </div>
      <div className="flex flex-col items-center">
        <MessagesSquare size={36}/>
        <h3 className="font-bold text-lg">Get</h3>
        <p className='text-md'>feedback fast</p>
      </div>
      <div className="flex flex-col items-center">
        <Shrub size={36}/>
        <h3 className="font-bold text-lg">Learn</h3>
        <p className='text-md'>by building</p>
      </div>
    </div>

    <div className="flex w-full justify-around">
     
     
      <div className="flex flex-col text-center border-2 border-cyan-500 p-10 m-10">
        <p className="font-bold text-xl">1</p>
        <p className="font-bold text-xl">Create a build log</p>
        <p>Start sharing your project</p>
      </div>
      <div className="flex flex-col text-center border-2 border-purple-500 p-10 m-10">
      <p className="font-bold text-xl">2</p>
        <p className="font-bold text-xl">Engage</p>
        <p>Get feedback, give feedback</p>
      </div>
      <div className="flex flex-col text-center border-2 border-rose-500 p-10 m-10">
      <p className="font-bold text-xl">3</p>
        <p className="font-bold text-xl">Grow</p>
        <p>Track your progress, learn from others</p>
      </div>
      </div>
 

  </div>
  
  );
}
