import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'ultrawide' | 'custom';
  customAspectRatio?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = '',
  priority = false,
  placeholder,
  fallback,
  aspectRatio = 'square',
  customAspectRatio,
  loading = 'lazy',
  onLoad,
  onError,
  objectFit = 'cover',
  quality = 80,
  format = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/10]',
    ultrawide: 'aspect-[21/9]',
    custom: customAspectRatio ? `aspect-[${customAspectRatio}]` : 'aspect-square'
  };

  // Object fit classes
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  // Generate optimized image URL
  const generateImageUrl = (imageSrc: string, imageFormat?: string, imageQuality?: number) => {
    // If using a CDN or image optimization service, you can modify this function
    // For now, we'll return the original src
    return imageSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Determine which image to show
  const imageSrc = hasError && fallback ? fallback : src;
  const shouldShowImage = isInView || priority;

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Placeholder */}
      {!isLoaded && placeholder && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !placeholder && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      {/* Main image */}
      {shouldShowImage && (
        <img
          ref={imgRef}
          src={generateImageUrl(imageSrc, format, quality)}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg 
              className="w-12 h-12 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Specialized image components for common use cases
export const CourseImage: React.FC<Omit<ResponsiveImageProps, 'aspectRatio'>> = (props) => (
  <ResponsiveImage aspectRatio="video" objectFit="cover" {...props} />
);

export const ProfileImage: React.FC<Omit<ResponsiveImageProps, 'aspectRatio'>> = (props) => (
  <ResponsiveImage aspectRatio="square" objectFit="cover" {...props} />
);

export const HeroImage: React.FC<Omit<ResponsiveImageProps, 'aspectRatio'>> = (props) => (
  <ResponsiveImage aspectRatio="ultrawide" objectFit="cover" priority {...props} />
);

export const ThumbnailImage: React.FC<Omit<ResponsiveImageProps, 'aspectRatio'>> = (props) => (
  <ResponsiveImage aspectRatio="square" objectFit="cover" sizes="150px" {...props} />
);

export const BannerImage: React.FC<Omit<ResponsiveImageProps, 'aspectRatio'>> = (props) => (
  <ResponsiveImage aspectRatio="wide" objectFit="cover" {...props} />
);
