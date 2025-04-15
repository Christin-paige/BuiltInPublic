import { Smile } from "lucide-react";

export default function Profile() {
  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white justify-content-center items-center flex flex-col">
      <h1 className="font-bold">Profile</h1>
      
      <Smile className="w-15 h-15 mt-5 mb-2" />

      <h1 className="font-semibold">Name</h1>
      <p className="pt-3 hover:text-[#00c7ff]">Messages</p>
      <p className="pt-3 hover:text-[#00c7ff]">Forums</p>
      <p className="pt-3 hover:text-[#00c7ff]">Friends</p>
    </div>
  );
}
