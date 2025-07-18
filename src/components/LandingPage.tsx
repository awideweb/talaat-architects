'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LandingPageProps {
  onComplete: () => void;
}

export default function LandingPage({ onComplete }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    // Let the GIF play for a bit longer to show the animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 4000); // Show GIF for 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="relative w-full max-w-4xl mx-auto px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: gifLoaded ? 1 : 0, scale: gifLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Landing Animation GIF */}
          <Image
            src="/landing-animation.gif"
            alt="TALAAT STUDIO Logo Animation"
            width={800}
            height={400}
            className="w-full h-auto max-w-3xl mx-auto"
            style={{
              filter: 'brightness(1.1) contrast(1.1)',
            }}
            onLoad={() => setGifLoaded(true)}
            priority
            unoptimized // Prevent Next.js from optimizing GIF
          />
        </motion.div>
      </div>
    </motion.div>
  );
}