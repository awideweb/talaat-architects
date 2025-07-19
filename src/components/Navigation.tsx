'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { name: 'Home', href: '/', description: 'Return to homepage' },
    { name: 'Projects', href: '/projects', description: 'View all projects' },
    { name: 'About', href: '/about', description: 'Learn about TALAAT STUDIO' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMenuOpen) return;

      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
        return;
      }

      // Arrow key navigation within menu
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const menuItems = menuRef.current?.querySelectorAll('a[role="menuitem"]');
        if (!menuItems) return;

        const currentIndex = Array.from(menuItems).findIndex(
          item => item === document.activeElement
        );
        
        let nextIndex;
        if (event.key === 'ArrowDown') {
          nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        }

        (menuItems[nextIndex] as HTMLElement).focus();
      }

      // Home/End keys for first/last item
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        const menuItems = menuRef.current?.querySelectorAll('a[role="menuitem"]');
        if (!menuItems) return;

        const targetIndex = event.key === 'Home' ? 0 : menuItems.length - 1;
        (menuItems[targetIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-[2px] rounded-full hover:bg-black/50 focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-controls="navigation-menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white mb-1"
            aria-hidden="true"
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white mb-1"
            aria-hidden="true"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white"
            aria-hidden="true"
          />
        </button>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-black/40 backdrop-blur-[2px] rounded-lg border border-white/10"
            id="navigation-menu"
            role="menu"
            aria-label="Main navigation"
          >
            <div className="py-4 px-6 min-w-[200px]">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 focus:text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md transition-all duration-200 font-light text-center"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-describedby={`menu-item-${index}-desc`}
                  >
                    {item.name}
                    <span
                      id={`menu-item-${index}-desc`}
                      className="sr-only"
                    >
                      {item.description}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}