'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VehicleListingQuery } from '@/features/vehicles/vehicle.types';

import { getPaginationItems } from '../lib/pagination';
import { buildCarsListingHref } from '../lib/vehicle-listing-search-params';
import { useVehicleListingParams } from '../lib/use-vehicle-listing-params';

const INVENTORY_SCROLL_TARGET = 'cars-inventory-heading';

export interface VehiclePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  query: VehicleListingQuery;
  className?: string;
}

function scrollToInventory() {
  const target = document.getElementById(INVENTORY_SCROLL_TARGET);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
}

function buildPageHref(pathname: string, query: VehicleListingQuery, page: number): string {
  const href = buildCarsListingHref(pathname, { ...query, page });
  return `${href}#${INVENTORY_SCROLL_TARGET}`;
}

function VehiclePagination({
  currentPage,
  totalPages,
  pageSize,
  query,
  className,
}: VehiclePaginationProps) {
  const pathname = usePathname();
  const { goToPage } = useVehicleListingParams();
  const items = getPaginationItems(currentPage, totalPages);

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const currentQuery = { ...query, pageSize };

  const handlePageNav = (page: number) => {
    goToPage(page);
    scrollToInventory();
  };

  return (
    <nav
      aria-label="Vehicle results pagination"
      className={cn('flex flex-col items-center gap-4', className)}
    >
      <p className="text-text-muted text-sm lg:hidden" aria-live="polite">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex w-full max-w-full items-center justify-center gap-1 sm:gap-2">
        {isFirstPage ? (
          <span
            className="border-border-subtle text-text-muted inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-lg border px-3 text-sm opacity-60"
            aria-disabled="true"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        ) : (
          <Button variant="outline" className="h-11 min-w-11 px-3" asChild>
            <Link
              href={buildPageHref(pathname, currentQuery, currentPage - 1)}
              scroll={false}
              onClick={(event) => {
                event.preventDefault();
                handlePageNav(currentPage - 1);
              }}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sr-only sm:hidden">Previous page</span>
            </Link>
          </Button>
        )}

        <ol className="hidden items-center gap-1 lg:flex">
          {items.map((item, index) =>
            item === 'ellipsis' ? (
              <li
                key={`ellipsis-${index}`}
                className="text-text-muted flex size-11 items-center justify-center text-sm"
                aria-hidden="true"
              >
                …
              </li>
            ) : (
              <li key={item}>
                {item === currentPage ? (
                  <span
                    aria-current="page"
                    className="bg-primary text-primary-foreground inline-flex size-11 items-center justify-center rounded-lg text-sm font-medium"
                  >
                    {item}
                  </span>
                ) : (
                  <Button variant="outline" className="size-11 px-0" asChild>
                    <Link
                      href={buildPageHref(pathname, currentQuery, item)}
                      scroll={false}
                      onClick={(event) => {
                        event.preventDefault();
                        handlePageNav(item);
                      }}
                      aria-label={`Page ${item}`}
                    >
                      {item}
                    </Link>
                  </Button>
                )}
              </li>
            ),
          )}
        </ol>

        {isLastPage ? (
          <span
            className="border-border-subtle text-text-muted inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-lg border px-3 text-sm opacity-60"
            aria-disabled="true"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </span>
        ) : (
          <Button variant="outline" className="h-11 min-w-11 px-3" asChild>
            <Link
              href={buildPageHref(pathname, currentQuery, currentPage + 1)}
              scroll={false}
              onClick={(event) => {
                event.preventDefault();
                handlePageNav(currentPage + 1);
              }}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sr-only sm:hidden">Next page</span>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export { VehiclePagination };
