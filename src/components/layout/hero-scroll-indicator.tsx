'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import { premiumEase, useReducedMotion } from '@/lib/motion';

interface HeroScrollIndicatorProps {
  /** Section id on the page below to scroll to. */
  targetId: string;
}

/**
 * Bottom-centred "SCROLL TO EXPLORE" cue with a gentle chevron pulse —
 * matches the reference mockup. Hidden below `sm:` on stacked mobile layouts.
 */
function HeroScrollIndicator({ targetId }: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 1.2, ease: premiumEase }
      }
      className="absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2 sm:bottom-8 sm:flex"
    >
      <motion.a
        href={`#${targetId}`}
        aria-label="Scroll to explore"
        animate={prefersReducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={
          prefersReducedMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="text-hero-muted-foreground focus-visible:ring-focus-ring flex flex-col items-center gap-2 text-[0.625rem] font-medium tracking-[0.28em] uppercase outline-none focus-visible:ring-2"
      >
        <span>Scroll to explore</span>
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: premiumEase }
          }
        >
          <ChevronDown className="size-4 stroke-[1.5]" />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

export { HeroScrollIndicator };
