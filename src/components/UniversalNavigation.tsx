'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SlideOutNavigation from './SlideOutNavigation';
import MobileHeader from './MobileHeader';

interface UniversalNavigationProps {
  hideOnHomepage?: boolean;
}

export default function UniversalNavigation({ hideOnHomepage = true }: UniversalNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Check if should hide on homepage
  const shouldHide = hideOnHomepage && pathname === '/';

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Header state based on scroll
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          buttonRef.current?.focus();
        }
        if (isDesktopMenuOpen) {
          setIsDesktopMenuOpen(false);
          desktopButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isDesktopMenuOpen]);


  // Hide on homepage if specified - after all hooks
  if (shouldHide) {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader 
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        buttonRef={buttonRef}
      />

      {/* Desktop Top-Right Hamburger Menu (always visible) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden sm:block fixed top-8 right-8 z-50"
      >
        <motion.button
          ref={desktopButtonRef}
          onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
          className="flex flex-col items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-[2px] border border-white/10 hover:bg-black/50 transition-all duration-200"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isDesktopMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80 mb-1"
          />
          <motion.div
            animate={isDesktopMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80 mb-1"
          />
          <motion.div
            animate={isDesktopMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80"
          />
        </motion.button>
      </motion.div>

      {/* Mobile Slide-out Navigation */}
      <SlideOutNavigation 
        isOpen={isMenuOpen} 
        onItemClick={() => setIsMenuOpen(false)} 
      />

      {/* Desktop Slide-out Navigation */}
      <SlideOutNavigation 
        isOpen={isDesktopMenuOpen} 
        onItemClick={() => setIsDesktopMenuOpen(false)} 
      />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Desktop Overlay */}
      <AnimatePresence>
        {isDesktopMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:block fixed inset-0 bg-black/20 backdrop-blur-sm z-overlay"
            onClick={() => setIsDesktopMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

    </>
  );
}