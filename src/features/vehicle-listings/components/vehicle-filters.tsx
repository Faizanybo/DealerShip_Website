'use client';

import type { VehicleFilterOptions, VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { getActiveFilterChips } from '../lib/vehicle-listing-labels';
import { ActiveFilterChips } from './active-filter-chips';
import { VehicleFilterBar } from './vehicle-filter-bar';
import { VehicleFilterSheet } from './vehicle-filter-sheet';
import { VehicleSortSelect } from './vehicle-sort-select';

interface VehicleFiltersProps {
  filterOptions: VehicleFilterOptions;
  query: VehicleListingQuery;
  resultCount: number;
}

/**
 * Inventory filter shell — desktop toolbar + mobile sheet + sort control.
 * URL is the source of truth; all data fetching stays on the server.
 */
function VehicleFilters({ filterOptions, query, resultCount }: VehicleFiltersProps) {
  const chips = getActiveFilterChips(query);
  const activeFilterCount = chips.filter((chip) => chip.key !== 'sort').length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <VehicleFilterSheet
            filterOptions={filterOptions}
            query={query}
            activeFilterCount={activeFilterCount}
            resultCount={resultCount}
          />
        </div>
        <VehicleSortSelect
          value={query.sort ?? 'newest'}
          className="w-full sm:w-52 lg:ml-auto lg:w-56"
        />
      </div>

      <VehicleFilterBar filterOptions={filterOptions} query={query} />

      <ActiveFilterChips chips={chips} />
    </div>
  );
}

export { VehicleFilters };
