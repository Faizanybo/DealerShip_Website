import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, SectionTitle } from '@/components/ui/typography';

/**
 * Closing CTA for `/cars` — encourages contact when nothing in stock fits.
 */
function CarsBottomCta() {
  return (
    <Section tone="muted" spacing="normal" aria-label="Get in touch">
      <Container size="wide" className="flex flex-col items-center gap-5 py-4 text-center sm:gap-6">
        <SectionTitle as="h2" className="max-w-lg text-balance">
          Can&apos;t find the right vehicle?
        </SectionTitle>
        <BodyLarge className="text-text-secondary max-w-xl">
          Tell us what you&apos;re looking for and our team will be in touch — or ask about selling
          your current car through us.
        </BodyLarge>
        <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <PrimaryButton asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact">Contact sales</Link>
          </PrimaryButton>
          <SecondaryButton asChild size="lg" className="w-full sm:w-auto">
            <Link href="/sell-your-car">Sell your car</Link>
          </SecondaryButton>
        </div>
      </Container>
    </Section>
  );
}

export { CarsBottomCta };
