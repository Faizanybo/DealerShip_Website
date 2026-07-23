'use client';

import { motion } from 'motion/react';
import { Handshake, Shield, Tag, type LucideIcon } from 'lucide-react';

import { useMotionVariants } from '@/lib/motion';
import type { HeroTrustItem } from '@/config/site';

const TRUST_ICONS: LucideIcon[] = [Shield, Tag, Handshake];

interface HeroTrustStripProps {
  /** PLACEHOLDER claims from `siteConfig.hero.trustItems` — replace before launch. */
  items: readonly HeroTrustItem[];
}

/**
 * Three-column trust row with bronze icons — matches reference mockup layout.
 * Reveals sequentially after hero CTAs (see `docs/motion-guidelines.md`).
 */
function HeroTrustStrip({ items }: HeroTrustStripProps) {
  const trustContainer = useMotionVariants('staggerTrust');
  const trustItemVariant = useMotionVariants('fadeUpTrust');

  return (
    <motion.ul
      variants={trustContainer}
      className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3 sm:gap-4 sm:pt-6"
      aria-label="Highlights"
    >
      {items.map((item, index) => {
        const Icon = TRUST_ICONS[index] ?? Shield;
        return (
          <motion.li key={item.title} variants={trustItemVariant} className="flex flex-col gap-1.5">
            <Icon
              className="text-brand-accent size-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-hero-foreground text-sm leading-snug font-semibold">
              {item.title}
            </span>
            <span className="text-hero-muted-foreground text-xs leading-relaxed">
              {item.description}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export { HeroTrustStrip };
