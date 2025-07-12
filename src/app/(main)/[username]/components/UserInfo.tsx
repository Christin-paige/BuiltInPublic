import { Profile } from "@/repositories/profileRepository/profile.types";
import { Settings } from "lucide-react";

interface UserInfoProps {
  profile: Profile;
}

export default function UserInfo({ profile }: UserInfoProps) {
  return (
    <section className="flex flex-col gap-4 w-1/4 transform translate-y-[-8rem] relative">
      <div className="rounded-full border-2 border-[#00c7ff] w-40 h-40 flex items-center relative justify-center cyan-glow">
        Image Goes Here
      </div>
      <h1 className="text-3xl">{profile.username}</h1>
      <div className="bg-slate-950 p-4 rounded-lg border">
        <p>
          This is the bio section. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-2 rounded-lg border text-center">
          <h2 className="text-xl">Followers</h2>
          <p className="text-lg">100</p>
        </div>
        <div className="bg-slate-950 p-2 rounded-lg border text-center">
          <h2 className="text-xl">Following</h2>
          <p className="text-lg">100</p>
        </div>
        <div className="bg-slate-950 p-2 rounded-lg border text-center">
          <h2 className="text-xl">Projects</h2>
          <p className="text-lg">100</p>
        </div>
        <div className="bg-slate-950 p-2 rounded-lg border text-center">
          <h2 className="text-xl">Posts</h2>
          <p className="text-lg">100</p>
        </div>
      </div>
      <button
        className="bg-slate-950 p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all
            duration-100 active:scale-95 flex items-center gap-2"
      >
        <Settings className="w-6 h-6" />
        <p>Settings</p>
      </button>
    </section>
  );
}
