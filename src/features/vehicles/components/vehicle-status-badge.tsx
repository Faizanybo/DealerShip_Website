import { StatusBadge } from '@/components/ui/status-badge';
import { getVehicleStatusLabel } from '@/features/vehicles/vehicle.utils';
import type { VehicleStatus } from '@/features/vehicles/vehicle.types';
import { cn } from '@/lib/utils';

const STATUS_VARIANT: Record<VehicleStatus, 'success' | 'warning' | 'destructive' | 'neutral'> = {
  AVAILABLE: 'success',
  RESERVED: 'warning',
  COMING_SOON: 'neutral',
  SOLD: 'destructive',
  HIDDEN: 'neutral',
};

interface VehicleStatusBadgeProps {
  status: VehicleStatus;
  className?: string;
}

/**
 * Maps internal `VehicleStatus` to the shared `StatusBadge` — label always
 * visible; colour is supplementary (never colour-only).
 */
function VehicleStatusBadge({ status, className }: VehicleStatusBadgeProps) {
  return (
    <StatusBadge status={STATUS_VARIANT[status]} className={cn('shadow-subtle', className)}>
      {getVehicleStatusLabel(status)}
    </StatusBadge>
  );
}

export { VehicleStatusBadge };
