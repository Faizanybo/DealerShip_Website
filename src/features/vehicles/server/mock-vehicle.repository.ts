import 'server-only';

import { vehicleListingQuerySchema } from '../vehicle.schemas';
import { applyVehicleListingQuery, buildVehicleFilterOptions } from '../vehicle.query';
import type { VehicleRepository } from '../vehicle.repository';
import type {
  PaginatedVehicleResult,
  Vehicle,
  VehicleFilterOptions,
  VehicleListingQuery,
} from '../vehicle.types';

import { getValidatedMockVehicles } from './mock-vehicles.data';

class MockVehicleRepository implements VehicleRepository {
  private readonly vehicles: Vehicle[];

  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  async getVehicles(rawQuery: VehicleListingQuery = {}): Promise<PaginatedVehicleResult> {
    const query = vehicleListingQuerySchema.parse(rawQuery);
    return applyVehicleListingQuery(this.vehicles, query);
  }

  async getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
    const featured = this.vehicles
      .filter(
        (vehicle) => vehicle.isPublished && vehicle.isFeatured && vehicle.status === 'AVAILABLE',
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return featured.slice(0, limit);
  }

  async getRecentlySoldVehicles(limit = 6): Promise<Vehicle[]> {
    const sold = this.vehicles
      .filter((vehicle) => vehicle.isPublished && vehicle.status === 'SOLD' && vehicle.soldAt)
      .sort((a, b) => new Date(b.soldAt!).getTime() - new Date(a.soldAt!).getTime());

    return sold.slice(0, limit);
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle | null> {
    const vehicle = this.vehicles.find((entry) => entry.slug === slug);
    if (!vehicle || !vehicle.isPublished) return null;
    return vehicle;
  }

  async getVehicleFilterOptions(): Promise<VehicleFilterOptions> {
    return buildVehicleFilterOptions(this.vehicles);
  }
}

function createMockVehicleRepository(): VehicleRepository {
  return new MockVehicleRepository(getValidatedMockVehicles());
}

export { createMockVehicleRepository, MockVehicleRepository };
