'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface FooterProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'project';
}

export default function Footer({ className = '', variant = 'default' }: FooterProps) {

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.999.016 6.79.08 5.584.144 4.75.319 4.049.599a6.034 6.034 0 0 0-2.188 1.42A6.034 6.034 0 0 0 .439 4.206C.16 4.907-.015 5.74.08 6.946.144 8.155.16 8.552.16 12.173s.016 4.018.08 5.227c.064 1.206.24 2.04.52 2.74a6.034 6.034 0 0 0 1.421 2.188 6.034 6.034 0 0 0 2.188 1.42c.7.28 1.534.456 2.74.52 1.208.064 1.605.08 5.227.08s4.018-.016 5.227-.08c1.206-.064 2.04-.24 2.74-.52a6.034 6.034 0 0 0 2.188-1.42 6.034 6.034 0 0 0 1.42-2.188c.28-.7.456-1.534.52-2.74.064-1.208.08-1.605.08-5.227s-.016-4.018-.08-5.227c-.064-1.206-.24-2.04-.52-2.74a6.034 6.034 0 0 0-1.42-2.188A6.034 6.034 0 0 0 18.206.44C17.505.16 16.672-.015 15.466.08 14.257.144 13.86.16 10.239.16L12.017 0zm-.764 1.44h.764c3.557 0 3.976.014 5.38.078 1.297.058 2.005.272 2.475.453.622.242 1.066.531 1.532.997.466.466.755.91.997 1.532.181.47.395 1.178.453 2.475.064 1.404.078 1.823.078 5.38s-.014 3.976-.078 5.38c-.058 1.297-.272 2.005-.453 2.475-.242.622-.531 1.066-.997 1.532-.466.466-.91.755-1.532.997-.47.181-1.178.395-2.475.453-1.404.064-1.823.078-5.38.078s-3.976-.014-5.38-.078c-1.297-.058-2.005-.272-2.475-.453-.622-.242-1.066-.531-1.532-.997-.466-.466-.755-.91-.997-1.532-.181-.47-.395-1.178-.453-2.475-.064-1.404-.078-1.823-.078-5.38s.014-3.976.078-5.38c.058-1.297.272-2.005.453-2.475.242-.622.531-1.066.997-1.532.466-.466.91-.755 1.532-.997.47-.181 1.178-.395 2.475-.453 1.404-.064 1.823-.078 5.38-.078z"/>
          <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.018-2.277-1.388-2.277c-1.39,0-1.604,1.086-1.604,2.206v4.248h-2.667v-8.59h2.56v1.174h0.037 c0.356-0.675,1.227-1.387,2.524-1.387c2.704,0,3.207,1.781,3.207,4.092V18.338z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      href: 'mailto:info@talaatstudio.com', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const quickLinks = [
    { name: 'Residential', href: '/projects?category=residential' },
    { name: 'Unbuilt Projects', href: '/projects?category=unbuilt' },
    { name: 'Process', href: '/about#process' },
    { name: 'Philosophy', href: '/about#philosophy' },
  ];

  if (variant === 'minimal') {
    return (
      <footer 
        className={`py-8 dark-blur-darker border-t border-white/10 ${className}`}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-sm font-light">
            &copy; {currentYear} TALAAT STUDIO. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      className={`relative overflow-hidden ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
      <div className="absolute inset-0 dark-blur-darkest"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Column 1: Studio Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-white font-light text-2xl lg:text-3xl tracking-wider mb-4">
                  TALAAT
                </h3>
                <h4 className="text-white font-light text-2xl lg:text-3xl tracking-wider mb-6">
                  STUDIO
                </h4>
                <div className="w-16 h-px bg-white/40 mb-6"></div>
                <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">
                  Highly crafted built environments in intimate conversation with their surroundings. 
                  We believe architecture should respond thoughtfully to place, climate, and human experience.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <p className="text-white/60 text-xs uppercase tracking-wide font-light">Contact</p>
                <div className="space-y-2">
                  <a 
                    href="mailto:info@talaatstudio.com" 
                    className="block text-white/80 hover:text-white text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                  >
                    info@talaatstudio.com
                  </a>
                  <a 
                    href="tel:+1234567890" 
                    className="block text-white/80 hover:text-white text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Navigation & Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {/* Navigation */}
              <div>
                <h5 className="text-white/60 text-xs uppercase tracking-wide font-light mb-6">
                  Navigation
                </h5>
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h5 className="text-white/60 text-xs uppercase tracking-wide font-light mb-6">
                  Explore
                </h5>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Column 3: Social & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Social Links */}
              <div>
                <h5 className="text-white/60 text-xs uppercase tracking-wide font-light mb-6">
                  Connect
                </h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h5 className="text-white/60 text-xs uppercase tracking-wide font-light mb-4">
                  Stay Updated
                </h5>
                <p className="text-white/70 text-sm font-light mb-4 leading-relaxed">
                  Receive updates on new projects and architectural insights.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white text-sm font-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/50 text-sm font-light">
                &copy; {currentYear} TALAAT STUDIO. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-white/50 hover:text-white/70 text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/50 hover:text-white/70 text-sm font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}