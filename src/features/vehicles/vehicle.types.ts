import type {
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  VEHICLE_LIFECYCLE_STATES,
  VEHICLE_SORT_OPTIONS,
  VEHICLE_STATUSES,
} from './vehicle.constants';

export type VehicleLifecycleState = (typeof VEHICLE_LIFECYCLE_STATES)[number];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
export type FuelType = (typeof FUEL_TYPES)[number];
export type TransmissionType = (typeof TRANSMISSION_TYPES)[number];
export type BodyType = (typeof BODY_TYPES)[number];
export type VehicleSortOption = (typeof VEHICLE_SORT_OPTIONS)[number];

/** Normalized vehicle image — multiple images per vehicle supported. */
export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary: boolean;
}

/** Optional grouped equipment item for detail pages. */
export interface VehicleFeature {
  id: string;
  label: string;
  category: string | null;
}

/**
 * Internal domain model for a dealership vehicle.
 * Stable frontend contract — not shaped like an Auto Trader API payload.
 */
export interface Vehicle {
  id: string;
  /** Future Auto Trader stock identifier — mock values in development. */
  externalStockId: string;
  slug: string;
  make: string;
  model: string;
  derivative: string;
  registrationYear: number;
  /** Safely masked registration suitable for public display, or null if withheld. */
  registrationNumber: string | null;
  mileage: number;
  /** Current advertised price in GBP (whole pounds). */
  price: number;
  previousPrice: number | null;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  colour: string;
  engineSize: string | null;
  doors: number | null;
  seats: number | null;
  shortDescription: string;
  fullDescription: string | null;
  attentionGrabber: string | null;
  status: VehicleStatus;
  lifecycleState: VehicleLifecycleState;
  images: VehicleImage[];
  featuredImage: string;
  features: VehicleFeature[];
  isFeatured: boolean;
  isPublished: boolean;
  firstRegisteredAt: string | null;
  soldAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Query parameters for inventory listing — pure filter/sort/pagination contract. */
export interface VehicleListingQuery {
  status?: VehicleStatus | VehicleStatus[];
  make?: string;
  model?: string;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  bodyType?: BodyType;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
  sort?: VehicleSortOption;
  page?: number;
  pageSize?: number;
}

/** Paginated listing result returned by the repository/service layer. */
export interface PaginatedVehicleResult {
  items: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Aggregated filter metadata derived from the current inventory snapshot. */
export interface VehicleFilterOptions {
  makes: string[];
  models: string[];
  /** Models available per make — for dependent model dropdowns. */
  modelsByMake: Record<string, string[]>;
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  bodyTypes: BodyType[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
  mileageRange: { min: number; max: number };
}
