'use client';

import { motion } from 'motion/react';

import { premiumEase, useReducedMotion } from '@/lib/motion';

interface HeroScrollIndicatorProps {
  /** Section id on the page below to scroll to. */
  targetId: string;
}

/**
 * Bottom-centred scroll cue — hidden below `sm:` where stacked mobile hero
 * height makes it redundant. The pill drifts down a few pixels with a gentle
 * opacity fade; the inner dot echoes the motion on a shorter track. No
 * bouncing arrow. See `docs/motion-guidelines.md` → "Scroll indicator".
 */
function HeroScrollIndicator({ targetId }: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 1.15, ease: premiumEase }
      }
      className="absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:bottom-8 sm:flex"
    >
      <motion.a
        href={`#${targetId}`}
        aria-label="Scroll to learn more"
        animate={prefersReducedMotion ? undefined : { y: [0, 4, 0], opacity: [0.65, 1, 0.65] }}
        transition={
          prefersReducedMotion ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="focus-visible:ring-focus-ring inline-flex rounded-full p-1 outline-none focus-visible:ring-2"
      >
        <span className="border-hero-border/70 relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border">
          <motion.span
            aria-hidden="true"
            className="bg-hero-foreground/80 mt-1.5 size-1.5 rounded-full"
            animate={
              prefersReducedMotion ? undefined : { y: [0, 6, 0], opacity: [0.85, 0.35, 0.85] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 3, repeat: Infinity, ease: premiumEase }
            }
          />
        </span>
      </motion.a>
    </motion.div>
  );
}

export { HeroScrollIndicator };
