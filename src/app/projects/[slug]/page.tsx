'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectHero } from '../../../components';

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
      {/* Project Hero Section */}
      <ProjectHero
        title={project.title}
        description={project.description}
        year={project.year}
        location={project.location}
        category={project.category}
        images={project.images}
      />

      {/* Project Gallery Section */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Gallery Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-500 uppercase tracking-wide mb-6">
              Project Gallery
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore the complete collection of project images showcasing design details and spatial qualities.
            </p>
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
                {image.src && image.src.jpeg && (
                  <Image
                    src={image.src.jpeg}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                )}
                
                {/* Fallback for missing image */}
                {(!image.src || !image.src.jpeg) && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
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