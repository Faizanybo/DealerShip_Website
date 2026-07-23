'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

import { useMotionVariants } from '@/lib/motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, Display, Eyebrow } from '@/components/ui/typography';

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
  /** PLACEHOLDER trust claims from `siteConfig.hero.trustItems` — replace before launch. */
  trustItems: readonly string[];
}

/**
 * Animated hero text block + CTAs + trust strip.
 * Isolated from `Hero` (Server Component) so only this subtree ships Motion.
 *
 * Entrance order (see `docs/motion-guidelines.md` → "Hero timeline"):
 * eyebrow → headline lines → supporting text → CTAs → trust items (staggered).
 * Links are in the DOM from first paint — animations are visual only and never
 * block interaction.
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
  const trustContainer = useMotionVariants('staggerTrust');
  const trustItemVariant = useMotionVariants('fadeUpTrust');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex max-w-xl flex-col gap-5 sm:gap-6"
    >
      <motion.div variants={item}>
        <Eyebrow className="tracking-[0.12em]">{eyebrow}</Eyebrow>
      </motion.div>

      <Display
        as="h1"
        aria-label={headlineLines.join(' ')}
        className="text-hero-foreground text-[clamp(2.25rem,3.6vw+1.4rem,4.75rem)] leading-[1.05] font-semibold"
      >
        {headlineLines.map((line, index) => (
          <motion.span key={index} variants={item} aria-hidden="true" className="block">
            {line}
          </motion.span>
        ))}
      </Display>

      <motion.div variants={item}>
        <BodyLarge className="text-hero-muted-foreground max-w-[28rem] leading-relaxed">
          {supportingText}
        </BodyLarge>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3 pt-1 sm:flex-row sm:pt-2">
        <PrimaryButton
          asChild
          size="lg"
          className="group/cta shadow-subtle hover:shadow-elevated active:shadow-subtle focus-visible:ring-focus-ring font-semibold transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 active:translate-y-0"
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <Link href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-active/cta:translate-x-0.5"
              style={{ transitionTimingFunction: PREMIUM_EASE }}
              aria-hidden="true"
            />
          </Link>
        </PrimaryButton>
        <SecondaryButton
          asChild
          size="lg"
          className="border-hero-border text-hero-foreground focus-visible:ring-focus-ring bg-transparent font-medium transition-[transform,background-color,border-color] duration-300 hover:-translate-y-px hover:border-white/25 hover:bg-white/10 focus-visible:ring-2 active:translate-y-0 active:bg-white/5"
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </SecondaryButton>
      </motion.div>

      <motion.div variants={item}>
        <motion.ul
          variants={trustContainer}
          className="flex flex-wrap gap-x-5 gap-y-2 pt-1 sm:gap-x-6"
          aria-label="Highlights"
        >
          {trustItems.map((label) => (
            <motion.li
              key={label}
              variants={trustItemVariant}
              className="text-hero-muted-foreground flex items-center gap-1.5 text-sm leading-snug"
            >
              <Check className="text-brand-accent size-4 shrink-0" aria-hidden="true" />
              {label}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export { HeroContent };
