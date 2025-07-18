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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href={`/projects/${project.slug}`}>
            <div className="group cursor-pointer">
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail.thumbnail}
                    alt={project.thumbnail.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm text-gray-700 capitalize">
                  {project.category}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  {project.location && (
                    <span>{project.location}</span>
                  )}
                  <span>{project.year}</span>
                </div>
                
                {project.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}