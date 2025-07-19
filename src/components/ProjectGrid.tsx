'use client';

import { motion } from 'framer-motion';
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      aria-label="Project portfolio"
    >
      {projects.map((project) => (
        <motion.article
          key={project.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group relative"
        >
          <Link 
            href={`/projects/${project.slug}`}
            className="block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {project.thumbnail && project.thumbnail.thumbnail ? (
                <Image
                  src={project.thumbnail.thumbnail.jpeg}
                  alt={`${project.title} project thumbnail from ${project.year}${project.location ? ` in ${project.location}` : ''}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={projects.indexOf(project) < 4}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
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
              
              {/* Project Info - Bottom Right */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-4 text-center text-white">
                <h3 className="text-sm sm:text-base font-light uppercase tracking-wide mb-1 leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light">
                  {project.year}
                </p>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.section>
  );
}