/**
 * Shared timing tokens for Motion (Framer Motion) animations.
 *
 * Mirrors the CSS custom properties in `globals.css`
 * (`--motion-fast` / `--motion-normal` / `--motion-slow` / `--ease-premium`) —
 * keep both in sync if either changes.
 */

export const motionDurations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.7,
} as const;

/** "ease-out-expo"-style curve used for premium, decelerating reveals. */
export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const fastTransition = { duration: motionDurations.fast, ease: premiumEase };
export const normalTransition = { duration: motionDurations.normal, ease: premiumEase };
export const slowTransition = { duration: motionDurations.slow, ease: premiumEase };
