'use client';

import { motion } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';

interface HeroScrollIndicatorProps {
  /** Section id on the page below to scroll to. */
  targetId: string;
}

/**
 * Bottom-centred scroll cue, pinned to the hero's own bottom edge rather
 * than living inside the (variable-height) text column, so it stays put
 * regardless of how tall the copy or the vehicle visual end up being.
 *
 * A small dot loops slowly down a pill-shaped track and fades — restrained
 * opacity, no bouncing arrow. Disabled (static, centred dot) under
 * `prefers-reduced-motion`.
 */
function HeroScrollIndicator({ targetId }: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-6 z-10 flex justify-center sm:bottom-8"
    >
      <a
        href={`#${targetId}`}
        aria-label="Scroll to learn more"
        className="focus-visible:ring-focus-ring inline-flex rounded-full p-1 opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2"
      >
        <span className="border-hero-border/70 relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border">
          <motion.span
            aria-hidden="true"
            className="bg-hero-foreground/80 mt-1.5 size-1.5 rounded-full"
            animate={prefersReducedMotion ? undefined : { y: [0, 18, 0], opacity: [1, 0.25, 1] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        </span>
      </a>
    </motion.div>
  );
}

export { HeroScrollIndicator };
