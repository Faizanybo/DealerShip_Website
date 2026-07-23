'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';
import { HeroFeaturedLabel } from './hero-featured-label';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/** Radial mask — dissolves edges; biased lower so the roof line stays crisp. */
const VEHICLE_EDGE_MASK =
  'radial-gradient(ellipse 84% 72% at 50% 72%, black 54%, transparent 100%)';

/** Nearly imperceptible post-reveal float — see docs/motion-guidelines.md. */
const AMBIENT_FLOAT_PX = 3;
const AMBIENT_FLOAT_DURATION_S = 10;

const vehicleVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 1.04, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: PREMIUM_EASE },
  },
};

const vehicleVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/**
 * Homepage hero vehicle visual — persistent "OUR FEATURE VEHICLE" label behind
 * the car (reference mockup) with cinematic studio lighting.
 */
function HeroVehicle() {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = React.useState(Boolean(prefersReducedMotion));

  const handleLabelReady = React.useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      <HeroFeaturedLabel onLabelReady={handleLabelReady} />
      <div className="relative -mt-2 aspect-[4/3] w-full overflow-hidden sm:-mt-4 lg:-mt-6 lg:aspect-[16/11]">
        <VehicleStudioScene
          revealed={revealed}
          prefersReducedMotion={Boolean(prefersReducedMotion)}
        />
        <VehicleVisual revealed={revealed} prefersReducedMotion={Boolean(prefersReducedMotion)} />
      </div>
    </div>
  );
}

interface SceneProps {
  revealed: boolean;
  prefersReducedMotion: boolean;
}

function VehicleStudioScene({ revealed, prefersReducedMotion }: SceneProps) {
  const spotlightOpacity = revealed ? [0.9, 1, 0.9] : 0;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 85% at 55% 58%, var(--hero-studio-base) 0%, oklch(0.04 0.002 260) 100%)`,
        }}
      />

      {/* Strong vertical god-ray — matches reference mockup strip behind the car. */}
      <motion.div
        animate={{ opacity: revealed ? 1 : 0.35 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.1, ease: PREMIUM_EASE }
        }
        className="absolute top-0 right-[18%] hidden h-full w-px sm:block lg:right-[22%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--hero-studio-streak) 35%, var(--hero-studio-streak-core) 50%, var(--hero-studio-streak) 65%, transparent 100%)',
        }}
      />
      <motion.div
        animate={{ opacity: revealed ? 0.85 : 0.25 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.1, ease: PREMIUM_EASE }
        }
        className="absolute top-[8%] right-[14%] hidden h-[78%] w-16 -translate-x-1/2 blur-2xl sm:block lg:right-[18%] lg:w-20 lg:blur-3xl"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(0.72 0.14 55 / 0.35) 48%, transparent 100%)',
        }}
      />

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
        className="absolute top-[22%] left-1/2 h-[58%] w-[82%] -translate-x-1/2 rounded-full blur-2xl sm:blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--hero-studio-spotlight-core) 0%, var(--hero-studio-spotlight) 38%, transparent 70%)`,
        }}
      />

      <motion.div
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.85, delay: 0.35, ease: PREMIUM_EASE }
        }
        className="absolute inset-x-[6%] bottom-0 h-[32%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--hero-studio-floor) 50%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 86% 80% at 50% 50%, transparent 38%, var(--hero-studio-vignette) 100%)`,
        }}
      />

      <div
        className="absolute inset-0 hidden opacity-[0.04] mix-blend-overlay sm:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function VehicleVisual({ revealed, prefersReducedMotion }: SceneProps) {
  return (
    <motion.div
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? vehicleVariantsReduced : vehicleVariants}
      className="absolute inset-0 z-10"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.85, delay: 0.2, ease: PREMIUM_EASE }
        }
        className="absolute bottom-[4%] left-1/2 h-4 w-[62%] -translate-x-1/2 rounded-[100%] blur-lg sm:w-[56%]"
        style={{ background: 'var(--hero-studio-ground-shadow)' }}
      />

      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { opacity: revealed ? 0.5 : 0 }
            : revealed
              ? { opacity: [0.5, 0.72, 0.5] }
              : { opacity: 0 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : revealed
              ? { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
              : { duration: 0.8, delay: 0.25, ease: PREMIUM_EASE }
        }
        className="absolute top-[10%] right-[6%] h-[42%] w-[58%] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, var(--hero-studio-rim) 0%, transparent 68%)`,
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
        className="relative h-full w-full pt-[6%] sm:pt-[4%]"
      >
        <Image
          src="/images/placeholder/hero-vehicle.jpg"
          alt="Premium vehicle"
          fill
          priority
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 50vw, 90vw"
          className="object-contain object-bottom"
          style={{
            filter:
              'drop-shadow(0 28px 40px var(--hero-studio-ground-shadow)) drop-shadow(0 10px 20px oklch(0 0 0 / 0.35))',
            maskImage: VEHICLE_EDGE_MASK,
            WebkitMaskImage: VEHICLE_EDGE_MASK,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export { HeroVehicle };
