'use client';

import { GhostButton, SecondaryButton } from '@/components/ui/app-button';
import { cn } from '@/lib/utils';

import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';

interface ClearFiltersButtonProps {
  variant?: 'ghost' | 'secondary';
  className?: string;
}

function ClearFiltersButton({ variant = 'secondary', className }: ClearFiltersButtonProps) {
  const { clearAllFilters } = useVehicleListingParams();
  const Button = variant === 'ghost' ? GhostButton : SecondaryButton;

  return (
    <Button type="button" onClick={clearAllFilters} className={cn('shrink-0', className)}>
      Clear all
    </Button>
  );
}

export { ClearFiltersButton };
