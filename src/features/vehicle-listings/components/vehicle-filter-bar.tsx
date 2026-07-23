'use client';

import {
  fieldsToQueryPatch,
  queryValuesToFields,
  VehicleFilterFields,
  type VehicleFilterFieldValues,
} from './vehicle-filter-fields';
import { CARS_LISTING_DEFAULTS } from '../lib/vehicle-listing-search-params';
import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';
import type { VehicleFilterOptions, VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { ClearFiltersButton } from './clear-filters-button';

interface VehicleFilterBarProps {
  filterOptions: VehicleFilterOptions;
  query: VehicleListingQuery;
}

/**
 * Desktop filter toolbar — updates URL immediately on each change.
 */
function VehicleFilterBar({ filterOptions, query }: VehicleFilterBarProps) {
  const { applyQuery } = useVehicleListingParams();
  const values = queryValuesToFields(query);

  const commit = (next: VehicleFilterFieldValues) => {
    applyQuery(fieldsToQueryPatch(next, { status: CARS_LISTING_DEFAULTS.status }));
  };

  return (
    <div className="hidden flex-col gap-3 lg:flex">
      <VehicleFilterFields
        filterOptions={filterOptions}
        values={values}
        onChange={commit}
        layout="grid"
        idPrefix="desktop-filter"
      />
      <div className="flex justify-end">
        <ClearFiltersButton variant="ghost" />
      </div>
    </div>
  );
}

export { VehicleFilterBar };
