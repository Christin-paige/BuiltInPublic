"use client";

<<<<<<< HEAD:src/app/(main)/[username]/page.tsx
import React, { use } from "react";
=======
import React from "react";
>>>>>>> aeb5d0f (Finished updating all 16 js files left to be tsx files):src/app/(main)/profile/page.tsx
import "./profile.css";
import Image from "next/image";
import FeedSection from "./components/FeedSection";
import UserInfo from "./components/UserInfo";
import StreakSection from "./components/StreakSection";
import GradientBlobs from "./components/GradientBlobs";
<<<<<<< HEAD:src/app/(main)/[username]/page.tsx
<<<<<<<< HEAD:src/app/(main)/[username]/page.tsx
import useProfile from "@/hooks/useProfile/useProfile";
import { notFound } from "next/navigation";

interface ProfileProps {
  params: Promise<{
    username: string;
  }>;
}

export default function Profile({ params }: ProfileProps) {
  const { username } = use(params);

  const { data: profile, isLoading, error } = useProfile(username);

  // TODO: better job handling loading state (skeletons), and error state
  if (isLoading) {
    return null;
  }

  if (!profile || error) {
    return notFound();
  }

========

const Profile = (): JSX.Element => {
>>>>>>>> aeb5d0f (Finished updating all 16 js files left to be tsx files):src/app/(main)/profile/page.js
=======

const Profile = (): JSX.Element => {
>>>>>>> aeb5d0f (Finished updating all 16 js files left to be tsx files):src/app/(main)/profile/page.tsx
  return (
    <main className="h-screen flex flex-col py-16 items-center gap-8 -z-10 overflow-hidden">
      <Image
        src="/example-cover-img.jpg"
        alt="Cover Photo"
        width={2000}
        height={1200}
        className="w-full h-48 object-cover hover:opacity-80 transition-all duration-100 transform-content object-top"
      />

      <div className="flex p-8 gap-12 w-full relative">
        <GradientBlobs />
<<<<<<< HEAD:src/app/(main)/[username]/page.tsx
        <UserInfo profile={profile} />
=======
        <UserInfo />
>>>>>>> aeb5d0f (Finished updating all 16 js files left to be tsx files):src/app/(main)/profile/page.tsx
        <FeedSection />
        <StreakSection />
      </div>
    </main>
  );
};

export default Profile;