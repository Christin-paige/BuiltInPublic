'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { supabase } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation';
   

export default function NavBar(){
    const [user, setUser] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const {data} = await supabase.auth.getUser()
            setUser(data.user)
        };
        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
          });
      console.log('user', user)
        
          return () => {
            listener.subscription.unsubscribe();
          };
        }, []);
      

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
                queryParams: {
                    prompt: 'select_account' // forces account chooser to appear
                  }
            }
        })
        if (error) {
            console.error('Error signing in:', error.message)
            return
        }
        console.log('sign in with google')
    }
   
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error.message)
            return
        }else {
            router.push('/')//back to landing page after signing out
            setUser(null)
            console.log('sign out success')
        }
    }
    return (
       <nav className="sticky top-0 w-full flex items-center justify-between p-10 bg-black opacity-75">
        <Link href="/">
        <img src="logo.png" alt="codesphere logo" className="w-sm"/></Link>
        <div className="flex items-center gap-5">
        <Link href="/about" className="hover:text-[#ff00ea]">About</Link>
        <Link href="/dashboard" className="hover:text-[#ff00ea]">Dashboard</Link>
       
        {user ? (
            <button onClick={handleSignOut} className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm">Logout</button>
        ) : (
       
            <button onClick={handleSignIn} className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm">Login</button>
        )}
       
        </div>
       </nav>
    )
}