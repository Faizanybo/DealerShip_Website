import Link from 'next/link';
import { Car } from 'lucide-react';

import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { EmptyState } from '@/components/ui/empty-state';
import { siteConfig } from '@/config/site';

/**
 * Empty inventory state for `/cars` when no published vehicles match the listing.
 */
function CarsEmptyState() {
  return (
    <EmptyState
      icon={Car}
      title="No vehicles to show right now"
      description={`Our current stock is being updated. Contact ${siteConfig.dealershipName} and we'll help you find the right vehicle.`}
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryButton asChild>
            <Link href="/contact">Contact sales</Link>
          </PrimaryButton>
          <SecondaryButton asChild>
            <Link href="/">Return home</Link>
          </SecondaryButton>
        </div>
      }
    />
  );
}

export { CarsEmptyState };
