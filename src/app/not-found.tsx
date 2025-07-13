"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const imagePool = [
  "/404/insideout.png",
  "/404/chicken.png",
  "/404/monster.png",
  "/404/404.png",
];

export default function NotFound() {
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * imagePool.length);
    setRandomImage(imagePool[index]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center p-8">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 mb-6">
        Sorry, we couldn’t find what you were looking for.
      </p>

      {randomImage && (
        <Image
          src={randomImage}
          alt="Funny 404 Illustration"
          width={400}
          height={400}
          className="rounded-md"
        />
      )}

      <p className="mt-6">
        Go back{" "}
        <a href="/" className="text-blue-400 underline">
          home
        </a>{" "}
        and try again.
      </p>
    </div>
  );
}
