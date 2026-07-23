'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import { useMotionVariants } from '@/lib/motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, Display, Eyebrow } from '@/components/ui/typography';

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroContentProps {
  eyebrow: string;
  headline: string;
  supportingText: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Section id to scroll to — renders the scroll indicator when set. */
  scrollTargetId?: string;
}

/**
 * Animated hero text block + CTAs + scroll indicator. Isolated from `Hero`
 * (a Server Component) so only this small subtree ships Motion's client
 * runtime — the background treatment and outer section stay server-rendered.
 */
function HeroContent({
  eyebrow,
  headline,
  supportingText,
  primaryCta,
  secondaryCta,
  scrollTargetId,
}: HeroContentProps) {
  const container = useMotionVariants('staggerContainer');
  const item = useMotionVariants('fadeUp');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex max-w-2xl flex-col gap-6"
    >
      <motion.div variants={item}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>

      <motion.div variants={item}>
        <Display as="h1" className="text-hero-foreground">
          {headline}
        </Display>
      </motion.div>

      <motion.div variants={item}>
        <BodyLarge className="text-hero-muted-foreground max-w-xl">{supportingText}</BodyLarge>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3 pt-2 sm:flex-row">
        <PrimaryButton asChild size="lg">
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </PrimaryButton>
        <SecondaryButton
          asChild
          size="lg"
          className="border-hero-border text-hero-foreground bg-transparent hover:bg-white/10"
        >
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </SecondaryButton>
      </motion.div>

      {scrollTargetId ? (
        <motion.div variants={item} className="pt-6">
          <a
            href={`#${scrollTargetId}`}
            aria-label="Scroll to learn more"
            className="text-hero-muted-foreground hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex rounded-full p-2 transition-colors outline-none focus-visible:ring-2"
          >
            <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden="true" />
          </a>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export { HeroContent };
