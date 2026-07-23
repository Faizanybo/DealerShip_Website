import type { VehicleLifecycleState, VehicleStatus } from './vehicle.types';

/** Internal lifecycle values — future Auto Trader stock states (not API field names). */
export const VEHICLE_LIFECYCLE_STATES = [
  'DUE_IN',
  'FORECOURT',
  'SALE_IN_PROGRESS',
  'SOLD',
  'WASTEBIN',
  'DELETED',
] as const;

/** Public-facing inventory statuses used by the website. */
export const VEHICLE_STATUSES = ['AVAILABLE', 'RESERVED', 'COMING_SOON', 'SOLD', 'HIDDEN'] as const;

export const FUEL_TYPES = ['PETROL', 'DIESEL', 'HYBRID', 'PLUG_IN_HYBRID', 'ELECTRIC'] as const;

export const TRANSMISSION_TYPES = ['MANUAL', 'AUTOMATIC'] as const;

export const BODY_TYPES = [
  'HATCHBACK',
  'SALOON',
  'ESTATE',
  'COUPE',
  'CONVERTIBLE',
  'SUV',
  'MPV',
  'PICKUP',
] as const;

export const VEHICLE_SORT_OPTIONS = [
  'newest',
  'price_asc',
  'price_desc',
  'mileage_asc',
  'year_desc',
] as const;

/** Default page size for vehicle listing queries. */
export const DEFAULT_VEHICLE_PAGE_SIZE = 12;

/** Maximum page size accepted by the mock repository. */
export const MAX_VEHICLE_PAGE_SIZE = 48;

/**
 * Expected future mapping from Auto Trader lifecycle states to public status.
 * Exact API values will be confirmed against official documentation.
 */
export const LIFECYCLE_TO_STATUS_MAP: Record<VehicleLifecycleState, VehicleStatus> = {
  DUE_IN: 'COMING_SOON',
  FORECOURT: 'AVAILABLE',
  SALE_IN_PROGRESS: 'RESERVED',
  SOLD: 'SOLD',
  WASTEBIN: 'HIDDEN',
  DELETED: 'HIDDEN',
};

/** UI labels — decoupled from stored enum values. */
export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  AVAILABLE: 'Available',
  RESERVED: 'Reserved',
  COMING_SOON: 'Coming soon',
  SOLD: 'Sold',
  HIDDEN: 'Hidden',
};

export const FUEL_TYPE_LABELS: Record<(typeof FUEL_TYPES)[number], string> = {
  PETROL: 'Petrol',
  DIESEL: 'Diesel',
  HYBRID: 'Hybrid',
  PLUG_IN_HYBRID: 'Plug-in hybrid',
  ELECTRIC: 'Electric',
};

export const TRANSMISSION_LABELS: Record<(typeof TRANSMISSION_TYPES)[number], string> = {
  MANUAL: 'Manual',
  AUTOMATIC: 'Automatic',
};

export const BODY_TYPE_LABELS: Record<(typeof BODY_TYPES)[number], string> = {
  HATCHBACK: 'Hatchback',
  SALOON: 'Saloon',
  ESTATE: 'Estate',
  COUPE: 'Coupe',
  CONVERTIBLE: 'Convertible',
  SUV: 'SUV',
  MPV: 'MPV',
  PICKUP: 'Pickup',
};

export const VEHICLE_SORT_LABELS: Record<(typeof VEHICLE_SORT_OPTIONS)[number], string> = {
  newest: 'Newest first',
  price_asc: 'Price: low to high',
  price_desc: 'Price: high to low',
  mileage_asc: 'Mileage: low to high',
  year_desc: 'Year: newest first',
};

/** Marker appended to mock vehicle descriptions in development. */
export const MOCK_VEHICLE_DISCLAIMER =
  'Development mock vehicle — fictional listing for UI and integration testing only.';
