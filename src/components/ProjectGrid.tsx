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
  console.log('ProjectGrid: Received', projects.length, 'projects');
  if (projects.length > 0) {
    console.log('First project:', projects[0].title, 'thumbnail:', projects[0].thumbnail?.thumbnail?.jpeg);
  }
  
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
      className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
      aria-label="Project portfolio"
    >
      {projects.map((project) => (
        <motion.article
          key={project.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group"
        >
          <Link 
            href={`/projects/${project.slug}`}
            className="block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg transition-all duration-200"
            aria-describedby={`project-${project.id}-desc`}
          >
            <div className="cursor-pointer">
              {/* Project Image */}
              <div 
                className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4 sm:mb-6 rounded-lg shadow-sm group-hover:shadow-lg transition-shadow duration-300"
                role="img"
                aria-labelledby={`project-${project.id}-title`}
              >
                {project.thumbnail && project.thumbnail.thumbnail && (
                  <>
                    <Image
                      src={project.thumbnail.thumbnail.jpeg}
                      alt={`${project.title} project thumbnail from ${project.year}${project.location ? ` in ${project.location}` : ''}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </>
                )}
                
                {/* Fallback for missing thumbnail */}
                {(!project.thumbnail || !project.thumbnail.thumbnail) && (
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
                
                {/* Info Box - Lower Right */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-[4px] p-4 lg:p-5 min-w-[8rem] sm:min-w-[10rem] lg:min-w-[12rem] max-w-[12rem] sm:max-w-[14rem] lg:max-w-[16rem] flex flex-col justify-center items-center text-center border border-white/20 rounded-md shadow-lg">
                  <h3 
                    id={`project-${project.id}-title`}
                    className="text-white text-sm sm:text-base lg:text-lg font-light uppercase tracking-wide mb-2 lg:mb-3 leading-tight"
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base font-light" aria-label={`Completed in ${project.year}`}>
                    {project.year}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              {project.description && (
                <div className="mt-4">
                  <p 
                    id={`project-${project.id}-desc`}
                    className="text-gray-400 text-sm line-clamp-2 font-light"
                  >
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.section>
  );
}