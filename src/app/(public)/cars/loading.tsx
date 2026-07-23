import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Skeleton } from '@/components/ui/skeleton';

import { CarsFiltersFallback } from './_components/cars-filters-fallback';
import { CarsInventoryFallback } from './_components/cars-inventory-fallback';

/**
 * Route-level loading UI for `/cars` — mirrors hero, filters, and inventory skeleton.
 */
export default function CarsLoading() {
  return (
    <>
      <Section tone="muted" spacing="normal" aria-busy="true" aria-label="Loading vehicles">
        <Container size="wide" className="flex flex-col gap-4 py-2 sm:gap-5 sm:py-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </Container>
      </Section>

      <Section spacing="normal">
        <Container size="wide" className="flex flex-col gap-8 sm:gap-10">
          <CarsFiltersFallback />
          <CarsInventoryFallback />
        </Container>
      </Section>
    </>
  );
}
