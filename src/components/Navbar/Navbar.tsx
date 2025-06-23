"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileIcon from "../ProfileIcon";
import useUser from "@/hooks/useUser/useUser";
import { signOutUser } from "./actions";
import supabaseClient from "utils/supabase/client";

export default function NavBar() {
  // Get the user from the client
  const { data: user } = useUser();

  // Sign out the user
  const handleSignOut = async () => {
    try {
      // Sign out from the client
      await supabaseClient.auth.signOut();
      // Sign out from the server
      await signOutUser();
      // Force a hard refresh to clear all state
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full flex items-center justify-between px-10 py-2 bg-black opacity-75 z-50">
      <Link href="/">
        <Image
          src="/BuiltInPublic.png"
          alt="BuiltInPublic logo"
          width={300}
          height={65}
          className="hover:opacity-80 transition-all duration-100"
        />
      </Link>
      <div className="flex items-center gap-5 text-lg">
        <Link
          href="/profile"
          className="hover:opacity-80 transition-all duration-100 active:scale-95"
        >
          <ProfileIcon />
        </Link>
        <Link href="/about" className="hover:text-[#ff00ea]">
          About
        </Link>
        <Link href="/dashboard" className="hover:text-[#ff00ea]">
          Dashboard
        </Link>
        {user && (
          <button
            key="logout"
            onClick={handleSignOut}
            className="bg-[#00c7ff] shadow-lg shadow-cyan-500/40 px-5 py-1 rounded-sm cursor-pointer hover:bg-[#008cff] transition-all duration-100"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
