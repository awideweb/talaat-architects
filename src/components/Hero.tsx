'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { heroImages, heroConfig } from '@/config/hero-images';
import { timelineContent, awards } from '@/data/hero-content';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance images using config
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, heroConfig.autoAdvanceInterval);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll bounce effect
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: heroConfig.transitionDuration / 1000, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
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
        {/* Left Panel - Studio Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-1 flex items-center justify-start p-4 lg:p-8"
        >
          <div className="bg-black/48 backdrop-blur-[2px] p-6 lg:p-8 aspect-square flex items-center justify-center max-w-xs">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wider">
                TALAAT
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wider mt-1">
                STUDIO
              </h2>
              <div className="w-16 h-px bg-white/60 mx-auto mt-4"></div>
              <p className="text-white/80 text-xs tracking-wide mt-2 font-light">
                ARCHITECTURE
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Scrollable Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2 p-4 lg:p-8 h-full flex"
        >
          <div className="w-full max-w-2xl mx-auto">
            {/* Content Column */}
            <div
              ref={scrollContainerRef}
              className="bg-black/40 backdrop-blur-[2px] h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)] w-full overflow-y-auto custom-scrollbar p-4 lg:p-8 relative transition-transform duration-300 ease-out"
              style={{
                scrollBehavior: 'smooth'
              }}
            >
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-white/30 transform -translate-x-1/2"></div>

              {/* Timeline Content */}
              <div className="space-y-12 lg:space-y-16 pt-8 pb-24">
                {timelineContent.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`relative flex ${item.side === 'left' ? 'justify-start pr-4 lg:pr-8' : 'justify-end pl-4 lg:pl-8'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 top-4 w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full transform -translate-x-1/2 z-10"></div>
                    
                    {/* Content Tab */}
                    <div className={`bg-white/8 backdrop-blur-[2px] p-6 lg:p-8 rounded max-w-xs ${item.side === 'left' ? 'mr-4 lg:mr-8' : 'ml-4 lg:ml-8'}`}>
                      <h3 className="text-white font-light text-xs lg:text-sm tracking-wide mb-3 lg:mb-4 uppercase">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-xs lg:text-sm leading-relaxed font-light">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Awards Section - Full Width */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-white/20 -mx-4 lg:-mx-8 px-4 lg:px-8"
                >
                  <h3 className="text-white font-light text-sm lg:text-lg tracking-wide mb-6 lg:mb-8 text-center uppercase">
                    Recognition & Awards
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {awards.map((award, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-[1px] p-4 rounded border border-white/10"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-light text-xs lg:text-sm tracking-wide uppercase flex-1">
                            {award.title}
                          </h4>
                          <span className="text-white/60 text-xs font-light ml-2">
                            {award.year}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed font-light">
                          {award.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}