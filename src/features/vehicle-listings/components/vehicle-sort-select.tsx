'use client';

import { VEHICLE_SORT_LABELS, VEHICLE_SORT_OPTIONS } from '@/features/vehicles/vehicle.constants';
import type { VehicleListingQuery, VehicleSortOption } from '@/features/vehicles/vehicle.types';

import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';
import { FilterSelect } from './filter-select';

interface VehicleSortSelectProps {
  value: VehicleSortOption;
  className?: string;
  id?: string;
}

function VehicleSortSelect({ value, className, id = 'vehicle-sort' }: VehicleSortSelectProps) {
  const { applyQuery } = useVehicleListingParams();

  return (
    <div className={className}>
      <label htmlFor={id} className="text-text-muted mb-1.5 block text-xs font-medium">
        Sort by
      </label>
      <FilterSelect
        id={id}
        value={value}
        onChange={(event) =>
          applyQuery({ sort: event.target.value as VehicleListingQuery['sort'] })
        }
        aria-label="Sort vehicles"
      >
        {VEHICLE_SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {VEHICLE_SORT_LABELS[option]}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
}

export { VehicleSortSelect };
