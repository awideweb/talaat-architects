'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { UniversalNavigation, ProjectGrid } from '../../components';

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = useCallback(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [projects, selectedCategory]);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, filterProjects]);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-400"
        >
          Loading projects...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <UniversalNavigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-light text-gray-500 uppercase tracking-wide mb-6">
              All Projects
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore our complete portfolio of architectural projects, from residential homes to innovative unbuilt designs.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 capitalize ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProjectGrid projects={filteredProjects} />
          </motion.div>

          {/* Project Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12 text-gray-500"
          >
            Showing {filteredProjects.length} of {projects.length} projects
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}