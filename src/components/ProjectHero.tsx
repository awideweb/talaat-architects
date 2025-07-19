'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance images (slower than homepage)
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 6000); // 6 seconds per image

      return () => clearInterval(interval);
    }
  }, [images.length]);

  // Handle scroll bounce effect and progress
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
    // Calculate scroll progress
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(progress, 100));
    
    if (isBottom && !isAtBottom) {
      setIsAtBottom(true);
      // Add bounce animation
      container.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        container.style.transform = 'translateY(0)';
        setTimeout(() => {
          setIsAtBottom(false);
        }, 300);
      }, 150);
    }
  }, [isAtBottom]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

            {/* Image Counter */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 pt-6 border-t border-white/20"
              >
                <div className="text-white/60 text-xs font-light tracking-wide uppercase">
                  Image {currentImageIndex + 1} of {images.length}
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

        {/* Right Panel - Extended Info (Optional Scroll Content) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2 p-4 lg:p-8 h-full flex items-center justify-center"
        >
          <div className="w-full max-w-2xl mx-auto relative">
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none z-30"></div>
            
            {/* Scrollable Content */}
            <div
              ref={scrollContainerRef}
              className="bg-black/40 backdrop-blur-[2px] h-[60vh] lg:h-[65vh] w-full overflow-y-auto hide-scrollbar p-4 lg:p-8 relative transition-transform duration-300 ease-out"
              style={{
                scrollBehavior: 'smooth'
              }}
            >
              {/* Top gradient */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none z-30"></div>

              {/* Scroll Progress Indicator */}
              <div className="absolute right-4 top-16 bottom-24 w-px bg-white/20">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: scrollProgress / 100 }}
                  transition={{ duration: 0.1 }}
                  className="w-full bg-white/60 origin-top"
                  style={{ height: '100%' }}
                />
              </div>

              {/* Extended Project Information */}
              <div className="space-y-8 pt-16 pb-24 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white/8 backdrop-blur-[2px] p-6 lg:p-8 rounded"
                >
                  <h3 className="text-white font-light text-sm lg:text-lg tracking-wide mb-4 uppercase">
                    Project Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60 font-light uppercase tracking-wide block mb-1">Year</span>
                      <span className="text-white/90">{year}</span>
                    </div>
                    <div>
                      <span className="text-white/60 font-light uppercase tracking-wide block mb-1">Location</span>
                      <span className="text-white/90">{location}</span>
                    </div>
                    <div>
                      <span className="text-white/60 font-light uppercase tracking-wide block mb-1">Category</span>
                      <span className="text-white/90">{category}</span>
                    </div>
                    <div>
                      <span className="text-white/60 font-light uppercase tracking-wide block mb-1">Images</span>
                      <span className="text-white/90">{images.length}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-center"
                >
                  <p className="text-white/60 text-xs lg:text-sm font-light tracking-wide uppercase">
                    Scroll down to view project gallery
                  </p>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mt-4"
                  >
                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}