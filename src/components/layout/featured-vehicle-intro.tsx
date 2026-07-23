'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import { useReducedMotion } from '@/lib/motion';

/** The one-time intro phrase — a single constant, not client-configurable copy. */
const PHRASE = 'OUR FEATURE VEHICLE';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Timing budget (ms) for the full-motion sequence — see
 * `docs/motion-guidelines.md` → "Featured-vehicle intro" for the rationale
 * and the target ~2.5–3.5s total. Kept as named constants (not magic
 * numbers) since the stage-transition timers below are derived from them.
 */
const INITIAL_DELAY_MS = 280;
const CHAR_STAGGER_MS = 50;
const CHAR_DURATION_MS = 280;
const HOLD_MS = 650;
const EXIT_STAGGER_MS = 32;
const EXIT_DURATION_MS = 180;

/** Reduced-motion: skip the character choreography, hold the static phrase very briefly. */
const REDUCED_MOTION_HOLD_MS = 350;

type IntroStage = 'intro' | 'holding' | 'exiting' | 'vehicle';

const containerVariants: Variants = {
  hidden: {},
  entering: {
    transition: { staggerChildren: CHAR_STAGGER_MS / 1000, delayChildren: INITIAL_DELAY_MS / 1000 },
  },
  // `staggerDirection: -1` replays the same children back-to-front, so the
  // phrase disappears in reverse order without reversing the DOM/reading order.
  exiting: {
    transition: { staggerChildren: EXIT_STAGGER_MS / 1000, staggerDirection: -1 },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
  entering: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: CHAR_DURATION_MS / 1000, ease: PREMIUM_EASE },
  },
  exiting: {
    opacity: 0,
    y: -8,
    transition: { duration: EXIT_DURATION_MS / 1000, ease: PREMIUM_EASE },
  },
};

const captionClassName =
  'font-display text-[clamp(0.9375rem,2.6vw+0.5rem,1.5rem)] font-extrabold tracking-[0.12em] uppercase';

const captionGradientStyle: React.CSSProperties = {
  backgroundImage: 'linear-gradient(90deg, var(--brand-accent), var(--hero-muted-foreground) 85%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

interface FeaturedVehicleIntroProps {
  /** Fires exactly once, when the sequence finishes and the vehicle should reveal. */
  onIntroComplete: () => void;
}

/**
 * One-time, character-by-character "OUR FEATURE VEHICLE" intro for the
 * homepage hero's vehicle visual (Subphase 2.1.3 — see
 * `docs/motion-guidelines.md`). Runs a small typed state machine
 * (`intro` → `holding` → `exiting` → `vehicle`) driven by local timers,
 * then calls `onIntroComplete` and unmounts itself (renders `null`).
 *
 * Deliberately the *smallest* Client Component in this subtree: it owns
 * only its own stage/timer state, not the vehicle image, glow, or floor
 * reflection — `HeroVehicle` just needs the single "done" signal to reveal
 * those. This also means it's the only piece of the hero that re-renders
 * on every stage change.
 *
 * Runs once per mount by construction — there is no branch that loops back
 * to `'intro'`, and the component never remounts on its own (see
 * `hero-vehicle.tsx`, which mounts it exactly once per page load).
 */
function FeaturedVehicleIntro({ onIntroComplete }: FeaturedVehicleIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = React.useState<IntroStage>('intro');
  const onIntroCompleteRef = React.useRef(onIntroComplete);

  // Keep the ref current without touching it during render itself.
  React.useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  });

  React.useEffect(() => {
    if (stage === 'vehicle') {
      onIntroCompleteRef.current();
      return;
    }

    if (prefersReducedMotion) {
      const timeout = window.setTimeout(() => setStage('vehicle'), REDUCED_MOTION_HOLD_MS);
      return () => window.clearTimeout(timeout);
    }

    const stageDurationMs: Record<Exclude<IntroStage, 'vehicle'>, number> = {
      intro: INITIAL_DELAY_MS + (PHRASE.length - 1) * CHAR_STAGGER_MS + CHAR_DURATION_MS,
      holding: HOLD_MS,
      exiting: (PHRASE.length - 1) * EXIT_STAGGER_MS + EXIT_DURATION_MS,
    };
    const nextStage: Record<Exclude<IntroStage, 'vehicle'>, IntroStage> = {
      intro: 'holding',
      holding: 'exiting',
      exiting: 'vehicle',
    };

    const timeout = window.setTimeout(() => setStage(nextStage[stage]), stageDurationMs[stage]);
    return () => window.clearTimeout(timeout);
  }, [stage, prefersReducedMotion]);

  if (stage === 'vehicle') return null;

  if (prefersReducedMotion) {
    return (
      <p className={captionClassName} style={captionGradientStyle}>
        <span className="sr-only">{PHRASE}</span>
        <span aria-hidden="true">{PHRASE}</span>
      </p>
    );
  }

  return (
    <p className={captionClassName} style={captionGradientStyle}>
      <span className="sr-only">{PHRASE}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate={stage === 'exiting' ? 'exiting' : 'entering'}
        variants={containerVariants}
        className="inline-block"
      >
        {PHRASE.split('').map((char, index) => (
          <motion.span key={index} variants={charVariants} className="inline-block">
            {char}
          </motion.span>
        ))}
      </motion.span>
    </p>
  );
}

export { FeaturedVehicleIntro };
