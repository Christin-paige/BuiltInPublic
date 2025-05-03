"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import "./profile.css";
import { supabase } from "../../../utils/supabase/client";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function Profile({ user }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient();
      if (!user) return;
    
      const { data, error } = await supabase
        .from("profiles")
        .select({profiles_id: profiles.id})
       
      
       if(error) {
        console.error("Error fetching profile:", error);
       }else{
        setProfile(data);
       }
      }
    
    fetchData();
  }, [user]);
  console.log("profile", user);
 
  // if (!profile) {
  //   return (
  //     <div className="text-white">
  //       <p>Loading profile...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] h-screen flex flex-col py-16 items-center gap-12 -z-10">
      <main className="flex flex-col relative w-full">

        <header className="flex flex-col w-full">
          <Image src="/example-cover-img.jpg" alt="Cover Photo" width={2000} height={1200} className="w-full h-48 object-cover hover:opacity-80 transition-all duration-100 transform-content object-top" />
          <div className="rounded-full border-2 border-[#00c7ff] w-40 h-40 flex items-center relative justify-center cyan-glow -top-12 left-8">
            <p>Image Goes Here</p>
          </div>
          <h1 className="text-4xl">Hello (Users Name)</h1>
        </header>

        <article className="flex flex-col gap-2 p-4 border-2 border-[#00c7ff] cyan-glow bg-[#1d1d1d]/30">
          <h2 className="text-2xl text-center">About</h2>
          <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

        </article>

        <div className="flex gap-8 w-auto relative justify-around h-fit mx-auto">

          <div className="flex flex-col gap-2 border-purple-500 border-2 p-4 items-center justify-center bg-[#1d1d1d]/30 purple-glow">
            <h2 className="text-2xl">Current Streak</h2>
            <p className="text-4xl font-bold">10</p>
          </div>

          <div className="flex flex-col gap-2 border-[#ff00ea] border-2 p-4 items-center justify-center bg-[#1d1d1d]/30 magenta-glow">
            <h2 className="text-2xl">Badges</h2>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full bg-[#00c7ff]"></div>
              <div className="w-12 h-12 rounded-full bg-[#00c7ff]"></div>
              <div className="w-12 h-12 rounded-full bg-[#00c7ff]"></div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}