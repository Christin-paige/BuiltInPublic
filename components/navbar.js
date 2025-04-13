import React from 'react';
import Link from 'next/link'
   

export default function NavBar(){
    return (
       <nav className="sticky top-0 w-full flex items-center justify-between p-10 bg-black opacity-75">
        <Link href="/">
        <img src="logo.png" alt="codesphere logo" className="w-sm"/></Link>
        <div className="flex items-center gap-5">
        <Link href="/about" className="hover:text-[#ff00ea]">About</Link>
        <Link href="/dashboard" className="hover:text-[#ff00ea]">Dashboard</Link>
        <button className="bg-[#00c7ff] shadow-lg shadow-cyan-500/50  px-5 py-1 rounded-sm">Sign-Up</button>
        </div>
       </nav>
    )
}