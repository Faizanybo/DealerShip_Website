'use client';

import { SlidersHorizontal } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

/** Suspense fallback while filter controls hydrate `useSearchParams`. */
function CarsFiltersFallback() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Skeleton className="h-11 w-28 lg:hidden" />
        <Skeleton className="h-11 w-full sm:w-52 lg:ml-auto lg:w-56" />
      </div>
      <div className="hidden gap-3 lg:grid lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full" />
        ))}
      </div>
      <div className="text-text-muted flex items-center gap-2 text-sm lg:hidden">
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Loading filters…
      </div>
    </div>
  );
}

export { CarsFiltersFallback };
