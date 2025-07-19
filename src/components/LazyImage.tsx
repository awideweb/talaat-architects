'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageSources {
  avif: string;
  webp: string;
  jpeg: string;
}

interface LazyImageProps {
  src: ImageSources | string;
  thumbnail?: ImageSources | string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  thumbnail,
  alt,
  width = 1920,
  height = 1080,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Extract image sources
  const getImageSrc = (imageObj: ImageSources | string): string => {
    if (typeof imageObj === 'string') return imageObj;
    // Return JPEG as fallback for browser compatibility
    return imageObj.jpeg || imageObj.webp || imageObj.avif;
  };

  const mainSrc = getImageSrc(src);
  const thumbSrc = thumbnail ? getImageSrc(thumbnail) : undefined;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Render modern image formats with fallbacks
  const renderPicture = () => {
    if (typeof src === 'string') {
      return (
        <Image
          src={mainSrc}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes={sizes}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    return (
      <picture>
        {/* AVIF - Best compression */}
        <source srcSet={src.avif} type="image/avif" />
        
        {/* WebP - Good compression */}
        <source srcSet={src.webp} type="image/webp" />
        
        {/* JPEG - Fallback */}
        <Image
          src={src.jpeg}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes={sizes}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    );
  };

  return (
    <div 
      ref={imgRef}
      className="relative overflow-hidden bg-gray-100 dark:bg-gray-800"
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Thumbnail placeholder - loads immediately */}
      {thumbSrc && !isLoaded && (
        <div className="absolute inset-0">
          <Image
            src={thumbSrc}
            alt={`${alt} thumbnail`}
            fill
            className="object-cover filter blur-sm scale-110 transition-opacity duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Loading skeleton */}
      {!isInView && !thumbSrc && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
      )}

      {/* Main image - loads when in view */}
      {(isInView || priority) && (
        <div className="absolute inset-0">
          {renderPicture()}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs">Image failed to load</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && (isInView || priority) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;