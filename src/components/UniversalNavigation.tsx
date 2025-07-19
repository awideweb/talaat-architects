'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UniversalNavigationProps {
  hideOnHomepage?: boolean;
}

export default function UniversalNavigation({ hideOnHomepage = true }: UniversalNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Check if should hide on homepage
  const shouldHide = hideOnHomepage && pathname === '/';

  const menuItems = [
    { name: 'Home', href: '/', description: 'Return to homepage' },
    { name: 'Projects', href: '/projects', description: 'View all projects' },
    { name: 'About', href: '/about', description: 'Learn about TALAAT STUDIO' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Header state based on scroll
      setIsScrolled(scrollY > 20);
      setIsHeaderShrunk(scrollY > 100);
      
      // Scroll progress calculation
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
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

  // Hide on homepage if specified - after all hooks
  if (shouldHide) {
    return null;
  }

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          height: isHeaderShrunk ? '60px' : '80px'
        }}
        transition={{ 
          y: { duration: 0.6 },
          opacity: { duration: 0.6 },
          height: { duration: 0.3, ease: "easeOut" }
        }}
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
          isScrolled 
            ? 'dark-blur-darkest shadow-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
        role="banner"
        aria-label="Site navigation"
      >
        <div className="w-full h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            animate={{ 
              scale: isHeaderShrunk ? 0.85 : 1,
              opacity: isScrolled ? 1 : 0.9
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <Link 
              href="/"
              className="block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
              aria-label="TALAAT STUDIO - Return to homepage"
            >
              <div className="text-white">
                <h1 className={`font-light tracking-wider leading-none transition-all duration-300 ${
                  isHeaderShrunk ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}>
                  TALAAT
                </h1>
                <h2 className={`font-light tracking-wider leading-none transition-all duration-300 ${
                  isHeaderShrunk ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}>
                  STUDIO
                </h2>
              </div>
            </Link>
          </motion.div>

          {/* Center - Page indicator (optional) */}
          <div className="hidden md:flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/70 text-sm font-light tracking-wide uppercase"
            >
              {pathname === '/projects' && 'Projects'}
              {pathname === '/about' && 'About'}
              {pathname === '/contact' && 'Contact'}
              {pathname.startsWith('/projects/') && 'Project Details'}
            </motion.div>
          </div>

          {/* Hamburger Menu Button */}
          <motion.button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            animate={{ 
              scale: isHeaderShrunk ? 0.9 : 1 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex flex-col items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${
              isHeaderShrunk ? 'w-10 h-10' : 'w-12 h-12'
            } ${
              isScrolled 
                ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm' 
                : 'bg-black/40 hover:bg-black/50 backdrop-blur-[2px]'
            }`}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-controls="universal-navigation-menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white transition-all duration-300 ${
                isHeaderShrunk ? 'w-5 h-0.5 mb-0.5' : 'w-6 h-0.5 mb-1'
              }`}
              aria-hidden="true"
            />
            <motion.div
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`bg-white transition-all duration-300 ${
                isHeaderShrunk ? 'w-5 h-0.5 mb-0.5' : 'w-6 h-0.5 mb-1'
              }`}
              aria-hidden="true"
            />
            <motion.div
              animate={isMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white transition-all duration-300 ${
                isHeaderShrunk ? 'w-5 h-0.5' : 'w-6 h-0.5'
              }`}
              aria-hidden="true"
            />
          </motion.button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1 }}
          className="absolute bottom-0 left-0 h-px bg-white/30 origin-left"
          style={{ width: '100%' }}
          aria-hidden="true"
        />
      </motion.header>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-modal dark-blur-darkest rounded-lg border border-white/10 shadow-2xl"
            id="universal-navigation-menu"
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
                    className={`block py-3 px-4 rounded-md transition-all duration-200 font-light text-center focus:outline-none focus:ring-2 focus:ring-white/30 ${
                      pathname === item.href
                        ? 'text-white bg-white/20 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-describedby={`menu-item-${index}-desc`}
                    aria-current={pathname === item.href ? 'page' : undefined}
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div 
        className={`transition-all duration-300 ${isHeaderShrunk ? 'h-15' : 'h-20'}`}
        aria-hidden="true"
      />
    </>
  );
}