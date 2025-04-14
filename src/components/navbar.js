'use client';

import React from 'react';
import Link from 'next/link'
import { supabase } from '../../utils/supabase/client'
   

export default function NavBar(){
    const signIn = async () => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        })
        if (error) {
            console.error('Error signing in:', error.message)
            return
        }
        console.log('sign in with google')
    }
   
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error.message)
            return
        }
        console.log('sign out')
    }
    return (
       <nav className="sticky top-0 w-full flex items-center justify-between p-10 bg-black opacity-75">
        <Link href="/">
        <img src="logo.png" alt="codesphere logo" className="w-sm"/></Link>
        <div className="flex items-center gap-5">
        <Link href="/about" className="hover:text-[#ff00ea]">About</Link>
        <Link href="/dashboard" className="hover:text-[#ff00ea]">Dashboard</Link>
        <button 
        onClick={signIn} className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm">Login</button>
        </div>
       </nav>
    )
}