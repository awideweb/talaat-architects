'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Hero, ProjectGrid, LandingPage, PrimaryButton } from '../components';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  location: string;
  images: Array<{
    src: {
      avif: string;
      webp: string;
      jpeg: string;
    };
    thumbnail: {
      avif: string;
      webp: string;
      jpeg: string;
    };
    alt: string;
    width: number;
    height: number;
  }>;
  thumbnail: {
    src: {
      avif: string;
      webp: string;
      jpeg: string;
    };
    thumbnail: {
      avif: string;
      webp: string;
      jpeg: string;
    };
    alt: string;
    width: number;
    height: number;
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
          className="text-lg text-gray-400"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        role="main"
        aria-label="Homepage"
      >
        <Hero />
        
        <section 
          id="projects"
          className="py-20 px-4 max-w-7xl mx-auto"
          aria-labelledby="projects-heading"
        >
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 id="projects-heading" className="text-3xl font-light text-gray-500 uppercase tracking-wide mb-6">
              RECENT PROJECTS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Highly crafted built environments in intimate conversation with their surroundings.
            </p>
          </motion.header>
          
          <ProjectGrid projects={featuredProjects} />
          
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
            aria-label="View all projects"
          >
            <PrimaryButton
              href="/projects"
              size="lg"
              aria-describedby="view-all-desc"
            >
              View All Projects
              <span id="view-all-desc" className="sr-only">
                Navigate to the complete project portfolio page
              </span>
            </PrimaryButton>
          </motion.footer>
        </section>
      </motion.main>
    </div>
  );
}
