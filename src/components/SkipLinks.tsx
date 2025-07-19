'use client';

import { useEffect, useRef } from 'react';

interface SkipLinksProps {
  links?: Array<{
    href: string;
    text: string;
  }>;
}

const defaultLinks = [
  { href: '#main-content', text: 'Skip to main content' },
  { href: '#navigation', text: 'Skip to navigation' },
  { href: '#projects', text: 'Skip to projects' },
];

export default function SkipLinks({ links = defaultLinks }: SkipLinksProps) {
  const skipLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show skip links on Tab key press
      if (event.key === 'Tab' && !event.shiftKey) {
        const skipLinks = skipLinksRef.current;
        if (skipLinks && document.activeElement === document.body) {
          const firstLink = skipLinks.querySelector('a') as HTMLAnchorElement;
          if (firstLink) {
            event.preventDefault();
            firstLink.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={skipLinksRef}
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-4 focus-within:left-4 focus-within:z-[9999] focus-within:bg-white focus-within:border-2 focus-within:border-gray-900 focus-within:rounded-lg focus-within:p-4 focus-within:shadow-lg"
      role="navigation"
      aria-label="Skip links"
    >
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="block text-gray-900 underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                  // Focus the target element if it's focusable
                  if (target instanceof HTMLElement) {
                    target.focus();
                  }
                }
              }}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}