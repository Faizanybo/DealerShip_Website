import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { LoadingCard } from '@/components/ui/loading-card';
import { Skeleton } from '@/components/ui/skeleton';

import { CarsFiltersFallback } from './_components/cars-filters-fallback';

const SKELETON_COUNT = 6;

/**
 * Route-level loading UI for `/cars` — mirrors hero, summary, filters, and card grid
 * proportions to prevent layout shift.
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>
            <CarsFiltersFallback />
          </div>

          <ul
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4 2xl:gap-6"
            aria-hidden="true"
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <li key={index} className="list-none">
                <LoadingCard lines={3} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
