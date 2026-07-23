'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

import { useMotionVariants, useScaleInteraction } from '@/lib/motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, Display, Eyebrow } from '@/components/ui/typography';

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
  /** Short, neutral placeholder trust points — replace with real client copy before launch. */
  trustItems: string[];
}

/**
 * Animated hero text block + CTAs + trust strip + scroll indicator.
 * Isolated from `Hero` (a Server Component) so only this small subtree
 * ships Motion's client runtime — the background treatment and outer
 * section stay server-rendered.
 *
 * The headline is authored as an array of short lines (`headlineLines`) so
 * each can animate in on its own beat (line 1 → line 2 → ...). Each
 * authored line is still free to soft-wrap on its own if the column is too
 * narrow for it (helped by `text-balance` on `<Display>`), so the visual
 * line count naturally varies by viewport — see `docs/homepage.md` →
 * "Hero headline" for why that's intentional rather than a bug. It still
 * renders as a single `<h1>` for document outline/screen-reader purposes —
 * the line breaks are a visual-only effect (`aria-hidden` on the split
 * spans, full sentence in the heading's `aria-label`).
 */
function HeroContent({
  eyebrow,
  headlineLines,
  supportingText,
  primaryCta,
  secondaryCta,
  trustItems,
}: HeroContentProps) {
  const container = useMotionVariants('staggerContainer');
  const item = useMotionVariants('fadeUp');
  const scaleInteraction = useScaleInteraction();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex max-w-xl flex-col gap-6"
    >
      <motion.div variants={item}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>

      <Display
        as="h1"
        aria-label={headlineLines.join(' ')}
        className="text-hero-foreground text-[clamp(2.25rem,3.6vw+1.4rem,4.75rem)] leading-[1.05]"
      >
        {headlineLines.map((line, index) => (
          <motion.span key={index} variants={item} aria-hidden="true" className="block">
            {line}
          </motion.span>
        ))}
      </Display>

      <motion.div variants={item}>
        <BodyLarge className="text-hero-muted-foreground max-w-md">{supportingText}</BodyLarge>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3 pt-2 sm:flex-row">
        <motion.span {...scaleInteraction} className="inline-block">
          <PrimaryButton
            asChild
            size="lg"
            className="group/cta shadow-subtle hover:shadow-elevated transition-shadow duration-300"
          >
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </PrimaryButton>
        </motion.span>
        <motion.span {...scaleInteraction} className="inline-block">
          <SecondaryButton
            asChild
            size="lg"
            className="border-hero-border text-hero-foreground bg-transparent hover:bg-white/10"
          >
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </SecondaryButton>
        </motion.span>
      </motion.div>

      {/* Trust strip — neutral placeholders; replace with client-confirmed copy before launch. */}
      <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
        {trustItems.map((trustItem) => (
          <li
            key={trustItem}
            className="text-hero-muted-foreground flex items-center gap-1.5 text-sm"
          >
            <Check className="text-brand-accent size-4 shrink-0" aria-hidden="true" />
            {trustItem}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export { HeroContent };
