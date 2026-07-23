import { DEFAULT_VEHICLE_PAGE_SIZE, MAX_VEHICLE_PAGE_SIZE } from './vehicle.constants';
import type {
  PaginatedVehicleResult,
  Vehicle,
  VehicleFilterOptions,
  VehicleListingQuery,
} from './vehicle.types';

function matchesStatus(vehicle: Vehicle, status: VehicleListingQuery['status']): boolean {
  if (!status) return true;
  const statuses = Array.isArray(status) ? status : [status];
  return statuses.includes(vehicle.status);
}

function compareVehicles(a: Vehicle, b: Vehicle, sort: VehicleListingQuery['sort']): number {
  switch (sort ?? 'newest') {
    case 'price_asc':
      return a.price - b.price;
    case 'price_desc':
      return b.price - a.price;
    case 'mileage_asc':
      return a.mileage - b.mileage;
    case 'year_desc':
      return b.registrationYear - a.registrationYear;
    case 'newest':
    default:
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }
}

/**
 * Pure, deterministic filter/sort/pagination for vehicle listings.
 * Shared by mock and future Prisma repositories.
 */
function applyVehicleListingQuery(
  vehicles: readonly Vehicle[],
  rawQuery: VehicleListingQuery = {},
): PaginatedVehicleResult {
  const page = rawQuery.page ?? 1;
  const pageSize = Math.min(rawQuery.pageSize ?? DEFAULT_VEHICLE_PAGE_SIZE, MAX_VEHICLE_PAGE_SIZE);
  const sort = rawQuery.sort ?? 'newest';

  const filtered = vehicles.filter((vehicle) => {
    if (!vehicle.isPublished) return false;
    if (!matchesStatus(vehicle, rawQuery.status)) return false;
    if (rawQuery.make && vehicle.make !== rawQuery.make) return false;
    if (rawQuery.model && vehicle.model !== rawQuery.model) return false;
    if (rawQuery.fuelType && vehicle.fuelType !== rawQuery.fuelType) return false;
    if (rawQuery.transmission && vehicle.transmission !== rawQuery.transmission) return false;
    if (rawQuery.bodyType && vehicle.bodyType !== rawQuery.bodyType) return false;
    if (rawQuery.minPrice !== undefined && vehicle.price < rawQuery.minPrice) return false;
    if (rawQuery.maxPrice !== undefined && vehicle.price > rawQuery.maxPrice) return false;
    if (rawQuery.minYear !== undefined && vehicle.registrationYear < rawQuery.minYear) return false;
    if (rawQuery.maxMileage !== undefined && vehicle.mileage > rawQuery.maxMileage) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => compareVehicles(a, b, sort));
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return {
    items,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

function buildVehicleFilterOptions(vehicles: readonly Vehicle[]): VehicleFilterOptions {
  const published = vehicles.filter((vehicle) => vehicle.isPublished);

  const makes = [...new Set(published.map((vehicle) => vehicle.make))].sort();
  const models = [...new Set(published.map((vehicle) => vehicle.model))].sort();
  const fuelTypes = [...new Set(published.map((vehicle) => vehicle.fuelType))].sort();
  const transmissions = [...new Set(published.map((vehicle) => vehicle.transmission))].sort();
  const bodyTypes = [...new Set(published.map((vehicle) => vehicle.bodyType))].sort();

  const prices = published.map((vehicle) => vehicle.price);
  const years = published.map((vehicle) => vehicle.registrationYear);
  const mileages = published.map((vehicle) => vehicle.mileage);

  return {
    makes,
    models,
    fuelTypes,
    transmissions,
    bodyTypes,
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
    yearRange: {
      min: years.length ? Math.min(...years) : new Date().getFullYear(),
      max: years.length ? Math.max(...years) : new Date().getFullYear(),
    },
    mileageRange: {
      min: mileages.length ? Math.min(...mileages) : 0,
      max: mileages.length ? Math.max(...mileages) : 0,
    },
  };
}

export { applyVehicleListingQuery, buildVehicleFilterOptions };
