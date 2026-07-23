'use client';

import * as React from 'react';
import { SlidersHorizontal } from 'lucide-react';

import { PrimaryButton, SecondaryButton } from '@/components/ui/app-button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { VehicleFilterOptions, VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { CARS_LISTING_DEFAULTS } from '../lib/vehicle-listing-search-params';
import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';
import {
  fieldsToQueryPatch,
  queryValuesToFields,
  VehicleFilterFields,
  type VehicleFilterFieldValues,
} from './vehicle-filter-fields';

interface VehicleFilterSheetProps {
  filterOptions: VehicleFilterOptions;
  query: VehicleListingQuery;
  activeFilterCount: number;
  resultCount: number;
}

function VehicleFilterSheet({
  filterOptions,
  query,
  activeFilterCount,
  resultCount,
}: VehicleFilterSheetProps) {
  const { applyQuery, clearAllFilters } = useVehicleListingParams();
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<VehicleFilterFieldValues>(() =>
    queryValuesToFields(query),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(queryValuesToFields(query));
    }
    setOpen(nextOpen);
  };

  const handleApply = () => {
    applyQuery(fieldsToQueryPatch(draft, { status: CARS_LISTING_DEFAULTS.status }));
    setOpen(false);
  };

  const handleClear = () => {
    clearAllFilters();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <SecondaryButton
          type="button"
          className="lg:hidden"
          aria-label={
            activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Open filters'
          }
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {activeFilterCount > 0 ? (
            <Badge variant="secondary" className="ml-1 min-w-5 justify-center px-1.5">
              {activeFilterCount}
            </Badge>
          ) : null}
        </SecondaryButton>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-2xl px-4 pb-6">
        <SheetHeader className="text-left">
          <SheetTitle>Filter vehicles</SheetTitle>
          <SheetDescription>
            {resultCount} {resultCount === 1 ? 'vehicle' : 'vehicles'} match your current selection
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <VehicleFilterFields
            filterOptions={filterOptions}
            values={draft}
            onChange={setDraft}
            layout="stack"
            idPrefix="mobile-filter"
          />
        </div>

        <SheetFooter className="flex-col gap-2 sm:flex-col">
          <PrimaryButton type="button" size="lg" className="w-full" onClick={handleApply}>
            Apply filters
          </PrimaryButton>
          <SecondaryButton type="button" size="lg" className="w-full" onClick={handleClear}>
            Clear all
          </SecondaryButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { VehicleFilterSheet };
