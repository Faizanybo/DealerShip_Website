import 'server-only';

import { createMockVehicleRepository } from '@/features/vehicles/server/mock-vehicle.repository';
import type { VehicleRepository } from '@/features/vehicles/vehicle.repository';
import type {
  PaginatedVehicleResult,
  Vehicle,
  VehicleFilterOptions,
  VehicleListingQuery,
} from '@/features/vehicles/vehicle.types';

/**
 * Server-side vehicle service — the public entry point for pages and Server Components.
 * Swap the repository implementation when Prisma replaces mock data.
 */
const vehicleRepository: VehicleRepository = createMockVehicleRepository();

async function getVehicles(query?: VehicleListingQuery): Promise<PaginatedVehicleResult> {
  return vehicleRepository.getVehicles(query);
}

async function getFeaturedVehicles(limit?: number): Promise<Vehicle[]> {
  return vehicleRepository.getFeaturedVehicles(limit);
}

async function getRecentlySoldVehicles(limit?: number): Promise<Vehicle[]> {
  return vehicleRepository.getRecentlySoldVehicles(limit);
}

async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return vehicleRepository.getVehicleBySlug(slug);
}

async function getVehicleFilterOptions(
  scope?: Pick<VehicleListingQuery, 'status'>,
): Promise<VehicleFilterOptions> {
  return vehicleRepository.getVehicleFilterOptions(scope);
}

export {
  getFeaturedVehicles,
  getRecentlySoldVehicles,
  getVehicleBySlug,
  getVehicleFilterOptions,
  getVehicles,
};
