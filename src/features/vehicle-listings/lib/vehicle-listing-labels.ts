import {
  BODY_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  TRANSMISSION_LABELS,
  VEHICLE_SORT_LABELS,
  VEHICLE_STATUS_LABELS,
} from '@/features/vehicles/vehicle.constants';
import { formatVehiclePrice } from '@/features/vehicles/vehicle.utils';
import type { VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { CARS_LISTING_DEFAULTS, statusMatchesDefault } from './vehicle-listing-search-params';

export interface ActiveFilterChip {
  key: string;
  label: string;
  /** Query keys cleared when this chip is removed. */
  clearKeys: Array<keyof VehicleListingQuery>;
}

function getActiveFilterChips(query: VehicleListingQuery): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (query.make) {
    chips.push({ key: 'make', label: query.make, clearKeys: ['make', 'model'] });
  }

  if (query.model) {
    chips.push({ key: 'model', label: query.model, clearKeys: ['model'] });
  }

  if (query.fuelType) {
    chips.push({
      key: 'fuelType',
      label: FUEL_TYPE_LABELS[query.fuelType],
      clearKeys: ['fuelType'],
    });
  }

  if (query.transmission) {
    chips.push({
      key: 'transmission',
      label: TRANSMISSION_LABELS[query.transmission],
      clearKeys: ['transmission'],
    });
  }

  if (query.bodyType) {
    chips.push({
      key: 'bodyType',
      label: BODY_TYPE_LABELS[query.bodyType],
      clearKeys: ['bodyType'],
    });
  }

  if (query.status && !statusMatchesDefault(query.status, CARS_LISTING_DEFAULTS.status)) {
    const statuses = Array.isArray(query.status) ? query.status : [query.status];
    if (statuses.length === 1) {
      chips.push({
        key: 'status',
        label: VEHICLE_STATUS_LABELS[statuses[0]!],
        clearKeys: ['status'],
      });
    }
  }

  if (query.minPrice !== undefined) {
    chips.push({
      key: 'minPrice',
      label: `From ${formatVehiclePrice(query.minPrice)}`,
      clearKeys: ['minPrice'],
    });
  }

  if (query.maxPrice !== undefined) {
    chips.push({
      key: 'maxPrice',
      label: `Up to ${formatVehiclePrice(query.maxPrice)}`,
      clearKeys: ['maxPrice'],
    });
  }

  if (query.minYear !== undefined) {
    chips.push({
      key: 'minYear',
      label: `From ${query.minYear}`,
      clearKeys: ['minYear'],
    });
  }

  if (query.maxMileage !== undefined) {
    chips.push({
      key: 'maxMileage',
      label: `Up to ${query.maxMileage.toLocaleString('en-GB')} miles`,
      clearKeys: ['maxMileage'],
    });
  }

  if (query.sort && query.sort !== 'newest') {
    chips.push({
      key: 'sort',
      label: VEHICLE_SORT_LABELS[query.sort],
      clearKeys: ['sort'],
    });
  }

  return chips;
}

function hasActiveFilters(query: VehicleListingQuery): boolean {
  return getActiveFilterChips(query).length > 0;
}

/** Inventory filters only — excludes non-default sort from "filtered" summaries. */
function hasActiveInventoryFilters(query: VehicleListingQuery): boolean {
  return getActiveFilterChips(query).some((chip) => chip.key !== 'sort');
}

function getSortLabel(sort: VehicleListingQuery['sort']): string {
  return VEHICLE_SORT_LABELS[sort ?? 'newest'];
}

function getInventorySummaryHeading(total: number, query: VehicleListingQuery): string {
  const vehicleWord = total === 1 ? 'vehicle' : 'vehicles';

  if (total === 0 && hasActiveInventoryFilters(query)) {
    return 'No vehicles match your current filters';
  }

  if (hasActiveInventoryFilters(query)) {
    return `${total} ${vehicleWord} matching your filters`;
  }

  return `${total} ${vehicleWord}`;
}

function getInventorySummaryMeta(query: VehicleListingQuery): string {
  const sortLabel = getSortLabel(query.sort);

  if (hasActiveInventoryFilters(query)) {
    return `Filtered results · ${sortLabel}`;
  }

  return `All vehicles · ${sortLabel}`;
}

export {
  getActiveFilterChips,
  getInventorySummaryHeading,
  getInventorySummaryMeta,
  getSortLabel,
  hasActiveFilters,
  hasActiveInventoryFilters,
};
