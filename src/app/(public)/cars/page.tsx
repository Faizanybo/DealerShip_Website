import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Metadata as MetadataText } from '@/components/ui/typography';
import { VehicleInventoryGrid } from '@/features/vehicles/components';
import {
  CARS_LISTING_DEFAULT_STATUS,
  getInventorySummaryHeading,
  getInventorySummaryMeta,
  hasActiveInventoryFilters,
  parseVehicleListingSearchParams,
  serializeVehicleListingSearchParams,
  VehicleFilters,
  VehicleInventoryResults,
  type SearchParamsInput,
} from '@/features/vehicle-listings';
import { siteConfig } from '@/config/site';
import { getVehicleFilterOptions, getVehicles } from '@/services/vehicle.service';

import { CarsBottomCta } from './_components/cars-bottom-cta';
import { CarsEmptyState } from './_components/cars-empty-state';
import { CarsFilteredEmptyState } from './_components/cars-filtered-empty-state';
import { CarsFiltersFallback } from './_components/cars-filters-fallback';
import { CarsPageHero } from './_components/cars-page-hero';

const PAGE_DESCRIPTION = `Browse current stock at ${siteConfig.dealershipName}. Premium vehicles, honestly presented — explore our latest inventory online.`;

export const metadata: Metadata = {
  title: 'Cars',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `Cars | ${siteConfig.dealershipName}`,
    description: PAGE_DESCRIPTION,
    type: 'website',
  },
};

interface CarsPageProps {
  searchParams: Promise<SearchParamsInput>;
}

/**
 * Current-stock listing with URL-driven filters and sorting (Phase 2.2.4).
 * Inventory is fetched server-side via `VehicleService` — the URL is the source of truth.
 */
export default async function CarsPage({ searchParams }: CarsPageProps) {
  const raw = await searchParams;
  const query = parseVehicleListingSearchParams(raw);

  const [listing, filterOptions] = await Promise.all([
    getVehicles(query),
    getVehicleFilterOptions({ status: CARS_LISTING_DEFAULT_STATUS }),
  ]);

  const { items, total } = listing;
  const summaryHeading = getInventorySummaryHeading(total, query);
  const summaryMeta = getInventorySummaryMeta(query);
  const queryKey = serializeVehicleListingSearchParams(query).toString();

  const emptyState =
    total === 0 ? (
      hasActiveInventoryFilters(query) ? (
        <CarsFilteredEmptyState />
      ) : (
        <CarsEmptyState />
      )
    ) : null;

  return (
    <>
      <CarsPageHero />

      <Section spacing="normal" aria-labelledby="cars-inventory-heading">
        <Container size="wide" className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="flex flex-col gap-1">
                <h2 id="cars-inventory-heading" className="sr-only">
                  Vehicle inventory
                </h2>
                <p
                  className="text-text-primary text-lg font-semibold tracking-tight sm:text-xl"
                  aria-live="polite"
                >
                  {summaryHeading}
                </p>
                <MetadataText as="p">{summaryMeta}</MetadataText>
              </div>
            </div>

            <Suspense fallback={<CarsFiltersFallback />}>
              <VehicleFilters filterOptions={filterOptions} query={query} resultCount={total} />
            </Suspense>
          </div>

          {emptyState ?? (
            <VehicleInventoryResults queryKey={queryKey}>
              <VehicleInventoryGrid vehicles={items} />
            </VehicleInventoryResults>
          )}
        </Container>
      </Section>

      <CarsBottomCta />
    </>
  );
}
