'use client';

import { useReducedMotion } from 'motion/react';

import {
  fadeIn,
  fadeInReduced,
  fadeUp,
  fadeUpReduced,
  mobileMenuTransition,
  mobileMenuTransitionReduced,
  scaleInteraction,
  scaleInteractionReduced,
  staggerContainer,
  staggerContainerReduced,
} from './variants';

export * from './transitions';
export * from './variants';

const variantPairs = {
  fadeIn: [fadeIn, fadeInReduced],
  fadeUp: [fadeUp, fadeUpReduced],
  staggerContainer: [staggerContainer, staggerContainerReduced],
  mobileMenuTransition: [mobileMenuTransition, mobileMenuTransitionReduced],
} as const;

/**
 * Returns the requested variant, automatically swapped for its
 * reduced-motion-safe counterpart when the user has requested less motion
 * (`prefers-reduced-motion: reduce`). Client-only (uses a hook).
 *
 * ```tsx
 * 'use client';
 * const variants = useMotionVariants('fadeUp');
 * <motion.div variants={variants} initial="hidden" animate="visible" />
 * ```
 */
export function useMotionVariants<TKey extends keyof typeof variantPairs>(key: TKey) {
  const prefersReducedMotion = useReducedMotion();
  const [full, reduced] = variantPairs[key];
  return prefersReducedMotion ? reduced : full;
}

/** Reduced-motion-safe `whileHover`/`whileTap` props for interactive elements. */
export function useScaleInteraction() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? scaleInteractionReduced : scaleInteraction;
}

export { useReducedMotion };
