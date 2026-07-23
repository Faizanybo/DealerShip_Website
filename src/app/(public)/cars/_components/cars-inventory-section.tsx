import { redirect } from 'next/navigation';

import { Metadata as MetadataText } from '@/components/ui/typography';
import { VehicleInventoryGrid } from '@/features/vehicles/components';
import type { VehicleListingQuery } from '@/features/vehicles/vehicle.types';
import {
  buildCarsListingHref,
  getInventorySummaryHeading,
  getInventorySummaryMeta,
  hasActiveInventoryFilters,
  serializeVehicleListingSearchParams,
  VehicleInventoryResults,
  VehiclePageSizeSelect,
  VehiclePagination,
} from '@/features/vehicle-listings';
import { getVehicles } from '@/services/vehicle.service';

import { CarsEmptyState } from './cars-empty-state';
import { CarsFilteredEmptyState } from './cars-filtered-empty-state';

interface CarsInventorySectionProps {
  query: VehicleListingQuery;
}

/**
 * Server-rendered inventory block — paginated results, summary, and pagination.
 * Wrapped in Suspense so filter/page URL changes show a stable grid skeleton.
 */
async function CarsInventorySection({ query }: CarsInventorySectionProps) {
  const listing = await getVehicles(query);

  if ((query.page ?? 1) !== listing.page) {
    redirect(
      buildCarsListingHref('/cars', {
        ...query,
        page: listing.page,
        pageSize: listing.pageSize,
      }),
    );
  }

  const { items, total, page, pageSize, totalPages } = listing;
  const summaryHeading = getInventorySummaryHeading(listing, query);
  const summaryMeta = getInventorySummaryMeta(query);
  const queryKey = serializeVehicleListingSearchParams({
    ...query,
    page,
    pageSize,
  }).toString();

  if (total === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-1">
            <p
              className="text-text-primary text-lg font-semibold tracking-tight sm:text-xl"
              aria-live="polite"
            >
              {summaryHeading}
            </p>
            <MetadataText as="p">{summaryMeta}</MetadataText>
          </div>
        </div>

        {hasActiveInventoryFilters(query) ? <CarsFilteredEmptyState /> : <CarsEmptyState />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p
            className="text-text-primary text-lg font-semibold tracking-tight sm:text-xl"
            aria-live="polite"
          >
            {summaryHeading}
          </p>
          <MetadataText as="p">{summaryMeta}</MetadataText>
        </div>

        <VehiclePageSizeSelect
          value={pageSize}
          query={{ ...query, page, pageSize }}
          className="w-full shrink-0 sm:w-36"
        />
      </div>

      <VehicleInventoryResults queryKey={queryKey}>
        <VehicleInventoryGrid vehicles={items} />
      </VehicleInventoryResults>

      <VehiclePagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        query={{ ...query, page, pageSize }}
      />
    </div>
  );
}

export { CarsInventorySection };
