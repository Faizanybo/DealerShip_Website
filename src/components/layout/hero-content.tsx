'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import type { HeroTrustItem } from '@/config/site';
import { useMotionVariants } from '@/lib/motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, Display, Eyebrow } from '@/components/ui/typography';
import { HeroTrustStrip } from './hero-trust-strip';

/** Premium easing — mirrors `--ease-premium` / `src/lib/motion/transitions.ts`. */
const PREMIUM_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroContentProps {
  eyebrow: string;
  headlineLines: string[];
  supportingText: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** PLACEHOLDER trust columns from `siteConfig.hero.trustItems` — replace before launch. */
  trustItems: readonly HeroTrustItem[];
}

function renderHeadlineLine(line: string) {
  if (line.endsWith('.')) {
    return (
      <>
        {line.slice(0, -1)}
        <span className="text-brand-accent">.</span>
      </>
    );
  }
  return line;
}

/**
 * Animated hero text block + CTAs + trust strip.
 * Isolated from `Hero` (Server Component) so only this subtree ships Motion.
 */
function HeroContent({
  eyebrow,
  headlineLines,
  supportingText,
  primaryCta,
  secondaryCta,
  trustItems,
}: HeroContentProps) {
  const container = useMotionVariants('staggerHero');
  const item = useMotionVariants('fadeUpHero');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex max-w-xl flex-col gap-5 sm:gap-6 lg:max-w-[34rem]"
    >
      <motion.div variants={item}>
        <Eyebrow className="tracking-[0.12em]">{eyebrow}</Eyebrow>
      </motion.div>

      <Display
        as="h1"
        aria-label={headlineLines.join(' ')}
        className="text-hero-foreground text-[clamp(2.25rem,3.4vw+1.35rem,4.5rem)] leading-[1.08] font-semibold tracking-[-0.01em]"
      >
        {headlineLines.map((line, index) => (
          <motion.span key={index} variants={item} aria-hidden="true" className="block">
            {renderHeadlineLine(line)}
          </motion.span>
        ))}
      </Display>

      <motion.div variants={item}>
        <BodyLarge className="text-hero-muted-foreground max-w-[28rem] text-[0.98rem] leading-relaxed sm:text-base">
          {supportingText}
        </BodyLarge>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:pt-2"
      >
        <PrimaryButton
          asChild
          size="lg"
          className="bg-brand-accent text-hero-background hover:bg-brand-accent-hover shadow-subtle hover:shadow-elevated focus-visible:ring-focus-ring border-0 font-semibold transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 active:translate-y-0"
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </PrimaryButton>
        <SecondaryButton
          asChild
          size="lg"
          className="border-hero-border/80 text-hero-foreground focus-visible:ring-focus-ring bg-transparent font-medium transition-[transform,background-color,border-color] duration-300 hover:-translate-y-px hover:border-white/30 hover:bg-white/[0.06] focus-visible:ring-2 active:translate-y-0 active:bg-white/5"
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </SecondaryButton>
      </motion.div>

      <motion.div variants={item}>
        <HeroTrustStrip items={trustItems} />
      </motion.div>
    </motion.div>
  );
}

export { HeroContent };
