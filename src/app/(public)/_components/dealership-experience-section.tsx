import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
import { GhostButton } from '@/components/ui/app-button';

/**
 * Short "about us" teaser linking through to the full `/about` page.
 * Neutral, generic copy — no testimonials, statistics, or invented history.
 */
function DealershipExperienceSection() {
  return (
    <Section tone="muted" spacing="lg">
      <Container className="flex flex-col items-start gap-6">
        <SectionHeader
          eyebrow="About us"
          title={`Getting to know ${siteConfig.dealershipName}`}
          description="We're putting together the full story of who we are and how we work. In the meantime, here's a quick introduction."
        />
        <GhostButton asChild>
          <Link href="/about">Learn more about us</Link>
        </GhostButton>
      </Container>
    </Section>
  );
}

export { DealershipExperienceSection };
