'use client';

import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import {
  BODY_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  TRANSMISSION_LABELS,
  VEHICLE_STATUS_LABELS,
} from '@/features/vehicles/vehicle.constants';
import type { VehicleFilterOptions, VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { FilterSelect } from './filter-select';

export interface VehicleFilterFieldValues {
  make?: string;
  model?: string;
  fuelType?: VehicleListingQuery['fuelType'] | '';
  transmission?: VehicleListingQuery['transmission'] | '';
  bodyType?: VehicleListingQuery['bodyType'] | '';
  status?: VehicleListingQuery['status'] | '';
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxMileage?: string;
}

interface VehicleFilterFieldsProps {
  filterOptions: VehicleFilterOptions;
  values: VehicleFilterFieldValues;
  onChange: (values: VehicleFilterFieldValues) => void;
  /** Vertical stack for mobile sheet; compact grid for desktop toolbar. */
  layout?: 'stack' | 'grid';
  idPrefix?: string;
}

function queryValuesToFields(query: VehicleListingQuery): VehicleFilterFieldValues {
  const status = query.status;
  const statusValue = Array.isArray(status) ? '' : (status ?? '');

  return {
    make: query.make ?? '',
    model: query.model ?? '',
    fuelType: query.fuelType ?? '',
    transmission: query.transmission ?? '',
    bodyType: query.bodyType ?? '',
    status: statusValue,
    minPrice: query.minPrice !== undefined ? String(query.minPrice) : '',
    maxPrice: query.maxPrice !== undefined ? String(query.maxPrice) : '',
    minYear: query.minYear !== undefined ? String(query.minYear) : '',
    maxMileage: query.maxMileage !== undefined ? String(query.maxMileage) : '',
  };
}

function fieldsToQueryPatch(
  fields: VehicleFilterFieldValues,
  defaults: { status?: VehicleListingQuery['status'] },
): Partial<VehicleListingQuery> {
  const patch: Partial<VehicleListingQuery> = {};

  patch.make = fields.make || undefined;
  patch.model = fields.model || undefined;
  patch.fuelType = fields.fuelType || undefined;
  patch.transmission = fields.transmission || undefined;
  patch.bodyType = fields.bodyType || undefined;

  if (fields.status) {
    patch.status = fields.status as VehicleListingQuery['status'];
  } else {
    patch.status = defaults.status;
  }

  const minPrice = fields.minPrice ? Number.parseInt(fields.minPrice, 10) : undefined;
  const maxPrice = fields.maxPrice ? Number.parseInt(fields.maxPrice, 10) : undefined;
  const minYear = fields.minYear ? Number.parseInt(fields.minYear, 10) : undefined;
  const maxMileage = fields.maxMileage ? Number.parseInt(fields.maxMileage, 10) : undefined;

  patch.minPrice = Number.isFinite(minPrice!) ? minPrice : undefined;
  patch.maxPrice = Number.isFinite(maxPrice!) ? maxPrice : undefined;
  patch.minYear = Number.isFinite(minYear!) ? minYear : undefined;
  patch.maxMileage = Number.isFinite(maxMileage!) ? maxMileage : undefined;

  if (
    patch.minPrice !== undefined &&
    patch.maxPrice !== undefined &&
    patch.minPrice > patch.maxPrice
  ) {
    delete patch.maxPrice;
  }

  return patch;
}

function VehicleFilterFields({
  filterOptions,
  values,
  onChange,
  layout = 'stack',
  idPrefix = 'filter',
}: VehicleFilterFieldsProps) {
  const models =
    (values.make ? filterOptions.modelsByMake[values.make] : undefined) ?? filterOptions.models;

  const wrapperClass =
    layout === 'grid'
      ? 'grid grid-cols-2 gap-3 xl:grid-cols-4 2xl:grid-cols-6'
      : 'flex flex-col gap-4';

  const update = (partial: Partial<VehicleFilterFieldValues>) => {
    const next = { ...values, ...partial };
    if (partial.make !== undefined && partial.make !== values.make) {
      next.model = '';
    }
    onChange(next);
  };

  return (
    <div className={wrapperClass}>
      <FormField label="Make" id={`${idPrefix}-make`}>
        <FilterSelect
          id={`${idPrefix}-make`}
          value={values.make ?? ''}
          onChange={(event) => update({ make: event.target.value })}
        >
          <option value="">Any make</option>
          {filterOptions.makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </FilterSelect>
      </FormField>

      <FormField label="Model" id={`${idPrefix}-model`}>
        <FilterSelect
          id={`${idPrefix}-model`}
          value={values.model ?? ''}
          onChange={(event) => update({ model: event.target.value })}
          disabled={!values.make && filterOptions.makes.length > 0}
        >
          <option value="">Any model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </FilterSelect>
      </FormField>

      <FormField label="Min price (£)" id={`${idPrefix}-minPrice`}>
        <Input
          id={`${idPrefix}-minPrice`}
          type="number"
          inputMode="numeric"
          min={0}
          step={500}
          placeholder="Any"
          value={values.minPrice ?? ''}
          onChange={(event) => update({ minPrice: event.target.value })}
          className="h-11 md:h-10"
        />
      </FormField>

      <FormField label="Max price (£)" id={`${idPrefix}-maxPrice`}>
        <Input
          id={`${idPrefix}-maxPrice`}
          type="number"
          inputMode="numeric"
          min={0}
          step={500}
          placeholder="Any"
          value={values.maxPrice ?? ''}
          onChange={(event) => update({ maxPrice: event.target.value })}
          className="h-11 md:h-10"
        />
      </FormField>

      <FormField label="Fuel type" id={`${idPrefix}-fuel`}>
        <FilterSelect
          id={`${idPrefix}-fuel`}
          value={values.fuelType ?? ''}
          onChange={(event) =>
            update({ fuelType: event.target.value as VehicleFilterFieldValues['fuelType'] })
          }
        >
          <option value="">Any fuel</option>
          {filterOptions.fuelTypes.map((fuelType) => (
            <option key={fuelType} value={fuelType}>
              {FUEL_TYPE_LABELS[fuelType]}
            </option>
          ))}
        </FilterSelect>
      </FormField>

      <FormField label="Transmission" id={`${idPrefix}-transmission`}>
        <FilterSelect
          id={`${idPrefix}-transmission`}
          value={values.transmission ?? ''}
          onChange={(event) =>
            update({
              transmission: event.target.value as VehicleFilterFieldValues['transmission'],
            })
          }
        >
          <option value="">Any transmission</option>
          {filterOptions.transmissions.map((transmission) => (
            <option key={transmission} value={transmission}>
              {TRANSMISSION_LABELS[transmission]}
            </option>
          ))}
        </FilterSelect>
      </FormField>

      <FormField label="Body type" id={`${idPrefix}-body`}>
        <FilterSelect
          id={`${idPrefix}-body`}
          value={values.bodyType ?? ''}
          onChange={(event) =>
            update({ bodyType: event.target.value as VehicleFilterFieldValues['bodyType'] })
          }
        >
          <option value="">Any body type</option>
          {filterOptions.bodyTypes.map((bodyType) => (
            <option key={bodyType} value={bodyType}>
              {BODY_TYPE_LABELS[bodyType]}
            </option>
          ))}
        </FilterSelect>
      </FormField>

      {layout === 'stack' ? (
        <FormField label="Status" id={`${idPrefix}-status`}>
          <FilterSelect
            id={`${idPrefix}-status`}
            value={typeof values.status === 'string' ? values.status : ''}
            onChange={(event) =>
              update({ status: event.target.value as VehicleFilterFieldValues['status'] })
            }
          >
            <option value="">All current stock</option>
            {(['AVAILABLE', 'RESERVED', 'COMING_SOON'] as const).map((status) => (
              <option key={status} value={status}>
                {VEHICLE_STATUS_LABELS[status]}
              </option>
            ))}
          </FilterSelect>
        </FormField>
      ) : null}

      <FormField label="Min year" id={`${idPrefix}-minYear`}>
        <Input
          id={`${idPrefix}-minYear`}
          type="number"
          inputMode="numeric"
          min={filterOptions.yearRange.min}
          max={filterOptions.yearRange.max}
          step={1}
          placeholder="Any"
          value={values.minYear ?? ''}
          onChange={(event) => update({ minYear: event.target.value })}
          className="h-11 md:h-10"
        />
      </FormField>

      <FormField label="Max mileage" id={`${idPrefix}-maxMileage`}>
        <Input
          id={`${idPrefix}-maxMileage`}
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          placeholder="Any"
          value={values.maxMileage ?? ''}
          onChange={(event) => update({ maxMileage: event.target.value })}
          className="h-11 md:h-10"
        />
      </FormField>
    </div>
  );
}

export { VehicleFilterFields, fieldsToQueryPatch, queryValuesToFields };
