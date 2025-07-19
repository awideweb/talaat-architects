'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-light text-gray-500 uppercase tracking-wide mb-6">
              About TALAAT STUDIO
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Creating architectural excellence through thoughtful design and innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-400 leading-relaxed mb-6">
              TALAAT STUDIO is dedicated to creating highly crafted built environments that exist in intimate conversation with their surroundings. Our approach combines innovative design thinking with deep respect for context, sustainability, and human experience.
            </p>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              From residential projects to innovative unbuilt designs, we believe that architecture should not only shelter but inspire, connect, and endure. Each project is approached with fresh eyes and careful consideration of the unique challenges and opportunities it presents.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              Our portfolio spans diverse project types and scales, unified by a commitment to excellence in design, construction, and client service. We work closely with clients to understand their vision and translate it into spaces that exceed expectations.
            </p>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}