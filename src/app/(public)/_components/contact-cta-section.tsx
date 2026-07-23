import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PrimaryButton } from '@/components/ui/app-button';
import { BodyLarge, PageTitle } from '@/components/ui/typography';

/**
 * Closing contact CTA — bookends the homepage with a second dark section,
 * echoing the hero for visual rhythm without repeating its content.
 */
function ContactCtaSection() {
  return (
    <Section tone="hero" spacing="lg">
      <Container className="flex flex-col items-center gap-6 text-center">
        <PageTitle as="h2" className="text-hero-foreground">
          Have a question about a vehicle?
        </PageTitle>
        <BodyLarge className="text-hero-muted-foreground max-w-xl">
          Get in touch and we&apos;ll get back to you — whether you&apos;re after a specific model
          or just exploring what&apos;s available.
        </BodyLarge>
        <PrimaryButton asChild size="lg">
          <Link href="/contact">Contact us</Link>
        </PrimaryButton>
      </Container>
    </Section>
  );
}

export { ContactCtaSection };
