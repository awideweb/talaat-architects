'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  location: string;
  images: Array<{
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  thumbnail: {
    src: string;
    thumbnail: string;
    alt: string;
  } | null;
  slug: string;
}

export default function Home() {
  const [, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Check if landing page has been shown this session
    const hasSeenLanding = sessionStorage.getItem('hasSeenLanding');
    if (hasSeenLanding) {
      setShowLanding(false);
    }
    
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      
      // Select featured projects (first 6)
      setFeaturedProjects(data.slice(0, 6));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onComplete={() => {
      setShowLanding(false);
      sessionStorage.setItem('hasSeenLanding', 'true');
    }} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-2xl font-light text-gray-400 mb-6">
              RECENT PROJECTS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Highly crafted built environments in intimate conversation with their surroundings.
            </p>
          </motion.div>
          
          <ProjectGrid projects={featuredProjects} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              href="/projects"
              className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300"
            >
              View All Projects
            </Link>
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
}
