export type {
  BodyType,
  FuelType,
  PaginatedVehicleResult,
  TransmissionType,
  Vehicle,
  VehicleFeature,
  VehicleFilterOptions,
  VehicleImage,
  VehicleLifecycleState,
  VehicleListingQuery,
  VehicleSortOption,
  VehicleStatus,
} from './vehicle.types';

export type { VehicleRepository } from './vehicle.repository';

export {
  BODY_TYPE_LABELS,
  BODY_TYPES,
  DEFAULT_VEHICLE_PAGE_SIZE,
  FUEL_TYPE_LABELS,
  FUEL_TYPES,
  LIFECYCLE_TO_STATUS_MAP,
  MAX_VEHICLE_PAGE_SIZE,
  MOCK_VEHICLE_DISCLAIMER,
  TRANSMISSION_LABELS,
  TRANSMISSION_TYPES,
  VEHICLE_LIFECYCLE_STATES,
  VEHICLE_SORT_LABELS,
  VEHICLE_SORT_OPTIONS,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUSES,
} from './vehicle.constants';

export {
  formatRegistrationYear,
  formatSoldDate,
  formatVehicleDisplayName,
  formatVehicleListingTitle,
  formatVehicleMileage,
  formatVehiclePrice,
  formatVehiclePriceDisplay,
  getBodyTypeLabel,
  getFuelTypeLabel,
  getTransmissionLabel,
  getVehicleStatusLabel,
  mapLifecycleStateToStatus,
  maskRegistrationNumber,
  normalizeVehicleSlug,
} from './vehicle.utils';

export { applyVehicleListingQuery, buildVehicleFilterOptions } from './vehicle.query';

export {
  vehicleFeatureSchema,
  vehicleImageSchema,
  vehicleListingQuerySchema,
  vehicleListSchema,
  vehicleSchema,
} from './vehicle.schemas';
