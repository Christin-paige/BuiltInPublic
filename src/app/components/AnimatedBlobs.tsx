'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Blob {
  x: number;
  y: number;
  size: number;
  gradient: string;
  offsetX: number;
  offsetY: number;
  duration: number;
}

interface AnimatedBlobsProps {
  numBlobs?: number;
  gradients?: string[];
  className?: string;
}

const defaultGradients = [
  'from-pink-500/60 to-indigo-600/60',
  'from-sky-500/60 to-indigo-900/60 via-indigo-900/60',
  'from-purple-600/50 to-pink-500/50',
  'from-blue-500/50 to-cyan-600/50',
  'from-sky-500/60 to-indigo-900/60 via-indigo-900/60', // new gradient
  'from-pink-500/60 to-indigo-600/60', // new gradient
];

const AnimatedBlobs = ({
  numBlobs = 6,
  gradients = defaultGradients,
  className = '',
}: AnimatedBlobsProps) => {
  const [blobs, setBlobs] = useState<Blob[]>([]);

  useEffect(() => {
    const margin = 60; // safety buffer so blobs don’t touch edges
    const maxDriftX = 100;
    const maxDriftY = 80;

    const generatedBlobs = Array.from({ length: numBlobs }, (_, i) => {
      const startX = margin + Math.random() * (window.innerWidth - 2 * margin);
      const startY = margin + Math.random() * (window.innerHeight - 2 * margin);

      const offsetX = Math.min(maxDriftX, window.innerWidth - margin - startX);
      const offsetY = Math.min(maxDriftY, window.innerHeight - margin - startY);

      return {
        x: startX,
        y: startY,
        size: 200 + Math.random() * 150,
        gradient: gradients[i % gradients.length],
        offsetX,
        offsetY,
        duration: 7 + Math.random() * 5,
      };
    });

    setBlobs(generatedBlobs);
  }, [numBlobs, gradients]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute -z-10 rounded-full blur-3xl bg-radial bg-gradient-to-r ${blob.gradient}`}
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            left: blob.x,
            top: blob.y,
            zIndex: index,
          }}
          animate={{
            x: [-blob.offsetX, blob.offsetX, -blob.offsetX],
            y: [-blob.offsetY, blob.offsetY, -blob.offsetY],
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: {
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
            y: {
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
            scale: {
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};
export default AnimatedBlobs;
