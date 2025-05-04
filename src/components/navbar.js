"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabaseClient from "../../utils/supabase/client";


export default function NavBar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
   const supabase = supabaseClient;
 useEffect(() => {
   // const getUser = async () => {
     // const { data } = await supabaseClient.auth.getUser();
      //setUser(data?.user || null);
    //};
    //getUser();

   const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        console.log("event", event);
        //setUser(session?.user || null);
      }
    );
   // console.log("user", user);

  return () => {
     listener?.subscription?.unsubscribe();
    };
  }, []);
//console.log("navbar user", user)
  //const handleSignIn = async () => {

    //const { error } = await supabase.auth.signInWithOAuth({
      //provider: process.env.NEXT_PUBLIC_AUTH_PROVIDER,

      //options: {
       // redirectTo: `${window.location.origin}/dashboard`,
        //queryParams: {
          //prompt: "select_account", // forces account chooser to appear
        //},
      //},
    //});
    //if (error) {
      //console.error("Error signing in:", error.message);
    
    //}else{
      //return redirect("data.url")
    //}
    //console.log("sign in with google");
  //};

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    } else {
      setUser(null);
      router.push("/auth"); //back to signin page after signing out
      
      console.log("sign out success");
    }
  };
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between p-10 bg-black opacity-75">
      <Link href="/">
        <img src="logo3.png" alt="codesphere logo" className="w-sm" />
      </Link>
      <div className="flex items-center gap-5">
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
            className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm cursor:pointer"
          >
            Logout
          </button>
      )}
        
        {/* : (
          <button
          key="login"
            onClick={handleSignIn}
            className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm"
          >
            Login
          </button>
           */}
       
         
       
      </div>
    </nav>
  );
}
