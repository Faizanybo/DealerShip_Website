import {
  BODY_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  LIFECYCLE_TO_STATUS_MAP,
  TRANSMISSION_LABELS,
  VEHICLE_STATUS_LABELS,
} from './vehicle.constants';
import type {
  BodyType,
  FuelType,
  TransmissionType,
  Vehicle,
  VehicleLifecycleState,
  VehicleStatus,
} from './vehicle.types';

const GBP_FORMATTER = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const MILEAGE_FORMATTER = new Intl.NumberFormat('en-GB');

/** Format a whole-pound price for UK display, e.g. "£32,995". */
function formatVehiclePrice(price: number): string {
  return GBP_FORMATTER.format(price);
}

/** Card-safe price label — supports future nullable pricing without domain changes. */
function formatVehiclePriceDisplay(price: number | null | undefined): string {
  if (price == null || price < 0) return 'Price on request';
  return formatVehiclePrice(price);
}

/** Format sold date for sold cards, e.g. "14 Feb 2026". */
function formatSoldDate(soldAt: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(soldAt));
}

/** Format mileage with thousands separators and a miles suffix. */
function formatVehicleMileage(mileage: number): string {
  return `${MILEAGE_FORMATTER.format(mileage)} miles`;
}

/** Format registration year for cards and headings. */
function formatRegistrationYear(year: number): string {
  return String(year);
}

/**
 * Normalize a slug segment for URLs — lowercase kebab-case without leading/trailing hyphens.
 * Used when generating slugs from make/model during future sync.
 */
function normalizeVehicleSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Concise display title, e.g. "2021 BMW 330i M Sport". */
function formatVehicleDisplayName(
  vehicle: Pick<Vehicle, 'registrationYear' | 'make' | 'derivative'>,
): string {
  return `${vehicle.registrationYear} ${vehicle.make} ${vehicle.derivative}`;
}

/** Longer listing title including model line when derivative omits it. */
function formatVehicleListingTitle(
  vehicle: Pick<Vehicle, 'registrationYear' | 'make' | 'model' | 'derivative'>,
): string {
  const derivativeIncludesModel = vehicle.derivative
    .toLowerCase()
    .includes(vehicle.model.toLowerCase());

  if (derivativeIncludesModel) {
    return `${vehicle.registrationYear} ${vehicle.make} ${vehicle.derivative}`;
  }

  return `${vehicle.registrationYear} ${vehicle.make} ${vehicle.model} ${vehicle.derivative}`;
}

function getVehicleStatusLabel(status: VehicleStatus): string {
  return VEHICLE_STATUS_LABELS[status];
}

function getFuelTypeLabel(fuelType: FuelType): string {
  return FUEL_TYPE_LABELS[fuelType];
}

function getTransmissionLabel(transmission: TransmissionType): string {
  return TRANSMISSION_LABELS[transmission];
}

function getBodyTypeLabel(bodyType: BodyType): string {
  return BODY_TYPE_LABELS[bodyType];
}

/** Map internal lifecycle state to public status (future Auto Trader mapper helper). */
function mapLifecycleStateToStatus(lifecycleState: VehicleLifecycleState): VehicleStatus {
  return LIFECYCLE_TO_STATUS_MAP[lifecycleState];
}

/**
 * Mask a UK registration for public display, e.g. "AB23 XYZ" → "AB23 ***".
 * Returns null when input is null/empty.
 */
function maskRegistrationNumber(registration: string | null): string | null {
  if (!registration) return null;
  const normalized = registration.replace(/\s+/g, ' ').trim().toUpperCase();
  const parts = normalized.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ***`;
  }
  if (normalized.length <= 4) return `${normalized} ***`;
  return `${normalized.slice(0, 4)} ***`;
}

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
};
