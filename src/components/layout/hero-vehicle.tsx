'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';

interface HeroVehicleProps {
  /**
   * Short caption above the vehicle visual. Plain, static text for this
   * pass — it's reserving the spot for a future character-by-character
   * reveal (explicitly out of scope here; see `docs/homepage.md`). Keep it
   * short: uppercase, wide letter-spacing, one line.
   */
  label: string;
}

/**
 * Homepage hero vehicle visual (Client Component — isolated here so `Hero`
 * itself stays a Server Component; only the float/reveal motion and the
 * `useReducedMotion` check need the client runtime).
 *
 * TEMPORARY PLACEHOLDER: `public/images/placeholder/hero-vehicle.jpg` is a
 * generated, brandless stand-in image (no manufacturer logos/badges — see
 * `docs/homepage.md` → "Hero vehicle image"), not real dealership
 * photography. Replace the `src` with a real client-supplied photo once
 * available; everything else here (sizing, motion, edge fade) can stay
 * as-is.
 *
 * No floating info card here on purpose — an earlier pass had a bordered
 * "Featured vehicle" card overlapping the image; it was removed during the
 * hero-composition pass so the visual reads as one integrated scene rather
 * than a photo with a UI card bolted onto it (see `docs/homepage.md`). The
 * `label` above the image takes over that role as plain typography instead.
 */
function HeroVehicle({ label }: HeroVehicleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex w-full max-w-lg flex-col gap-4 lg:mx-0 lg:max-w-none"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-xs font-bold tracking-[0.22em] uppercase sm:text-sm"
        style={{
          backgroundImage:
            'linear-gradient(90deg, var(--brand-accent), var(--hero-muted-foreground))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {label}
      </motion.p>

      <div className="relative">
        {/* Soft glow behind the vehicle, echoing the background's light bloom. */}
        <div
          aria-hidden="true"
          className="absolute inset-8 -z-10 rounded-full blur-3xl"
          style={{ background: 'oklch(0.62 0.11 55 / 0.22)' }}
        />
        {/* Restrained bronze rim light along the vehicle's upper edge. */}
        <div
          aria-hidden="true"
          className="absolute -top-4 right-[10%] -z-10 h-1/2 w-2/3 rounded-full blur-2xl"
          style={{ background: 'oklch(0.72 0.12 55 / 0.16)' }}
        />

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
          transition={
            prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative aspect-[4/3] w-full"
        >
          <Image
            src="/images/placeholder/hero-vehicle.jpg"
            alt="Premium vehicle"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 30px 40px oklch(0 0 0 / 0.5))',
              // Radial (not just bottom) fade so every edge dissolves into the
              // hero background — no visible rectangular image boundary.
              maskImage: 'radial-gradient(ellipse 75% 78% at 50% 46%, black 58%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 78% at 50% 46%, black 58%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export { HeroVehicle };
