"use client";

import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../../../utils/supabase/client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function Profile({ user }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
 
 
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
 
  if (!profile) {
    return (
      <div className="text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white justify-content-center items-center flex flex-col">
       <h1 className="font-bold">Profile</h1>
       
        <img
        src={profile.avatar_url}
        alt={profile.name}
        className="rounded-full w-24 h-24 mt-3 mb-3"/>
      <span className="font-semibold">{profile.name}</span>
 </div>
  );
}
