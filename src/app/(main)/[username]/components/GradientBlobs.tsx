import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const getGradientClass = (index: number): string => {
    const safeIndex = Math.abs(index) % gradientCombinations.length;
    return (
      gradientCombinations.at(safeIndex) ??
      gradientCombinations.at(0) ??
      'from-purple-600 to-pink-600'
    );
  };

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
        const gradientClass = getGradientClass(index);

        // random offsets and duration per blob
        const offsetX = Math.random() * 50 - 25; // ±25px horizontal drift
        const offsetY = Math.random() * 30 - 15; // ±15px vertical drift
        const duration = 5 + Math.random() * 5; // 5–10s duration

        return (
          <motion.div
            key={index}
            className={`bg-gradient-to-r ${gradientClass} rounded-full blur-[100px] absolute -z-10 opacity-30 transition-all duration-1000`}
            style={
              {
                '--blob-x': `${position.x}px`,
                '--blob-y': `${position.y}px`,
                '--blob-size': `${position.size}px`,
                transform: 'translate(var(--blob-x), var(--blob-y))',
                width: 'var(--blob-size)',
                height: 'var(--blob-size)',
              } as React.CSSProperties
            }
          />
        );
      })}
    </>
  );
};

export default GradientBlobs;
