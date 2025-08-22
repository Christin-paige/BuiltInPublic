import { useState, useEffect } from 'react';

interface BlobPosition {
  x: number;
  y: number;
  size: number;
}

const GradientBlobs = () => {
  const [blobPositions, setBlobPositions] = useState<BlobPosition[]>([]);

  const numBlobs = 8;

  const gradientCombinations = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-purple-600',
    'from-pink-600 to-rose-600',
    'from-cyan-600 to-blue-600',
    'from-emerald-600 to-teal-600',
  ];

  useEffect(() => {
    const positions = Array.from({ length: numBlobs }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 250,
    }));
    setBlobPositions(positions);
  }, []);

  return (
    <>
      {blobPositions.map((position, index) => {
        const gradientClass =
          gradientCombinations[index % gradientCombinations.length] ||
          gradientCombinations[0];
        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${gradientClass} rounded-full blur-[100px] absolute -z-10 opacity-30 transition-all duration-1000`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              width: `${position.size}px`,
              height: `${position.size}px`,
            }}
          />
        );
      })}
    </>
  );
};

export default GradientBlobs;
