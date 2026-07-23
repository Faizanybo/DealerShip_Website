import { VehicleCard, VehicleCardGrid, VehicleCardReveal } from '@/features/vehicles/components';
import type { Vehicle } from '@/features/vehicles/vehicle.types';

interface VehicleInventoryGridProps {
  vehicles: readonly Vehicle[];
  /** Number of cards to mark as LCP priority (first row). */
  priorityCount?: number;
  className?: string;
}

/**
 * Responsive inventory grid — composes `VehicleCard` with optional entrance
 * motion. Reusable on `/cars`, recently sold, and homepage featured sections.
 */
function VehicleInventoryGrid({
  vehicles,
  priorityCount = 3,
  className,
}: VehicleInventoryGridProps) {
  return (
    <VehicleCardGrid className={className ?? '2xl:grid-cols-4 2xl:gap-6'}>
      {vehicles.map((vehicle, index) => (
        <li key={vehicle.id} className="list-none">
          <VehicleCardReveal index={index}>
            <VehicleCard vehicle={vehicle} priority={index < priorityCount} />
          </VehicleCardReveal>
        </li>
      ))}
    </VehicleCardGrid>
  );
}

export { VehicleInventoryGrid };
