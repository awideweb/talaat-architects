'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProject = useCallback(async () => {
    try {
      // Get all projects and find the one we need
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      
      const projects = await response.json();
      const foundProject = projects.find((p: { slug: string }) => p.slug === slug);
      
      if (!foundProject) {
        throw new Error('Project not found');
      }
      
      setProject(foundProject);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadProject();
    }
  }, [slug, loadProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600"
        >
          Loading project...
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 hover:text-blue-800">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/projects" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  {project.title}
                </h1>
                <div className="flex items-center text-gray-600 space-x-6">
                  <span className="capitalize">{project.category}</span>
                  {project.location && <span>{project.location}</span>}
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
            
            {project.description && (
              <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            )}
          </motion.div>

          {/* Project Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative aspect-video overflow-hidden bg-gray-100"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation to Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <div className="text-center">
              <h3 className="text-2xl font-light text-gray-900 mb-8">
                Explore More Projects
              </h3>
              <Link
                href="/projects"
                className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}