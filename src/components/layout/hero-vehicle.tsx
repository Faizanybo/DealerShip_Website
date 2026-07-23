'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

import { useReducedMotion } from '@/lib/motion';

/**
 * Homepage hero vehicle visual (Client Component — isolated here so `Hero`
 * itself stays a Server Component; only the float/reveal motion and the
 * `useReducedMotion` check need the client runtime).
 *
 * TEMPORARY PLACEHOLDER: `public/images/placeholder/hero-vehicle.jpg` is a
 * generated, brandless stand-in image (no manufacturer logos/badges — see
 * `docs/homepage.md` → "Hero vehicle image"), not real dealership
 * photography. Replace the `src` with a real client-supplied photo once
 * available; everything else here (floating card copy, sizing, motion,
 * fade mask) can stay as-is.
 */
function HeroVehicle() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
    >
      {/* Soft glow behind the vehicle, echoing the background's light bloom. */}
      <div
        aria-hidden="true"
        className="absolute inset-8 -z-10 rounded-full blur-3xl"
        style={{ background: 'oklch(0.62 0.11 55 / 0.22)' }}
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
            maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Floating info card — decorative only, not real inventory data. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface-elevated border-border-subtle shadow-elevated rounded-card absolute bottom-2 left-2 flex items-center gap-3 border px-4 py-3 sm:bottom-6 sm:left-0"
      >
        <span className="bg-accent text-brand-accent flex size-9 shrink-0 items-center justify-center rounded-full">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-semibold">Featured vehicle</span>
          <span className="text-text-muted text-xs">This month&apos;s showcase</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { HeroVehicle };
