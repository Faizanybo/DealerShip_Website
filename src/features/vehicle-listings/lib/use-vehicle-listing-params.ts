'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import {
  CARS_LISTING_DEFAULTS,
  parseVehicleListingSearchParams,
  serializeVehicleListingSearchParams,
} from './vehicle-listing-search-params';

interface ApplyQueryOptions {
  /** Reset page to 1 when filters/sort change (default: true). */
  resetPage?: boolean;
}

/**
 * Client hook for updating `/cars` URL search parameters.
 * The URL remains the single source of truth for inventory filters.
 */
function useVehicleListingParams(defaults: VehicleListingQuery = CARS_LISTING_DEFAULTS) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getCurrentQuery = useCallback((): VehicleListingQuery => {
    return parseVehicleListingSearchParams(Object.fromEntries(searchParams.entries()), defaults);
  }, [searchParams, defaults]);

  const navigateToQuery = useCallback(
    (query: VehicleListingQuery) => {
      const params = serializeVehicleListingSearchParams(query, defaults);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, defaults],
  );

  const applyQuery = useCallback(
    (updates: Partial<VehicleListingQuery>, options: ApplyQueryOptions = {}) => {
      const current = getCurrentQuery();
      const resetPage = options.resetPage !== false;

      const next: VehicleListingQuery = {
        ...current,
        ...updates,
        ...(resetPage ? { page: 1 } : {}),
      };

      if (updates.make !== undefined && updates.make !== current.make) {
        next.model = updates.model;
      }

      navigateToQuery(next);
    },
    [getCurrentQuery, navigateToQuery],
  );

  const removeFilterKeys = useCallback(
    (keys: Array<keyof VehicleListingQuery>) => {
      const current = getCurrentQuery();
      const next: VehicleListingQuery = { ...current, page: 1 };

      for (const key of keys) {
        if (key === 'status') {
          next.status = defaults.status;
        } else if (key === 'sort') {
          next.sort = defaults.sort;
        } else {
          delete next[key];
        }
      }

      navigateToQuery(next);
    },
    [getCurrentQuery, navigateToQuery, defaults],
  );

  const clearAllFilters = useCallback(() => {
    navigateToQuery({
      ...defaults,
      page: 1,
    });
  }, [navigateToQuery, defaults]);

  return {
    applyQuery,
    removeFilterKeys,
    clearAllFilters,
    getCurrentQuery,
  };
}

export { useVehicleListingParams };
