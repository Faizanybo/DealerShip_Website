import { LoadingCard } from '@/components/ui/loading-card';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_VEHICLE_PAGE_SIZE } from '@/features/vehicles/vehicle.constants';

interface CarsInventoryFallbackProps {
  pageSize?: number;
}

function CarsInventoryFallback({
  pageSize = DEFAULT_VEHICLE_PAGE_SIZE,
}: CarsInventoryFallbackProps) {
  const skeletonCount = Math.min(pageSize, 6);

  return (
    <div className="flex flex-col gap-8 sm:gap-10" aria-busy="true" aria-label="Loading vehicles">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-7 w-56 max-w-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-11 w-full sm:w-36" />
      </div>

      <ul
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4 2xl:gap-6"
        aria-hidden="true"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <li key={index} className="list-none">
            <LoadingCard lines={3} />
          </li>
        ))}
      </ul>

      <Skeleton className="mx-auto h-11 w-full max-w-md" />
    </div>
  );
}

export { CarsInventoryFallback };
