import type { Metadata } from 'next';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Metadata as MetadataText } from '@/components/ui/typography';
import { MAX_VEHICLE_PAGE_SIZE } from '@/features/vehicles/vehicle.constants';
import { VehicleInventoryGrid } from '@/features/vehicles/components';
import { siteConfig } from '@/config/site';
import { getVehicles } from '@/services/vehicle.service';

import { CarsBottomCta } from './_components/cars-bottom-cta';
import { CarsEmptyState } from './_components/cars-empty-state';
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

/**
 * Current-stock listing (Phase 2.2.3). Server-rendered inventory from
 * `VehicleService` — filters, sorting controls, and pagination arrive in
 * later subphases.
 */
export default async function CarsPage() {
  const listing = await getVehicles({
    status: ['AVAILABLE', 'RESERVED', 'COMING_SOON'],
    sort: 'newest',
    pageSize: MAX_VEHICLE_PAGE_SIZE,
  });

  const { items, total } = listing;
  const vehicleWord = total === 1 ? 'vehicle' : 'vehicles';

  return (
    <>
      <CarsPageHero />

      <Section spacing="normal" aria-labelledby="cars-inventory-heading">
        <Container size="wide" className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="cars-inventory-heading" className="sr-only">
                Vehicle inventory
              </h2>
              <p
                className="text-text-primary text-lg font-semibold tracking-tight sm:text-xl"
                aria-live="polite"
              >
                {total} {vehicleWord} available
              </p>
              <MetadataText as="p">All vehicles · Newest first</MetadataText>
            </div>
          </div>

          {total === 0 ? <CarsEmptyState /> : <VehicleInventoryGrid vehicles={items} />}
        </Container>
      </Section>

      <CarsBottomCta />
    </>
  );
}
