"use client";

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from "../../../@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import supabaseClient  from "../../../utils/supabase/client";
import { LoginWithEmail } from './actions';


export default function Page() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await LoginWithEmail(email, password);
        } catch (error) {
            setError("Invalid credentials. Try again.");
        }
    };
    const handleLoginWithOAuth = (provider: "github" | "google") => {
        const supabase = supabaseClient;
        supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: location.origin + "/",
            },
        });
    };
      

    return <div className="flex items-center justify-center w-full h-screen">
        <div className="w-96 text-center rounded-md border p-5 space-y-5 relative bg-slate-950">
            <div className="flex items-center gap-2 justify-center mr-4">
            <Globe />
      
            <h1 className="text-2xl font-bold">CodeSphere</h1>
            </div>
            <p className="text-md text-gray-300">Register or Sign In</p>
            <Button variant="outline" 
                    size="medium" 
                    className="w-full flex items-center gap-2 p-2 cursor-pointer"
                    onClick={() => handleLoginWithOAuth("google")}>
            <FcGoogle /> Google</Button>
            <Button variant="outline" 
                    size="medium" 
                    className="w-full flex items-center gap-2 p-2 cursor-pointer"
                    onClick={() => handleLoginWithOAuth("github")}>
            <FaGithub />
            Github</Button>
<hr />
{/*login form for production*/}
            {process.env.NODE_ENV !== "production" && (
                <form onSubmit={handleLoginWithEmail} className='flex flex-col gap-4'>
                    <input className="w-full p-2 rounded-md border" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="w-full p-2 rounded-md border" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="outline" size="medium" className="w-full flex items-center gap-2 p-2 cursor-pointer" type="submit">Login</Button>
                </form>
            )}
            {error && <p className="text-red-500">{error}</p>}

        </div>
        <div className="glowbox -z-10"></div>

        </div>
}