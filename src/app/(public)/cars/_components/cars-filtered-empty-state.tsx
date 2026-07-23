import Link from 'next/link';
import { SearchX } from 'lucide-react';

import { PrimaryButton } from '@/components/ui/app-button';
import { EmptyState } from '@/components/ui/empty-state';

import { ClearFiltersButton } from '@/features/vehicle-listings/components/clear-filters-button';

/**
 * Empty state when filters return no matches (distinct from zero inventory).
 */
function CarsFilteredEmptyState() {
  return (
    <EmptyState
      icon={SearchX}
      title="No vehicles match your current filters"
      description="Try adjusting or clearing your filters to see more of our current stock."
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ClearFiltersButton variant="secondary" />
          <PrimaryButton asChild>
            <Link href="/contact">Contact sales</Link>
          </PrimaryButton>
        </div>
      }
    />
  );
}

export { CarsFilteredEmptyState };
