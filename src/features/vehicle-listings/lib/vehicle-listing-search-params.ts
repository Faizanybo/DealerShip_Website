import type { VehicleListingQuery, VehicleStatus } from '@/features/vehicles/vehicle.types';
import {
  DEFAULT_VEHICLE_PAGE_SIZE,
  VEHICLE_LISTING_PAGE_SIZE_OPTIONS,
  VEHICLE_STATUSES,
} from '@/features/vehicles/vehicle.constants';
import { vehicleListingQuerySchema } from '@/features/vehicles/vehicle.schemas';

/** Default `/cars` listing scope — current forecourt stock (excludes sold). */
export const CARS_LISTING_DEFAULT_STATUS: VehicleStatus[] = [
  'AVAILABLE',
  'RESERVED',
  'COMING_SOON',
];

export const CARS_LISTING_DEFAULTS: VehicleListingQuery = {
  status: CARS_LISTING_DEFAULT_STATUS,
  sort: 'newest',
  page: 1,
  pageSize: DEFAULT_VEHICLE_PAGE_SIZE,
};

export type SearchParamsInput = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function emptyToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseIntSafe(value: string | undefined): number | undefined {
  if (!value?.trim()) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return undefined;
  return parsed;
}

function parseStatusParam(value: string | undefined): VehicleStatus | VehicleStatus[] | undefined {
  const raw = emptyToUndefined(value);
  if (!raw) return undefined;

  const parts = raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const valid = parts.filter((part): part is VehicleStatus =>
    VEHICLE_STATUSES.includes(part as VehicleStatus),
  );

  if (valid.length === 0) return undefined;
  if (valid.length === 1) return valid[0];
  return valid;
}

function normalizePageSize(pageSize: number | undefined): number {
  if (pageSize === undefined) return DEFAULT_VEHICLE_PAGE_SIZE;

  if ((VEHICLE_LISTING_PAGE_SIZE_OPTIONS as readonly number[]).includes(pageSize)) {
    return pageSize;
  }

  return DEFAULT_VEHICLE_PAGE_SIZE;
}

function normalizePriceBounds(query: VehicleListingQuery): VehicleListingQuery {
  if (
    query.minPrice !== undefined &&
    query.maxPrice !== undefined &&
    query.minPrice > query.maxPrice
  ) {
    const rest = { ...query };
    delete rest.maxPrice;
    return rest;
  }
  return query;
}

function statusMatchesDefault(
  status: VehicleListingQuery['status'],
  defaultStatus: VehicleListingQuery['status'],
): boolean {
  if (!status) return true;
  if (!defaultStatus) return false;

  const values = Array.isArray(status) ? status : [status];
  const defaults = Array.isArray(defaultStatus) ? defaultStatus : [defaultStatus];

  if (values.length !== defaults.length) return false;
  const sorted = [...values].sort();
  const sortedDefault = [...defaults].sort();
  return sorted.every((value, index) => value === sortedDefault[index]);
}

/**
 * Parse Next.js `searchParams` into a validated `VehicleListingQuery`.
 * Invalid or unknown values are dropped; empty strings behave as unset.
 */
function parseVehicleListingSearchParams(
  raw: SearchParamsInput,
  defaults: VehicleListingQuery = CARS_LISTING_DEFAULTS,
): VehicleListingQuery {
  const candidate = {
    make: emptyToUndefined(firstValue(raw.make)),
    model: emptyToUndefined(firstValue(raw.model)),
    fuelType: emptyToUndefined(firstValue(raw.fuelType)),
    transmission: emptyToUndefined(firstValue(raw.transmission)),
    bodyType: emptyToUndefined(firstValue(raw.bodyType)),
    status: parseStatusParam(firstValue(raw.status)),
    minPrice: parseIntSafe(firstValue(raw.minPrice)),
    maxPrice: parseIntSafe(firstValue(raw.maxPrice)),
    minYear: parseIntSafe(firstValue(raw.minYear)),
    maxMileage: parseIntSafe(firstValue(raw.maxMileage)),
    sort: emptyToUndefined(firstValue(raw.sort)),
    page: parseIntSafe(firstValue(raw.page)),
    pageSize: parseIntSafe(firstValue(raw.pageSize)),
  };

  const parsed = vehicleListingQuerySchema.safeParse(candidate);
  const fromUrl = parsed.success ? parsed.data : {};

  const merged: VehicleListingQuery = {
    ...defaults,
    ...fromUrl,
    status: fromUrl.status ?? defaults.status,
    sort: fromUrl.sort ?? defaults.sort,
    page: fromUrl.page ?? defaults.page,
    pageSize: normalizePageSize(fromUrl.pageSize ?? defaults.pageSize),
  };

  return normalizePriceBounds(merged);
}

/**
 * Serialize a query to URL search params — omits empty/default values.
 */
function serializeVehicleListingSearchParams(
  query: VehicleListingQuery,
  defaults: VehicleListingQuery = CARS_LISTING_DEFAULTS,
): URLSearchParams {
  const params = new URLSearchParams();

  if (query.make) params.set('make', query.make);
  if (query.model) params.set('model', query.model);
  if (query.fuelType) params.set('fuelType', query.fuelType);
  if (query.transmission) params.set('transmission', query.transmission);
  if (query.bodyType) params.set('bodyType', query.bodyType);

  if (query.status && !statusMatchesDefault(query.status, CARS_LISTING_DEFAULTS.status)) {
    const statuses = Array.isArray(query.status) ? query.status : [query.status];
    params.set('status', statuses.join(','));
  }

  if (query.minPrice !== undefined) params.set('minPrice', String(query.minPrice));
  if (query.maxPrice !== undefined) params.set('maxPrice', String(query.maxPrice));
  if (query.minYear !== undefined) params.set('minYear', String(query.minYear));
  if (query.maxMileage !== undefined) params.set('maxMileage', String(query.maxMileage));

  if (query.sort && query.sort !== (defaults.sort ?? 'newest')) {
    params.set('sort', query.sort);
  }

  if (query.page && query.page !== (defaults.page ?? 1)) {
    params.set('page', String(query.page));
  }

  if (query.pageSize && query.pageSize !== (defaults.pageSize ?? DEFAULT_VEHICLE_PAGE_SIZE)) {
    params.set('pageSize', String(query.pageSize));
  }

  return params;
}

function buildCarsListingHref(
  pathname: string,
  query: VehicleListingQuery,
  defaults?: VehicleListingQuery,
): string {
  const params = serializeVehicleListingSearchParams(query, defaults);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export {
  buildCarsListingHref,
  parseVehicleListingSearchParams,
  serializeVehicleListingSearchParams,
  statusMatchesDefault,
};
