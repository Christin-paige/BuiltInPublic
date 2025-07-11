"use client";

import React from "react";
import "./profile.css";
import Image from "next/image";
import FeedSection from "./components/FeedSection";
import UserInfo from "./components/UserInfo";
import StreakSection from "./components/StreakSection";
import GradientBlobs from "./components/GradientBlobs";

const Profile = (): JSX.Element => {
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
        <UserInfo />
        <FeedSection />
        <StreakSection />
      </div>
    </main>
  );
};

export default Profile;
