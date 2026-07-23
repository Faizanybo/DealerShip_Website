import type {
  PaginatedVehicleResult,
  Vehicle,
  VehicleFilterOptions,
  VehicleListingQuery,
} from './vehicle.types';

/**
 * Data-access boundary for vehicle inventory.
 * Implementations may read from mock data today and Prisma tomorrow.
 */
export interface VehicleRepository {
  getVehicles(query?: VehicleListingQuery): Promise<PaginatedVehicleResult>;
  getFeaturedVehicles(limit?: number): Promise<Vehicle[]>;
  getRecentlySoldVehicles(limit?: number): Promise<Vehicle[]>;
  getVehicleBySlug(slug: string): Promise<Vehicle | null>;
  getVehicleFilterOptions(): Promise<VehicleFilterOptions>;
}
