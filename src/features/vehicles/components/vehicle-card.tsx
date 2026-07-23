import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { BodySmall, CardTitle, Metadata as MetadataText } from '@/components/ui/typography';
import {
  formatRegistrationYear,
  formatSoldDate,
  formatVehicleListingTitle,
  formatVehicleMileage,
  formatVehiclePrice,
  formatVehiclePriceDisplay,
  getFuelTypeLabel,
  getTransmissionLabel,
} from '@/features/vehicles/vehicle.utils';
import type { Vehicle } from '@/features/vehicles/vehicle.types';
import { cn } from '@/lib/utils';

import { FALLBACK_IMAGE, VehicleCardImage } from './vehicle-card-image';
import { VehicleStatusBadge } from './vehicle-status-badge';

const PREMIUM_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

const vehicleCardVariants = cva(
  'group/card rounded-card border-border-subtle bg-surface-elevated shadow-subtle flex h-full flex-col overflow-hidden border transition-[transform,box-shadow,border-color] duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-elevated hover:border-border-strong motion-reduce:hover:translate-y-0 focus-within:-translate-y-1 focus-within:shadow-elevated focus-within:border-border-strong motion-reduce:focus-within:translate-y-0',
  {
    variants: {
      variant: {
        standard: '',
        compact: '',
        sold: 'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  },
);

type VehicleCardVariant = NonNullable<VariantProps<typeof vehicleCardVariants>['variant']>;

interface VehicleCardProps {
  vehicle: Vehicle;
  /** Pass through to Next.js Image for above-the-fold cards only. */
  priority?: boolean;
  variant?: VehicleCardVariant;
  /** When false, suppresses all status badges. When true, shows non-available statuses. */
  showStatus?: boolean;
  className?: string;
}

function resolveVariant(vehicle: Vehicle, variant: VehicleCardVariant): VehicleCardVariant {
  if (vehicle.status === 'SOLD') return 'sold';
  return variant;
}

function shouldShowStatusBadge(vehicle: Vehicle, showStatus: boolean): boolean {
  if (!showStatus) return false;
  if (vehicle.status === 'HIDDEN') return false;
  if (vehicle.status === 'AVAILABLE') return false;
  return true;
}

function buildImageAlt(vehicle: Vehicle): string {
  return `${formatVehicleListingTitle(vehicle)} — primary listing photograph`;
}

interface VehicleMetaItemProps {
  children: ReactNode;
}

function VehicleMetaItem({ children }: VehicleMetaItemProps) {
  return (
    <li className="inline-flex items-center">
      <MetadataText as="span">{children}</MetadataText>
    </li>
  );
}

/**
 * Premium inventory card — image-led, mobile-first, fully clickable.
 * Consumes the normalized `Vehicle` domain type only (never Auto Trader payloads).
 */
function VehicleCard({
  vehicle,
  priority = false,
  variant = 'standard',
  showStatus = true,
  className,
}: VehicleCardProps) {
  if (vehicle.status === 'HIDDEN' || !vehicle.isPublished) {
    return null;
  }

  const resolvedVariant = resolveVariant(vehicle, variant);
  const isSold = vehicle.status === 'SOLD' || resolvedVariant === 'sold';
  const isCompact = resolvedVariant === 'compact';
  const listingTitle = formatVehicleListingTitle(vehicle);
  const imageSrc = vehicle.featuredImage || FALLBACK_IMAGE;
  const showBadge = shouldShowStatusBadge(vehicle, showStatus);
  const hasValidPreviousPrice =
    vehicle.previousPrice != null && vehicle.previousPrice > vehicle.price && !isSold;

  const linkLabel = isSold
    ? `View sold vehicle details for ${listingTitle}`
    : `View ${listingTitle}`;

  return (
    <article
      data-slot="vehicle-card"
      data-variant={resolvedVariant}
      className={cn('flex h-full flex-col', className)}
    >
      <Link
        href={`/cars/${vehicle.slug}`}
        aria-label={linkLabel}
        className={cn(
          vehicleCardVariants({ variant: resolvedVariant }),
          'focus-visible:ring-focus-ring focus-visible:ring-offset-surface-page outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        )}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        <div
          className={cn(
            'bg-surface-muted relative aspect-[16/10] w-full overflow-hidden',
            isSold && 'after:pointer-events-none after:absolute after:inset-0 after:bg-black/20',
          )}
        >
          <VehicleCardImage
            key={vehicle.id}
            src={imageSrc}
            alt={buildImageAlt(vehicle)}
            priority={priority}
            sold={isSold}
          />
          {showBadge ? (
            <div className="absolute top-3 left-3 z-10">
              <VehicleStatusBadge status={vehicle.status} />
            </div>
          ) : null}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover/card:opacity-90 motion-reduce:transition-none"
          />
        </div>

        <div
          className={cn('flex flex-1 flex-col gap-3', isCompact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5')}
        >
          <div className="flex flex-col gap-1">
            <BodySmall
              as="p"
              className="text-text-muted text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
            >
              {vehicle.make}
            </BodySmall>
            <CardTitle
              as="h3"
              className={cn(
                'text-text-primary line-clamp-2 text-base leading-snug sm:text-lg',
                isCompact && 'text-base',
              )}
            >
              {vehicle.model}
            </CardTitle>
            <BodySmall as="p" className="text-text-secondary line-clamp-2 leading-relaxed">
              {vehicle.derivative}
            </BodySmall>
          </div>

          <ul
            className={cn(
              'text-text-muted flex flex-wrap items-center gap-x-2 gap-y-1',
              isCompact ? 'text-xs' : 'text-sm',
            )}
            aria-label="Vehicle summary"
          >
            <VehicleMetaItem>{formatRegistrationYear(vehicle.registrationYear)}</VehicleMetaItem>
            <li aria-hidden="true" className="text-border-strong">
              ·
            </li>
            <VehicleMetaItem>{formatVehicleMileage(vehicle.mileage)}</VehicleMetaItem>
            {!isCompact ? (
              <>
                <li aria-hidden="true" className="text-border-strong">
                  ·
                </li>
                <VehicleMetaItem>{getFuelTypeLabel(vehicle.fuelType)}</VehicleMetaItem>
                <li aria-hidden="true" className="text-border-strong">
                  ·
                </li>
                <VehicleMetaItem>{getTransmissionLabel(vehicle.transmission)}</VehicleMetaItem>
              </>
            ) : null}
          </ul>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            {isSold ? (
              <div className="flex flex-col gap-1">
                <span className="text-status-destructive text-sm font-semibold">Sold</span>
                {vehicle.soldAt ? (
                  <MetadataText as="p">Sold {formatSoldDate(vehicle.soldAt)}</MetadataText>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {hasValidPreviousPrice ? (
                  <span className="text-text-muted decoration-border-strong text-sm line-through">
                    <span className="sr-only">Previous price </span>
                    {formatVehiclePrice(vehicle.previousPrice!)}
                  </span>
                ) : null}
                <span className="text-text-primary text-xl font-semibold tracking-tight sm:text-2xl">
                  {formatVehiclePriceDisplay(vehicle.price)}
                </span>
              </div>
            )}

            <span
              className={cn(
                'text-brand-accent inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-[gap,color] duration-300 group-hover/card:gap-2.5 motion-reduce:transition-none',
                isSold && 'text-text-secondary group-hover/card:gap-1.5',
              )}
              style={{ transitionTimingFunction: PREMIUM_EASE }}
              aria-hidden="true"
            >
              {isSold ? 'View details' : 'View vehicle'}
              <ArrowRight
                className={cn(
                  'size-4 shrink-0 transition-transform duration-300 group-hover/card:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0',
                  isSold && 'size-3.5 opacity-70',
                )}
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export { VehicleCard, vehicleCardVariants, type VehicleCardProps, type VehicleCardVariant };
