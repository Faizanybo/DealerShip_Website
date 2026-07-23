import type { Metadata } from 'next';
import { Car, History } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { Hero } from '@/components/layout/hero';
import { ContactCtaSection } from './_components/contact-cta-section';
import { DealershipExperienceSection } from './_components/dealership-experience-section';
import { InventoryPlaceholderSection } from './_components/inventory-placeholder-section';
import { ValuePropositionSection } from './_components/value-proposition-section';

export const metadata: Metadata = {
  description: `${siteConfig.tagline} Browse current stock, see recently sold vehicles, and get in touch with ${siteConfig.dealershipName}.`,
};

/**
 * Homepage (Phase 2.1): premium dark hero + structural foundation for future
 * data-driven sections. The "Featured vehicles" and "Recently sold" sections
 * below are structural placeholders only — real vehicle cards arrive once
 * inventory is synced from Auto Trader Connect into PostgreSQL and read from
 * there (see `docs/homepage.md`).
 */
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Buying made simple"
        // Two authored lines — each animates in on its own beat (see
        // `hero-content.tsx`) and each is still free to soft-wrap on
        // narrower columns, so the visual line count varies by viewport.
        // Content mirrors `siteConfig.tagline`; full sentence is still one
        // semantic <h1> (see the `aria-label` in `hero-content.tsx`).
        headlineLines={['Premium vehicles,', 'honestly presented.']}
        supportingText={`We're putting together a straightforward, no-nonsense way to browse, compare, and buy your next car from ${siteConfig.dealershipName}. Explore what's currently available or get in touch with any questions.`}
        primaryCta={{ label: 'Browse cars', href: '/cars' }}
        secondaryCta={{ label: 'Contact us', href: '/contact' }}
        trustItems={siteConfig.hero.trustItems}
        scrollTargetId="intro"
      />

      <ValuePropositionSection />

      <InventoryPlaceholderSection
        id="featured"
        tone="page"
        eyebrow="Featured inventory"
        title="Featured vehicles"
        description="A curated selection of our current stock will appear here."
        icon={Car}
        emptyStateTitle="Inventory coming soon"
        emptyStateDescription="Vehicles will appear here once our stock is connected."
      />

      <InventoryPlaceholderSection
        id="recently-sold"
        tone="muted"
        eyebrow="Recently sold"
        title="Recently sold vehicles"
        description="A showcase of vehicles we've recently sold will appear here."
        icon={History}
        emptyStateTitle="Recently sold coming soon"
        emptyStateDescription="Recently sold vehicles will be showcased here once available."
      />

      <DealershipExperienceSection />

      <ContactCtaSection />
    </>
  );
}
