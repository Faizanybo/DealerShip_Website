# Cars listing page (`/cars`)

Phase **2.2.5** — server-rendered current-stock inventory with URL-driven filters, sorting, and pagination.

## Responsibilities

- Fetch published current-stock vehicles via **`getVehicles()`** from
  `@/services/vehicle.service`
- Parse and validate URL search parameters through **`VehicleListingQuery`**
- Render **`VehicleCard`** in a responsive paginated grid
- Provide filter, sort, pagination, loading, empty, and error-ready UX

## Data flow

```
/cars?make=BMW&sort=price_asc&page=2&pageSize=24 (Server Component)
    ↓
parseVehicleListingSearchParams(searchParams)
    ↓
getVehicleFilterOptions({ status }) + Suspense → getVehicles(query)
    ↓
VehicleService → MockVehicleRepository (today) / Prisma (future)
    ↓
VehicleFilters (client URL updates) + VehicleInventoryGrid → VehicleCard
    ↓
VehiclePagination + VehiclePageSizeSelect
```

**Never** import raw mock arrays or call HTTP APIs from the page.

## URL search-parameter contract

Supported parameters (validated via `vehicleListingQuerySchema`):

| Parameter      | Type / values                                                   | Notes                                          |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| `make`         | string                                                          | Exact make from public inventory               |
| `model`        | string                                                          | Filtered by selected make in UI                |
| `fuelType`     | fuel enum values                                                | Enum from domain                               |
| `transmission` | transmission enum values                                        | Enum from domain                               |
| `bodyType`     | body enum values                                                | Enum from domain                               |
| `status`       | status enum (comma-separated for multiple)                      | Omitted when default scope                     |
| `minPrice`     | non-negative integer                                            | GBP whole pounds                               |
| `maxPrice`     | non-negative integer                                            | Dropped if less than `minPrice`                |
| `minYear`      | integer                                                         | Registration year                              |
| `maxMileage`   | non-negative integer                                            | Miles                                          |
| `sort`         | `newest`, `price_asc`, `price_desc`, `mileage_asc`, `year_desc` | Omitted when `newest`                          |
| `page`         | positive integer                                                | Omitted when `1`                               |
| `pageSize`     | `12`, `24`, or `36`                                             | Omitted when `12` (default); max domain cap 48 |

### Parsing rules

- Implemented in `src/features/vehicle-listings/lib/vehicle-listing-search-params.ts`
- Invalid enum/number values are **dropped** (page remains usable)
- Unknown URL parameters are **ignored**
- Empty strings behave as **unset**
- Default values are centralized in `CARS_LISTING_DEFAULTS`
- `minPrice > maxPrice` → `maxPrice` is removed during normalization
- Invalid `pageSize` values snap to **12**

### Default query

| Parameter  | Value                                  | Notes                           |
| ---------- | -------------------------------------- | ------------------------------- |
| `status`   | `AVAILABLE`, `RESERVED`, `COMING_SOON` | Excludes sold + hidden          |
| `sort`     | `newest`                               | Omitted from URL when unchanged |
| `page`     | `1`                                    | Omitted from URL when unchanged |
| `pageSize` | `12`                                   | Omitted from URL when unchanged |

## Pagination

### URL examples

- `/cars?page=2`
- `/cars?make=BMW&sort=price_desc&page=3`
- `/cars?fuelType=PETROL&pageSize=24&page=2`

### Page-reset rules

| Action            | `page` behaviour | Filters / sort |
| ----------------- | ---------------- | -------------- |
| Filter change     | Reset to `1`     | Updated        |
| Sort change       | Reset to `1`     | Preserved      |
| Page-size change  | Reset to `1`     | Preserved      |
| Page navigation   | Updated          | Preserved      |
| Clear all filters | Reset to `1`     | Cleared        |

### Invalid-page handling

When the requested `page` exceeds `totalPages`, is below `1`, or is otherwise out of range:

1. `applyVehicleListingQuery` clamps to the nearest valid page (repository layer).
2. `CarsInventorySection` compares the URL page with the clamped result page.
3. If they differ, the server issues a **redirect** to the canonical URL via `buildCarsListingHref`.

This avoids crashes, empty grids, and redirect loops — the target page is always valid.

### Page-size options

User-selectable values: **12**, **24**, **36** (`VEHICLE_LISTING_PAGE_SIZE_OPTIONS`).

Domain maximum remains **48** for API/query validation; UI does not expose larger values.

### Components

| Component               | Role                                                      |
| ----------------------- | --------------------------------------------------------- |
| `VehiclePagination`     | Previous/Next, numbered pages (desktop), mobile indicator |
| `VehiclePageSizeSelect` | Compact per-page selector                                 |
| `getPaginationItems`    | Deterministic page-number / ellipsis algorithm            |
| `CarsInventorySection`  | Server block — fetch, summary, grid, pagination           |
| `CarsInventoryFallback` | Suspense skeleton during param navigation                 |

### Mobile pagination

- **Previous** / **Next** with 44px touch targets
- Compact **“Page X of Y”** indicator (`lg:hidden`)
- Numbered page buttons hidden below `lg` to prevent overflow
- Page-size selector remains in the summary row above the grid

### Scroll behaviour

Page navigation scrolls to `#cars-inventory-heading` (not the document top). Uses `scrollIntoView` with reduced-motion respect — no custom scroll animation system.

## Filter architecture

Location: `src/features/vehicle-listings/`

| Piece                                 | Role                                             |
| ------------------------------------- | ------------------------------------------------ |
| `parseVehicleListingSearchParams`     | Server + client shared parser                    |
| `serializeVehicleListingSearchParams` | URL writer — omits defaults                      |
| `useVehicleListingParams`             | Client hook — filters, `goToPage`, `setPageSize` |
| `VehicleFilters`                      | Desktop bar, mobile sheet, sort, chips           |
| `ActiveFilterChips`                   | Removable chips + clear all                      |

**URL is the single source of truth.** No global state, no client-side inventory fetching.

## Result summary

Dynamic copy from actual paginated values:

- `Showing 1–12 of 38 vehicles`
- `Showing 13–24 of 38 vehicles`
- `Showing 6 vehicles matching your filters` (single page, filtered)
- `Showing 1–12 of 18 vehicles matching your filters` (multi-page, filtered)
- `No vehicles match your current filters` — filtered empty state

Subtitle: `All vehicles · Newest first` or `Filtered results · {sort label}`.

## Empty states

| Condition                      | Pagination / page-size | Component                                            |
| ------------------------------ | ---------------------- | ---------------------------------------------------- |
| Zero public stock (no filters) | Hidden                 | `CarsEmptyState`                                     |
| Filters return zero matches    | Hidden                 | `CarsFilteredEmptyState` (+ chips + clear + contact) |

Active filter chips remain visible above the empty state when filters are applied.

## Loading state

- **`loading.tsx`** — hero + filter + inventory skeletons (initial route load)
- **`CarsInventoryFallback`** — Suspense fallback when search params change (grid + summary + pagination skeleton only; header/footer/filters stay mounted)

## SEO note (future)

Filtered and paginated URLs are clean (defaults omitted from query strings). Before launch, consider **canonical URLs** and selective **noindex** for low-value filter/page combinations to avoid thin indexed variants — not implemented in this phase.

## Intentionally deferred

- Vehicle detail page (`/cars/[slug]`)
- Auto Trader integration
- Homepage featured section wiring
- Recently Sold listing page
- Broad canonical/noindex rules

## Related docs

- [`docs/vehicle-domain.md`](../vehicle-domain.md)
- [`docs/components/vehicle-card.md`](../components/vehicle-card.md)
