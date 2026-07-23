'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useMotionVariants, useReducedMotion, useScaleInteraction } from '@/lib/motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodySmall } from '@/components/ui/typography';

/**
 * Live demonstrations of `src/lib/motion` variants. Client component because
 * it uses Motion hooks — kept isolated from the rest of the (server-rendered)
 * preview page.
 */
export function MotionExamples() {
  const [replayKey, setReplayKey] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const fadeUp = useMotionVariants('fadeUp');
  const stagger = useMotionVariants('staggerContainer');
  const fadeIn = useMotionVariants('fadeIn');
  const mobileMenu = useMotionVariants('mobileMenuTransition');
  const scaleInteraction = useScaleInteraction();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-8">
      <BodySmall>
        System reduced-motion preference detected:{' '}
        <span className="text-foreground font-medium">
          {prefersReducedMotion ? 'reduce' : 'no-preference'}
        </span>
        . Every example below respects it automatically.
      </BodySmall>

      <div className="flex flex-wrap items-center gap-3">
        <SecondaryButton onClick={() => setReplayKey((key) => key + 1)}>
          Replay fade / stagger
        </SecondaryButton>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-card border-border-subtle bg-surface-elevated border p-4">
          <BodySmall className="mb-3">fadeUp</BodySmall>
          <motion.div
            key={`fade-up-${replayKey}`}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-input bg-brand-accent/10 text-brand-accent flex h-16 items-center justify-center text-sm font-medium"
          >
            Fades up + in
          </motion.div>
        </div>

        <div className="rounded-card border-border-subtle bg-surface-elevated border p-4">
          <BodySmall className="mb-3">staggerContainer</BodySmall>
          <motion.div
            key={`stagger-${replayKey}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex gap-2"
          >
            {[0, 1, 2].map((item) => (
              <motion.div
                key={item}
                variants={fadeIn}
                className="rounded-input bg-surface-muted text-text-secondary flex h-16 flex-1 items-center justify-center text-sm"
              >
                {item + 1}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="rounded-card border-border-subtle bg-surface-elevated border p-4">
          <BodySmall className="mb-3">scaleInteraction (hover / tap)</BodySmall>
          <motion.button
            type="button"
            {...scaleInteraction}
            className="rounded-input bg-primary text-primary-foreground flex h-16 w-full items-center justify-center text-sm font-medium"
          >
            Hover or press me
          </motion.button>
        </div>

        <div className="rounded-card border-border-subtle bg-surface-elevated border p-4">
          <BodySmall className="mb-3">mobileMenuTransition</BodySmall>
          <PrimaryButton onClick={() => setMenuOpen((open) => !open)} className="mb-3">
            {menuOpen ? 'Hide panel' : 'Show panel'}
          </PrimaryButton>
          <div className="rounded-input bg-hero-background relative h-16 overflow-hidden">
            <AnimatePresence>
              {menuOpen ? (
                <motion.div
                  variants={mobileMenu}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-brand-accent text-brand-accent-foreground absolute inset-y-0 right-0 flex w-2/3 items-center justify-center text-sm font-medium"
                >
                  Off-canvas panel
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!menuOpen && (
              <p className="text-hero-muted-foreground flex h-full items-center justify-center text-sm">
                Panel hidden
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
