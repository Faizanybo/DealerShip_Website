'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { BodyLarge, PageTitle } from '@/components/ui/typography';

interface CarsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-level error UI for `/cars` — non-technical copy; no stack traces.
 */
export default function CarsError({ reset }: CarsErrorProps) {
  return (
    <Section spacing="lg">
      <Container className="flex flex-col items-center gap-6 py-8 text-center">
        <PageTitle as="h1">Unable to load vehicles</PageTitle>
        <BodyLarge className="text-text-secondary max-w-lg">
          Something went wrong while loading our stock list. Please try again, or contact us if the
          problem continues.
        </BodyLarge>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryButton type="button" onClick={reset}>
            Try again
          </PrimaryButton>
          <SecondaryButton asChild>
            <Link href="/contact">Contact sales</Link>
          </SecondaryButton>
        </div>
      </Container>
    </Section>
  );
}
