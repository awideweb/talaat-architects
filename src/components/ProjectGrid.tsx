'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };


  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No projects found.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <Link href={`/projects/${project.slug}`}>
            <div className="group cursor-pointer">
              {/* Project Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                {project.thumbnail && project.thumbnail.thumbnail ? (
                  <img
                    src={project.thumbnail.thumbnail.jpeg}
                    alt={`${project.title} project thumbnail from ${project.year}${project.location ? ` in ${project.location}` : ''}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm">No image available</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Info Box - Lower Right */}
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-[2px] py-3 px-4 lg:py-4 lg:px-6 flex flex-col justify-center items-center text-center border border-white/10">
                  <h4 className="text-white text-xs lg:text-sm font-light uppercase tracking-wide mb-1 lg:mb-2 leading-tight line-clamp-3">
                    {project.title}
                  </h4>
                  <p className="text-white/70 text-xs lg:text-sm font-light">
                    {project.year}
                  </p>
                </div>
              </div>

            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}