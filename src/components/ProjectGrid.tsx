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
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
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
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail.thumbnail}
                    alt={project.thumbnail.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Info Box - Lower Right */}
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-[2px] p-3 lg:p-4 aspect-square w-20 lg:w-24 flex flex-col justify-center items-center text-center border border-white/10">
                  <h4 className="text-white text-xs lg:text-sm font-light uppercase tracking-wide mb-1 lg:mb-2 leading-tight line-clamp-3">
                    {project.title}
                  </h4>
                  <p className="text-white/70 text-xs lg:text-sm font-light">
                    {project.year}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              {project.description && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}