'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';
import { FeaturedVehicleIntro } from './featured-vehicle-intro';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const vehicleVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 1.035, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: PREMIUM_EASE },
  },
};

/** No meaningful movement under reduced motion — an instant opacity swap only. */
const vehicleVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/**
 * Homepage hero vehicle visual (Client Component — isolated here so `Hero`
 * itself stays a Server Component; only the reveal state, float motion, and
 * `useReducedMotion` checks need the client runtime).
 *
 * TEMPORARY PLACEHOLDER: `public/images/placeholder/hero-vehicle.jpg` is a
 * generated, brandless stand-in image (no manufacturer logos/badges — see
 * `docs/homepage.md` → "Hero vehicle image"), not real dealership
 * photography. Replace the `src` with a real client-supplied photo once
 * available; everything else here (sizing, motion, edge fade) can stay
 * as-is.
 *
 * Sequence (Subphase 2.1.3 — see `docs/motion-guidelines.md`): the vehicle
 * starts hidden; `FeaturedVehicleIntro` runs its one-time "OUR FEATURE
 * VEHICLE" character intro *inside the same fixed-aspect-ratio box* the
 * vehicle will occupy — an overlay, not a stacked block above it — so
 * nothing in the hero shifts height when the text is swapped for the
 * image. The vehicle image itself is mounted from the start (so `priority`
 * can actually preload it while the intro plays) but stays invisible until
 * `revealed` flips true; only its opacity/transform animate, so there's no
 * fetch/decode delay right when it needs to appear.
 *
 * No floating info card here on purpose — an earlier pass had a bordered
 * "Featured vehicle" card overlapping the image; it was permanently removed
 * during the hero-composition pass (see `docs/homepage.md`).
 */
function HeroVehicle() {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = React.useState(false);

  const handleIntroComplete = React.useCallback(() => setRevealed(true), []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      <div className="relative aspect-[4/3] w-full">
        <VehicleVisual revealed={revealed} prefersReducedMotion={Boolean(prefersReducedMotion)} />

        {!revealed ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
            <FeaturedVehicleIntro onIntroComplete={handleIntroComplete} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface VehicleVisualProps {
  revealed: boolean;
  prefersReducedMotion: boolean;
}

/**
 * The vehicle image plus its ambient spotlight, rim light, and floor
 * reflection — always mounted, always starting from `opacity: 0`, and
 * driven purely by the `revealed` boolean. Each glow layer's `delay` gives
 * a slight, subtle stagger relative to the vehicle itself rather than all
 * elements popping in perfectly in sync.
 */
function VehicleVisual({ revealed, prefersReducedMotion }: VehicleVisualProps) {
  return (
    <motion.div
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? vehicleVariantsReduced : vehicleVariants}
      className="absolute inset-0"
    >
      {/* Ambient spotlight behind the vehicle, echoing the background's light bloom. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 0.22 : 0 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }
        }
        className="absolute inset-8 -z-10 rounded-full blur-3xl"
        style={{ background: 'oklch(0.62 0.11 55)' }}
      />
      {/* Restrained bronze rim light along the vehicle's upper edge. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 0.16 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.8, delay: 0.25, ease: PREMIUM_EASE }
        }
        className="absolute -top-4 right-[10%] -z-10 h-1/2 w-2/3 rounded-full blur-2xl"
        style={{ background: 'oklch(0.72 0.12 55)' }}
      />
      {/* Soft floor reflection — a low, wide, blurred ellipse suggesting a reflective surface. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 0.14 : 0 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4, ease: PREMIUM_EASE }
        }
        className="absolute inset-x-[12%] bottom-[6%] -z-10 h-10 rounded-full blur-2xl"
        style={{ background: 'oklch(0.75 0.01 260)' }}
      />

      <motion.div
        animate={!prefersReducedMotion && revealed ? { y: [0, -10, 0] } : undefined}
        transition={
          !prefersReducedMotion && revealed
            ? { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }
            : undefined
        }
        className="relative h-full w-full"
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
    </motion.div>
  );
}

export { HeroVehicle };
