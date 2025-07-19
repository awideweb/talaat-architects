'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PrimaryButton, 
  SecondaryButton, 
  GhostButton, 
  OutlineButton, 
  GlassButton, 
  MinimalButton,
  IconButton 
} from '../../components/Button';

export default function StyleGuidePage() {
  const [darkMode, setDarkMode] = useState(true);

  const sampleIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );

  const colorPalette = {
    primary: [
      { name: 'Gray 900', value: '#111827', class: 'bg-gray-900' },
      { name: 'Gray 800', value: '#1f2937', class: 'bg-gray-800' },
      { name: 'Gray 700', value: '#374151', class: 'bg-gray-700' },
      { name: 'Gray 600', value: '#4b5563', class: 'bg-gray-600' },
      { name: 'Gray 500', value: '#6b7280', class: 'bg-gray-500' },
      { name: 'Gray 400', value: '#9ca3af', class: 'bg-gray-400' },
      { name: 'Gray 300', value: '#d1d5db', class: 'bg-gray-300' },
      { name: 'Gray 200', value: '#e5e7eb', class: 'bg-gray-200' },
      { name: 'Gray 100', value: '#f3f4f6', class: 'bg-gray-100' },
      { name: 'Gray 50', value: '#f9fafb', class: 'bg-gray-50' },
    ],
    blur: [
      { name: 'Blur Dark', value: 'rgba(0, 0, 0, 0.7)', class: 'bg-black/70' },
      { name: 'Blur Darker', value: 'rgba(0, 0, 0, 0.8)', class: 'bg-black/80' },
      { name: 'Blur Darkest', value: 'rgba(0, 0, 0, 0.9)', class: 'bg-black/90' },
      { name: 'Blur Light', value: 'rgba(255, 255, 255, 0.1)', class: 'bg-white/10' },
      { name: 'Blur Lighter', value: 'rgba(255, 255, 255, 0.2)', class: 'bg-white/20' },
    ],
    semantic: [
      { name: 'Background', value: '#ffffff', class: 'bg-white' },
      { name: 'Background Dark', value: '#0a0a0a', class: 'bg-black' },
      { name: 'Foreground', value: '#171717', class: 'bg-gray-900' },
      { name: 'Foreground Light', value: '#ededed', class: 'bg-gray-100' },
    ]
  };

  const typographyScales = [
    { name: 'Display Large', class: 'text-6xl font-light', example: 'TALAAT STUDIO' },
    { name: 'Display Medium', class: 'text-5xl font-light', example: 'ARCHITECTURE' },
    { name: 'Display Small', class: 'text-4xl font-light', example: 'PORTFOLIO' },
    { name: 'Heading 1', class: 'text-3xl font-light uppercase tracking-wide', example: 'RECENT PROJECTS' },
    { name: 'Heading 2', class: 'text-2xl font-light tracking-wider', example: 'About the Studio' },
    { name: 'Heading 3', class: 'text-xl font-light tracking-wide', example: 'Project Details' },
    { name: 'Heading 4', class: 'text-lg font-light tracking-wide', example: 'Section Title' },
    { name: 'Body Large', class: 'text-lg leading-relaxed', example: 'Creating highly crafted built environments that exist in intimate conversation with their surroundings.' },
    { name: 'Body Medium', class: 'text-base leading-relaxed', example: 'Our approach combines innovative design thinking with deep respect for context, sustainability, and human experience.' },
    { name: 'Body Small', class: 'text-sm leading-relaxed', example: 'Each project is approached with fresh eyes and careful consideration of the unique challenges and opportunities it presents.' },
    { name: 'Caption', class: 'text-xs uppercase tracking-wide font-light', example: 'PROJECT CATEGORY' },
    { name: 'Label', class: 'text-sm font-light', example: 'Form Label' },
  ];

  const spacingScale = [
    { name: 'xs', value: '0.25rem', class: 'w-1 h-4' },
    { name: 'sm', value: '0.5rem', class: 'w-2 h-4' },
    { name: 'md', value: '1rem', class: 'w-4 h-4' },
    { name: 'lg', value: '1.5rem', class: 'w-6 h-4' },
    { name: 'xl', value: '2rem', class: 'w-8 h-4' },
    { name: '2xl', value: '3rem', class: 'w-12 h-4' },
    { name: '3xl', value: '4rem', class: 'w-16 h-4' },
    { name: '4xl', value: '5rem', class: 'w-20 h-4' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wider text-white">TALAAT STUDIO</h1>
            <p className="text-white/60 text-sm font-light uppercase tracking-wide">Style Guide</p>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-3 lg:px-6 lg:py-4 bg-black/40 backdrop-blur-[2px] border border-white/10 hover:bg-black/50 text-white text-xs lg:text-sm font-light uppercase tracking-wide transition-colors duration-200"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 space-y-16">
        
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl lg:text-6xl font-light tracking-wider mb-6">
            DESIGN SYSTEM
          </h1>
          <p className={`text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
            A comprehensive guide to the visual language, components, and styling patterns 
            used throughout the TALAAT STUDIO architectural portfolio website.
          </p>
        </motion.section>

        {/* Typography */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Typography
          </h2>
          
          <div className="grid gap-8 lg:gap-12">
            {typographyScales.map((scale) => (
              <div key={scale.name} className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-sm font-light uppercase tracking-wide ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    {scale.name}
                  </h3>
                  <code className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    {scale.class}
                  </code>
                </div>
                <div className={`${scale.class} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {scale.example}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Color Palette
          </h2>
          
          {Object.entries(colorPalette).map(([category, colors]) => (
            <div key={category} className="mb-8">
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div className={`${color.class} w-full h-16 rounded-lg border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}></div>
                    <div>
                      <p className={`text-xs font-light ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        {color.name}
                      </p>
                      <code className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
                        {color.value}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Button Components */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Button Components
          </h2>
          
          {/* Button Variants */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Variants
              </h3>
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex flex-wrap gap-4">
                  <PrimaryButton>Primary</PrimaryButton>
                  <SecondaryButton>Secondary</SecondaryButton>
                  <GhostButton>Ghost</GhostButton>
                  <OutlineButton>Outline</OutlineButton>
                  <GlassButton>Glass</GlassButton>
                  <MinimalButton>Minimal</MinimalButton>
                </div>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Sizes
              </h3>
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryButton size="sm">Small</PrimaryButton>
                  <PrimaryButton size="md">Medium</PrimaryButton>
                  <PrimaryButton size="lg">Large</PrimaryButton>
                  <PrimaryButton size="xl">Extra Large</PrimaryButton>
                </div>
              </div>
            </div>

            {/* Button States */}
            <div>
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                States
              </h3>
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex flex-wrap gap-4">
                  <PrimaryButton>Default</PrimaryButton>
                  <PrimaryButton disabled>Disabled</PrimaryButton>
                  <PrimaryButton loading>Loading</PrimaryButton>
                  <PrimaryButton icon={sampleIcon} iconPosition="left">With Icon</PrimaryButton>
                  <IconButton icon={sampleIcon} aria-label="Icon only" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Spacing Scale */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Spacing Scale
          </h2>
          
          <div className="grid gap-4">
            {spacingScale.map((space) => (
              <div key={space.name} className="flex items-center space-x-4">
                <div className={`${space.class} ${darkMode ? 'bg-white/20' : 'bg-gray-300'} rounded`}></div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-sm font-light ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    {space.name}
                  </span>
                  <code className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    {space.value}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Backdrop Blur Effects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Backdrop Blur Effects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
              <div className="absolute inset-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-light">Dark Blur Light</span>
              </div>
            </div>
            
            <div className="relative h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg overflow-hidden">
              <div className="absolute inset-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-light">Dark Blur Medium</span>
              </div>
            </div>
            
            <div className="relative h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg overflow-hidden">
              <div className="absolute inset-4 bg-black/70 backdrop-blur-lg border border-white/10 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-light">Dark Blur Heavy</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Layout Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pb-16"
        >
          <h2 className="text-3xl font-light uppercase tracking-wide mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            Layout Patterns
          </h2>
          
          <div className="space-y-8">
            {/* Two Column Grid */}
            <div>
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Two Column Grid (Projects)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`h-32 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                  <span className={`text-sm font-light ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Project Card</span>
                </div>
                <div className={`h-32 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                  <span className={`text-sm font-light ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Project Card</span>
                </div>
              </div>
            </div>

            {/* Three Column Footer */}
            <div>
              <h3 className={`text-lg font-light uppercase tracking-wide mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Three Column Footer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`h-24 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                  <span className={`text-sm font-light ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Contact Info</span>
                </div>
                <div className={`h-24 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                  <span className={`text-sm font-light ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Navigation</span>
                </div>
                <div className={`h-24 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                  <span className={`text-sm font-light ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Social Links</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
