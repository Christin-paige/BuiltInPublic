"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Profile() {
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState({ name: "", avatar_url: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if(sessionError || !session) {
        console.error("Error fetching session:", sessionError);
        return;
      }
      
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('User error:', userError)
        // Handle error: Show error message or redirect
        return
      }

        const { data, error } = await supabase
          .from("profiles")
          .select("name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        }else{
          setProfile(data);
        }
        setLoading(false);
    };
    getProfile();
  }, [supabase]);

  if (loading) return <p>Loading profile...</p>
  if (!profile) return <div>No profile found</div>
  

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white justify-content-center items-center flex flex-col">
      <h1 className="font-bold">Profile</h1>

      <img
        src={profile.avatar_url || '/default-avatar.png'}
        alt={profile.name}
        className="rounded-full w-24 h-24 mt-3 mb-3"
      />
      <span className="text-lg font-medium">{profile.name}</span>
      <p className="pt-3 hover:text-[#00c7ff]">Messages</p>
      <p className="pt-3 hover:text-[#00c7ff]">Forums</p>
      <p className="pt-3 hover:text-[#00c7ff]">Friends</p>
    </div>
  );
}
