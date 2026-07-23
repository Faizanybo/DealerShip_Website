'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { premiumEase, useReducedMotion } from '@/lib/motion';

const PHRASE = 'OUR FEATURE VEHICLE';

interface HeroFeaturedLabelProps {
  /** Fires once when the label has finished its entrance — triggers vehicle reveal. */
  onLabelReady?: () => void;
  className?: string;
}

/**
 * Large display typography above the featured vehicle — "OUR FEATURE" in bronze
 * outline, "VEHICLE" in muted solid type. Sits in its own row so the car never
 * covers the headline words (decorative; full phrase in sr-only).
 */
function HeroFeaturedLabel({ onLabelReady, className }: HeroFeaturedLabelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'pointer-events-none relative z-[1] mb-1 select-none sm:mb-2 lg:pl-[2%] lg:text-left',
        className,
      )}
      aria-hidden="true"
    >
      <span className="sr-only">{PHRASE}</span>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0, onComplete: onLabelReady }
            : { duration: 0.8, delay: 0.45, ease: premiumEase, onComplete: onLabelReady }
        }
        className="font-display text-[clamp(1.875rem,4.8vw+0.65rem,4.25rem)] leading-[1.02] font-bold tracking-[0.06em] uppercase"
      >
        <span
          className="block"
          style={{
            WebkitTextStroke: '1px var(--brand-accent)',
            color: 'transparent',
          }}
        >
          OUR FEATURE
        </span>
        <span className="text-hero-muted-foreground/90 block font-sans text-[0.9em] font-light tracking-[0.14em]">
          VEHICLE
          <span className="text-hero-muted-foreground/50 ml-[0.35em] font-extralight">|</span>
        </span>
      </motion.div>
    </div>
  );
}

export { HeroFeaturedLabel };
