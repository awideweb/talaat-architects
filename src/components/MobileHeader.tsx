'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface MobileHeaderProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function MobileHeader({ 
  isScrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  buttonRef 
}: MobileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 60,
        height: 'auto'
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        opacity: { duration: 0.8, delay: 0.2 },
        y: { duration: 0.8, delay: 0.2 }
      }}
      className="sm:hidden"
      style={{
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'none'
      }}
    >
      <motion.div 
        animate={{ 
          padding: isScrolled ? '0.75rem' : '1rem',
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.48)',
          backdropFilter: isScrolled ? 'blur(8px)' : 'blur(2px)',
          height: 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
        style={{
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          minHeight: 'auto',
          height: 'auto'
        }}
      >
        {/* Mobile Layout */}
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <Link 
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
              aria-label="TALAAT STUDIO - Return to homepage"
            >
              <div className="mr-2">
                <Image 
                  src="/tarch_logo_wht.svg" 
                  alt="Talaat Studio Logo" 
                  width={24}
                  height={31}
                  className="w-6 h-auto"
                />
              </div>
              
              <div className="text-left">
                <h1 className="text-base font-light text-white tracking-wider">
                  TALAAT STUDIO
                </h1>
                <p className="text-white/80 text-xs tracking-wide font-light">
                  ARCHITECTURE
                </p>
              </div>
            </Link>
            
            {/* Mobile Hamburger Menu Button */}
            <motion.button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center justify-center w-8 h-8 bg-black/40 backdrop-blur-[2px] border border-white/10 hover:bg-black/50 transition-all duration-200 ml-3"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 1 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-0.5 bg-white/80 mb-0.5"
              />
              <motion.div
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-0.5 bg-white/80 mb-0.5"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: -45, y: -1 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-0.5 bg-white/80"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}