'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SlideOutNavigationProps {
  isOpen: boolean;
  onItemClick: () => void;
}

export default function SlideOutNavigation({ isOpen, onItemClick }: SlideOutNavigationProps) {
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 h-full w-80 bg-black/48 backdrop-blur-[2px] z-50 flex items-center justify-center"
        >
          <div className="p-6 lg:p-8 flex flex-col items-center justify-center w-full max-w-xs">
            {/* Logo */}
            <div className="mb-6">
              <Image 
                src="/tarch_logo_wht.svg" 
                alt="Talaat Studio Logo" 
                width={48}
                height={61}
                className="w-12 h-auto mx-auto"
              />
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-wider">
              TALAAT
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-wider mt-1">
              STUDIO
            </h2>
            <div className="w-16 h-px bg-white/60 mx-auto mt-4"></div>
            <p className="text-white/80 text-xs tracking-wide mt-2 font-light">
              ARCHITECTURE
            </p>
            
            {/* Navigation Menu */}
            <div className="mt-8 w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {index > 0 && (
                    <div className="w-full h-px bg-white/20 my-2"></div>
                  )}
                  <Link
                    href={item.href}
                    className="block py-3 px-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 font-light text-center text-sm tracking-wide"
                    onClick={onItemClick}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}