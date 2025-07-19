'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectImage {
  src: {
    avif: string;
    webp: string;
    jpeg: string;
  };
  thumbnail: {
    avif: string;
    webp: string;
    jpeg: string;
  };
  alt: string;
  width: number;
  height: number;
}

interface ProjectHeroProps {
  title: string;
  description: string;
  year: number;
  location: string;
  category: string;
  images: ProjectImage[];
}

export default function ProjectHero({ 
  title, 
  description, 
  year, 
  location, 
  category, 
  images 
}: ProjectHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Auto-advance images (slower than homepage)
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 6000); // 6 seconds per image

      return () => clearInterval(interval);
    }
  }, [images.length]);


  return (
    <header 
      className="relative w-full h-screen overflow-hidden"
      role="banner"
      aria-label="Project hero section"
    >
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex]?.src.jpeg || images[0]?.src.jpeg}
              alt={images[currentImageIndex]?.alt || `${title} project image`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-3">
        {/* Left Panel - Project Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-1 flex items-start lg:items-center justify-start p-4 lg:p-8 pt-8 lg:pt-4"
        >
          <motion.div 
            className="bg-black/48 backdrop-blur-[2px] p-6 lg:p-8 flex flex-col w-full lg:max-w-xs"
            style={{
              height: 'auto',
              minHeight: 'auto'
            }}
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <Link 
                href="/projects" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                BACK TO PROJECTS
              </Link>
            </motion.div>

            {/* Project Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl lg:text-3xl font-light text-white tracking-wider mb-4"
            >
              {title}
            </motion.h1>

            {/* Project Meta */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-4 text-sm text-white/70 font-light tracking-wide">
                <span>{year}</span>
                <span>•</span>
                <span>{location}</span>
                <span>•</span>
                <span className="uppercase">{category}</span>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="w-16 h-px bg-white/60 mb-6"></div>

            {/* Project Description */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/80 text-sm leading-relaxed font-light"
            >
              {description}
            </motion.p>

            {/* Image Counter with Navigation */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 pt-6 border-t border-white/20"
              >
                {/* Navigation controls */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={goToPrevious}
                    className="text-white/60 hover:text-white transition-colors duration-200 p-1"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="text-white/60 text-xs font-light tracking-wide uppercase">
                    Image {currentImageIndex + 1} of {images.length}
                  </div>
                  
                  <button
                    onClick={goToNext}
                    className="text-white/60 hover:text-white transition-colors duration-200 p-1"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress indicators */}
                <div className="flex gap-1 mt-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/30 w-2'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Panel - Empty space */}
        <div className="lg:col-span-2"></div>
      </div>

      {/* Bottom Center Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
      >
        <p className="text-white/60 text-xs lg:text-sm font-light tracking-wide uppercase mb-4">
          Scroll down to view project gallery
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </header>
  );
}