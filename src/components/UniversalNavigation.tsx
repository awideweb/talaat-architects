'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function UniversalNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top-Right Hamburger Menu */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-8 right-8 z-50"
      >
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center justify-center w-10 h-10 bg-black/48 backdrop-blur-[2px] rounded-full hover:bg-black/60 transition-all duration-200"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80 mb-1"
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80 mb-1"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-white/80"
          />
        </motion.button>

        {/* Slide-out Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-16 right-0 bg-black/40 backdrop-blur-[2px] rounded-lg border border-white/10 min-w-[200px]"
            >
              <div className="py-4 px-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {index > 0 && (
                      <div className="w-full h-px bg-white/20 my-2"></div>
                    )}
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 font-light text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}