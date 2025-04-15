import { Share2, MessageSquareCode, MessagesSquare, Shrub } from 'lucide-react';


export default function Home() {

  return (
  <div className=" bg-[url('/door.jpg')] h-screen bg-cover bg-center min-h-screen flex flex-col items-center justify-center font-sans pt-20">
    
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 pt-50">
      <h1 className="text-5xl text-white font-bold pt-50 pb-10">CodeSphere</h1>
      <h3 className="font-bold mb-5 tedt-white">Where Devs Build in Public - Together</h3>
      <p className="text-white max-w-md">Join our supportive community where developers collaborate, share progress, and grow together</p>
      <button className="w-sm bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full mt-5 mb-20">Join the Sphere</button>
    </div>

    <div className="flex w-full justify-around px-20">
      <div>
        <Share2 />
        <h3 className="font-bold">Post</h3>
        <p>your builds</p>
      </div>
      <div>
        <MessageSquareCode />
        <h3 className="font-bold">Connect</h3>
        <p>with devs</p>
      </div>
      <div className="flex flex-col">
        <MessagesSquare />
        <h3 className="font-bold">Get</h3>
        <p>feedback fast</p>
      </div>
      <div >
        <Shrub />
        <h3 className="font-bold">Learn</h3>
        <p>by building</p>
      </div>
    </div>

    <div className="flex w-full justify-around mt-20">
     
     
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
