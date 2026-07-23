'use client';

import { VEHICLE_LISTING_PAGE_SIZE_OPTIONS } from '@/features/vehicles/vehicle.constants';
import type { VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';
import { FilterSelect } from './filter-select';

interface VehiclePageSizeSelectProps {
  value: number;
  query: VehicleListingQuery;
  className?: string;
  id?: string;
}

function VehiclePageSizeSelect({
  value,
  query,
  className,
  id = 'vehicle-page-size',
}: VehiclePageSizeSelectProps) {
  const { setPageSize } = useVehicleListingParams();

  return (
    <div className={className}>
      <label htmlFor={id} className="text-text-muted mb-1.5 block text-xs font-medium">
        Show per page
      </label>
      <FilterSelect
        id={id}
        value={String(value)}
        onChange={(event) => setPageSize(Number.parseInt(event.target.value, 10), query)}
        aria-label="Results per page"
      >
        {VEHICLE_LISTING_PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
}

export { VehiclePageSizeSelect };
