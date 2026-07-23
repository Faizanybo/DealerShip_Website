import { z } from 'zod';

import {
  BODY_TYPES,
  FUEL_TYPES,
  MAX_VEHICLE_PAGE_SIZE,
  TRANSMISSION_TYPES,
  VEHICLE_LIFECYCLE_STATES,
  VEHICLE_SORT_OPTIONS,
  VEHICLE_STATUSES,
} from './vehicle.constants';

const isoDateString = z.string().datetime({ offset: true });

export const vehicleImageSchema = z.object({
  id: z.string().min(1),
  url: z.string().min(1),
  alt: z.string().min(1),
  sortOrder: z.number().int().nonnegative(),
  isPrimary: z.boolean(),
});

export const vehicleFeatureSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: z.string().min(1).nullable(),
});

export const vehicleSchema = z
  .object({
    id: z.string().min(1),
    externalStockId: z.string().min(1),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
    make: z.string().min(1),
    model: z.string().min(1),
    derivative: z.string().min(1),
    registrationYear: z.number().int().min(1900).max(2100),
    registrationNumber: z.string().min(1).nullable(),
    mileage: z.number().int().nonnegative(),
    price: z.number().int().nonnegative(),
    previousPrice: z.number().int().nonnegative().nullable(),
    fuelType: z.enum(FUEL_TYPES),
    transmission: z.enum(TRANSMISSION_TYPES),
    bodyType: z.enum(BODY_TYPES),
    colour: z.string().min(1),
    engineSize: z.string().min(1).nullable(),
    doors: z.number().int().positive().nullable(),
    seats: z.number().int().positive().nullable(),
    shortDescription: z.string().min(1),
    fullDescription: z.string().min(1).nullable(),
    attentionGrabber: z.string().min(1).nullable(),
    status: z.enum(VEHICLE_STATUSES),
    lifecycleState: z.enum(VEHICLE_LIFECYCLE_STATES),
    images: z.array(vehicleImageSchema).min(1),
    featuredImage: z.string().min(1),
    features: z.array(vehicleFeatureSchema),
    isFeatured: z.boolean(),
    isPublished: z.boolean(),
    firstRegisteredAt: isoDateString.nullable(),
    soldAt: isoDateString.nullable(),
    createdAt: isoDateString,
    updatedAt: isoDateString,
  })
  .superRefine((vehicle, ctx) => {
    const primaryImages = vehicle.images.filter((image) => image.isPrimary);
    if (primaryImages.length !== 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'Exactly one image must be marked as primary',
        path: ['images'],
      });
    }

    const featuredInGallery = vehicle.images.some((image) => image.url === vehicle.featuredImage);
    if (!featuredInGallery) {
      ctx.addIssue({
        code: 'custom',
        message: 'featuredImage must match a url in images',
        path: ['featuredImage'],
      });
    }

    if (vehicle.status === 'SOLD' && vehicle.soldAt === null) {
      ctx.addIssue({
        code: 'custom',
        message: 'Sold vehicles must include soldAt',
        path: ['soldAt'],
      });
    }

    if (vehicle.status !== 'SOLD' && vehicle.soldAt !== null) {
      ctx.addIssue({
        code: 'custom',
        message: 'Non-sold vehicles must not include soldAt',
        path: ['soldAt'],
      });
    }

    if (vehicle.status === 'HIDDEN' && vehicle.isPublished) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hidden vehicles must not be published',
        path: ['isPublished'],
      });
    }
  });

export const vehicleListingQuerySchema = z.object({
  status: z.union([z.enum(VEHICLE_STATUSES), z.array(z.enum(VEHICLE_STATUSES)).min(1)]).optional(),
  make: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  fuelType: z.enum(FUEL_TYPES).optional(),
  transmission: z.enum(TRANSMISSION_TYPES).optional(),
  bodyType: z.enum(BODY_TYPES).optional(),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().nonnegative().optional(),
  minYear: z.number().int().min(1900).max(2100).optional(),
  maxMileage: z.number().int().nonnegative().optional(),
  sort: z.enum(VEHICLE_SORT_OPTIONS).optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(MAX_VEHICLE_PAGE_SIZE).optional(),
});

export const vehicleListSchema = z.array(vehicleSchema).min(1);

export type VehicleSchema = z.infer<typeof vehicleSchema>;
export type VehicleImageSchema = z.infer<typeof vehicleImageSchema>;
export type VehicleFeatureSchema = z.infer<typeof vehicleFeatureSchema>;
export type VehicleListingQuerySchema = z.infer<typeof vehicleListingQuerySchema>;
