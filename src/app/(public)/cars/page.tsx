import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import {
  CARS_LISTING_DEFAULT_STATUS,
  parseVehicleListingSearchParams,
  VehicleFilters,
  type SearchParamsInput,
} from '@/features/vehicle-listings';
import { DEFAULT_VEHICLE_PAGE_SIZE } from '@/features/vehicles/vehicle.constants';
import { siteConfig } from '@/config/site';
import { getVehicleFilterOptions } from '@/services/vehicle.service';

import { CarsBottomCta } from './_components/cars-bottom-cta';
import { CarsFiltersFallback } from './_components/cars-filters-fallback';
import { CarsInventoryFallback } from './_components/cars-inventory-fallback';
import { CarsInventorySection } from './_components/cars-inventory-section';
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
 * Current-stock listing with URL-driven filters, sorting, and pagination (Phase 2.2.5).
 * Inventory is fetched server-side via `VehicleService` — the URL is the source of truth.
 */
export default async function CarsPage({ searchParams }: CarsPageProps) {
  const raw = await searchParams;
  const query = parseVehicleListingSearchParams(raw);

  const filterOptions = await getVehicleFilterOptions({ status: CARS_LISTING_DEFAULT_STATUS });

  return (
    <>
      <CarsPageHero />

      <Section spacing="normal" aria-labelledby="cars-inventory-heading">
        <Container size="wide" className="flex flex-col gap-8 sm:gap-10">
          <h2 id="cars-inventory-heading" className="sr-only">
            Vehicle inventory
          </h2>

          <Suspense fallback={<CarsFiltersFallback />}>
            <VehicleFilters filterOptions={filterOptions} query={query} />
          </Suspense>

          <Suspense
            fallback={
              <CarsInventoryFallback pageSize={query.pageSize ?? DEFAULT_VEHICLE_PAGE_SIZE} />
            }
          >
            <CarsInventorySection query={query} />
          </Suspense>
        </Container>
      </Section>

      <CarsBottomCta />
    </>
  );
}
