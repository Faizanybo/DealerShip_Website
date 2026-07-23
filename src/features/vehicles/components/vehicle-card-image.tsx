'use client';

import * as React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

/** Local development fallback when featuredImage is missing or fails to load. */
const FALLBACK_IMAGE = '/images/vehicles/mock/exterior-01.jpg';

interface VehicleCardImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sold?: boolean;
  className?: string;
}

/**
 * Card-sized vehicle image with stable aspect ratio, responsive sizes, and
 * graceful fallback when the primary asset fails.
 */
function VehicleCardImage({ src, alt, priority, sold, className }: VehicleCardImageProps) {
  const [useFallback, setUseFallback] = React.useState(!src);
  const imageSrc = useFallback || !src ? FALLBACK_IMAGE : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      onError={() => setUseFallback(true)}
      className={cn(
        'object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100',
        sold && 'opacity-80 saturate-[0.85]',
        className,
      )}
    />
  );
}

export { VehicleCardImage, FALLBACK_IMAGE };
