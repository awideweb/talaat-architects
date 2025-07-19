'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StickyHeaderProps {
  className?: string;
  showBackButton?: boolean;
  title?: string;
}

export default function StickyHeader({ 
  className = '', 
  showBackButton = false,
  title 
}: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  // Transform scroll position to header height and opacity
  const headerHeight = useTransform(scrollY, [0, 100, 200], [80, 60, 50]);
  const headerOpacity = useTransform(scrollY, [50, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [100, 200], [1, 0.8]);
  const backdropBlur = useTransform(scrollY, [50, 150], [0, 20]);

  // Show/hide header based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 80);
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Don't show on homepage hero
  const isHomepage = pathname === '/';
  const showHeader = isVisible && !isHomepage;

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: showHeader ? 0 : -100,
        opacity: showHeader ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      style={{
        height: headerHeight,
        backdropFilter: `blur(${backdropBlur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 bg-black/40 border-b border-white/10 ${className}`}
      role="banner"
      aria-label="Sticky navigation header"
    >
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="container mx-auto px-4 h-full flex items-center justify-between"
      >
        {/* Left: Back button or Logo */}
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
              aria-label="Return to homepage"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-light">Back</span>
            </Link>
          )}
          
          <motion.div 
            style={{ scale: logoScale }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
              aria-label="TALAAT STUDIO - Return to homepage"
            >
              <div className="text-white font-light tracking-wider">
                <span className="text-lg lg:text-xl">TALAAT</span>
                <span className="text-lg lg:text-xl ml-2">STUDIO</span>
              </div>
            </Link>
          </motion.div>

          {title && (
            <div className="hidden md:block">
              <div className="w-px h-6 bg-white/30 mx-4"></div>
              <h1 className="text-white/80 text-sm font-light uppercase tracking-wide">
                {title}
              </h1>
            </div>
          )}
        </div>

        {/* Right: Quick Navigation */}
        <nav 
          className="hidden md:flex items-center space-x-1"
          role="navigation"
          aria-label="Quick navigation"
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-sm font-light transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                pathname === item.href 
                  ? 'text-white bg-white/10' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="flex flex-col items-center justify-center w-8 h-8 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
            aria-label="Open mobile menu"
            onClick={() => {
              // This could trigger a mobile menu modal
              // For now, just focus the main navigation
              const nav = document.getElementById('navigation');
              if (nav) {
                nav.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="w-4 h-0.5 bg-current mb-1"></div>
            <div className="w-4 h-0.5 bg-current mb-1"></div>
            <div className="w-4 h-0.5 bg-current"></div>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}