import type { Transition, Variants } from 'motion/react';

import { fastTransition, normalTransition, slowTransition } from './transitions';

/**
 * Reusable Motion variants. Import only where animation is actually needed —
 * these are intentionally not wired into shared components by default.
 *
 * Every variant has a reduced-motion-safe counterpart with the same end
 * state but no movement/duration, so `useSafeVariants` (see `./index.ts`)
 * can swap them transparently.
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: normalTransition as Transition },
};

export const fadeInReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: slowTransition as Transition },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/** Apply to a parent; children using `fadeIn`/`fadeUp` will cascade. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerContainerReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

/** Spread onto `whileHover`/`whileTap` for interactive elements (cards, icon buttons). */
export const scaleInteraction = {
  whileHover: { scale: 1.02, transition: fastTransition as Transition },
  whileTap: { scale: 0.98, transition: fastTransition as Transition },
};

export const scaleInteractionReduced = {
  whileHover: {},
  whileTap: {},
};

/** Off-canvas mobile menu / sheet-style panel transition. */
export const mobileMenuTransition: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: normalTransition as Transition },
  exit: { opacity: 0, x: '100%', transition: fastTransition as Transition },
};

export const mobileMenuTransitionReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};
