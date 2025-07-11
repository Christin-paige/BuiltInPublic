import { useState, useEffect } from "react";

export default function GradientBlobs() {
  const [blobPositions, setBlobPositions] = useState([]);

  const numBlobs = 8;

  // Define gradient combinations for the blobs
  const gradientCombinations = [
    "from-purple-600 to-pink-600",
    "from-blue-600 to-cyan-600",
    "from-green-600 to-emerald-600",
    "from-orange-600 to-red-600",
    "from-indigo-600 to-purple-600",
    "from-pink-600 to-rose-600",
    "from-cyan-600 to-blue-600",
    "from-emerald-600 to-teal-600",
  ];

  useEffect(() => {
    // Generate random positions for all blobs
    const positions = Array.from({ length: numBlobs }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 250,
    }));
    setBlobPositions(positions);
  }, []);

  return (
    <>
      {blobPositions.map((position, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${gradientCombinations[index]} rounded-full blur-[100px] absolute z-[-1] opacity-30 transition-all duration-1000`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: `${position.size}px`,
            height: `${position.size}px`,
          }}
        />
      ))}
    </>
  );
}
