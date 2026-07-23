'use client';

import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { ActiveFilterChip } from '../lib/vehicle-listing-labels';
import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';
import { ClearFiltersButton } from './clear-filters-button';

interface ActiveFilterChipsProps {
  chips: ActiveFilterChip[];
  className?: string;
}

function ActiveFilterChips({ chips, className }: ActiveFilterChipsProps) {
  const { removeFilterKeys } = useVehicleListingParams();
  const prefersReducedMotion = useReducedMotion();

  if (chips.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
        {chips.map((chip) => (
          <motion.button
            key={chip.key}
            type="button"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={() => removeFilterKeys(chip.clearKeys)}
            className="border-border-subtle bg-surface-muted text-text-secondary hover:border-border-strong focus-visible:ring-focus-ring inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2"
            aria-label={`Remove filter: ${chip.label}`}
          >
            <span>{chip.label}</span>
            <X className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
          </motion.button>
        ))}
        {chips.length > 1 ? <ClearFiltersButton variant="ghost" /> : null}
      </div>
    </div>
  );
}

export { ActiveFilterChips };
