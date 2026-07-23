'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';
import { FeaturedVehicleIntro } from './featured-vehicle-intro';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/** Source asset: 1400×933 (~73 KB). Parent `aspect-[4/3]` reserves layout space. */

/** Radial mask — dissolves every edge of the vehicle into the studio background. */
const VEHICLE_EDGE_MASK =
  'radial-gradient(ellipse 78% 80% at 50% 48%, black 55%, transparent 100%)';

/** Nearly imperceptible post-reveal float — see docs/motion-guidelines.md. */
const AMBIENT_FLOAT_PX = 3;
const AMBIENT_FLOAT_DURATION_S = 10;

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

const vehicleVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/**
 * Homepage hero vehicle visual (Client Component). See `docs/homepage.md` →
 * "Vehicle studio lighting" and `docs/motion-guidelines.md` for the intro
 * sequence (Subphase 2.1.3) and ambient motion (Subphase 2.1.4).
 */
function HeroVehicle() {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = React.useState(false);

  const handleIntroComplete = React.useCallback(() => setRevealed(true), []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <VehicleStudioScene
          revealed={revealed}
          prefersReducedMotion={Boolean(prefersReducedMotion)}
        />
        <VehicleVisual revealed={revealed} prefersReducedMotion={Boolean(prefersReducedMotion)} />

        {!revealed ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
            <FeaturedVehicleIntro onIntroComplete={handleIntroComplete} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface SceneProps {
  revealed: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Layered CSS studio background inside the vehicle box — each layer has a
 * single job. Decorative only (`aria-hidden`). Expensive layers (grain,
 * vertical streak) are omitted below `sm:` to keep mobile lean.
 */
function VehicleStudioScene({ revealed, prefersReducedMotion }: SceneProps) {
  const spotlightOpacity = revealed ? [0.85, 1, 0.85] : 0;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {/* 1. Dark base — local radial falloff so the box reads as a studio alcove. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 95% 90% at 50% 55%, var(--hero-studio-base) 0%, oklch(0.1 0.004 260) 100%)`,
        }}
      />

      {/* 2. Bronze radial spotlight — centred behind where the car sits. */}
      <motion.div
        animate={
          prefersReducedMotion ? { opacity: revealed ? 1 : 0 } : { opacity: spotlightOpacity }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : revealed
              ? {
                  duration: AMBIENT_FLOAT_DURATION_S,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.1,
                }
              : { duration: 0.8, ease: PREMIUM_EASE }
        }
        className="absolute top-[18%] left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-full blur-2xl sm:blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--hero-studio-spotlight-core) 0%, var(--hero-studio-spotlight) 42%, transparent 72%)`,
        }}
      />

      {/* 3. Restrained vertical light streak — desktop/tablet only. */}
      <motion.div
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.9, delay: 0.15, ease: PREMIUM_EASE }
        }
        className="absolute top-[12%] left-[54%] hidden h-[68%] w-px -translate-x-1/2 sm:block"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--hero-studio-streak) 48%, transparent 100%)',
        }}
      />

      {/* 4. Soft floor illumination — horizontal pool of light under the car. */}
      <motion.div
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.85, delay: 0.35, ease: PREMIUM_EASE }
        }
        className="absolute inset-x-[8%] bottom-0 h-[28%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--hero-studio-floor) 55%, transparent 100%)',
        }}
      />

      {/* 5. Edge vignette — depth without competing with the hero-wide vignette. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 88% 82% at 50% 50%, transparent 42%, var(--hero-studio-vignette) 100%)`,
        }}
      />

      {/* 6. Lightweight grain — sm+ only; inline SVG, zero network bytes. */}
      <div
        className="absolute inset-0 hidden opacity-[0.045] mix-blend-overlay sm:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/**
 * Vehicle image plus grounding shadow, rim light, and floor reflection.
 * Reveal animation unchanged from Subphase 2.1.3; ambient float tightened
 * to ~3px / 10s per Subphase 2.1.4.
 */
function VehicleVisual({ revealed, prefersReducedMotion }: SceneProps) {
  return (
    <motion.div
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? vehicleVariantsReduced : vehicleVariants}
      className="absolute inset-0 z-10"
    >
      {/* Grounding shadow — elliptical contact shadow under the tyres. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.85, delay: 0.2, ease: PREMIUM_EASE }
        }
        className="absolute bottom-[6%] left-1/2 h-3 w-[58%] -translate-x-1/2 rounded-[100%] blur-md sm:h-4 sm:w-[52%] sm:blur-lg"
        style={{ background: 'var(--hero-studio-ground-shadow)' }}
      />

      {/* Floor reflection — blurred mirror pool (CSS only, no duplicate image). */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 0.35 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.9, delay: 0.45, ease: PREMIUM_EASE }
        }
        className="absolute inset-x-[14%] bottom-[4%] hidden h-8 rounded-[100%] blur-xl sm:block"
        style={{
          background: 'linear-gradient(180deg, var(--hero-studio-floor) 0%, transparent 100%)',
        }}
      />

      {/* Bronze rim light — upper-edge highlight for foreground depth. */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { opacity: revealed ? 0.55 : 0 }
            : revealed
              ? { opacity: [0.45, 0.6, 0.45] }
              : { opacity: 0 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : revealed
              ? { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
              : { duration: 0.8, delay: 0.25, ease: PREMIUM_EASE }
        }
        className="absolute top-[14%] right-[8%] h-[38%] w-[55%] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, var(--hero-studio-rim) 0%, transparent 70%)`,
        }}
      />

      <motion.div
        animate={!prefersReducedMotion && revealed ? { y: [0, -AMBIENT_FLOAT_PX, 0] } : undefined}
        transition={
          !prefersReducedMotion && revealed
            ? {
                duration: AMBIENT_FLOAT_DURATION_S,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.1,
              }
            : undefined
        }
        className="relative h-full w-full"
      >
        <Image
          src="/images/placeholder/hero-vehicle.jpg"
          alt="Premium vehicle"
          fill
          priority
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 50vw, 90vw"
          className="object-contain object-[center_52%]"
          style={{
            filter:
              'drop-shadow(0 24px 32px var(--hero-studio-ground-shadow)) drop-shadow(0 8px 16px oklch(0 0 0 / 0.25))',
            maskImage: VEHICLE_EDGE_MASK,
            WebkitMaskImage: VEHICLE_EDGE_MASK,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export { HeroVehicle };
