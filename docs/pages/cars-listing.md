# Cars listing page (`/cars`)

Phase **2.2.4** — server-rendered current-stock inventory with URL-driven filters and sorting.

## Responsibilities

- Fetch published current-stock vehicles via **`getVehicles()`** from
  `@/services/vehicle.service`
- Parse and validate URL search parameters through **`VehicleListingQuery`**
- Render **`VehicleCard`** in a responsive grid
- Provide filter, sort, loading, empty, and error-ready UX
- Preserve pagination contract in URL (UI deferred to Phase 2.2.5)

## Data flow

```
/cars?make=BMW&sort=price_asc (Server Component)
    ↓
parseVehicleListingSearchParams(searchParams)
    ↓
getVehicles(query) + getVehicleFilterOptions({ status })
    ↓
VehicleService → MockVehicleRepository (today) / Prisma (future)
    ↓
VehicleFilters (client URL updates) + VehicleInventoryGrid → VehicleCard
```

**Never** import raw mock arrays or call HTTP APIs from the page.

## URL search-parameter contract

Supported parameters (validated via `vehicleListingQuerySchema`):

| Parameter      | Type / values                                                   | Notes                                    |
| -------------- | --------------------------------------------------------------- | ---------------------------------------- |
| `make`         | string                                                          | Exact make from public inventory         |
| `model`        | string                                                          | Filtered by selected make in UI          |
| `fuelType`     | `PETROL`, `DIESEL`, `ELECTRIC`, `HYBRID`, `OTHER`               | Enum from domain                         |
| `transmission` | `MANUAL`, `AUTOMATIC`, `SEMI_AUTOMATIC`                         | Enum from domain                         |
| `bodyType`     | body enum values                                                | Enum from domain                         |
| `status`       | status enum (comma-separated for multiple)                      | Omitted when default scope               |
| `minPrice`     | non-negative integer                                            | GBP whole pounds                         |
| `maxPrice`     | non-negative integer                                            | Dropped if less than `minPrice`          |
| `minYear`      | integer                                                         | Registration year                        |
| `maxMileage`   | non-negative integer                                            | Miles                                    |
| `sort`         | `newest`, `price_asc`, `price_desc`, `mileage_asc`, `year_desc` | Omitted when `newest`                    |
| `page`         | positive integer                                                | Preserved in contract; UI in 2.2.5       |
| `pageSize`     | positive integer (max 48)                                       | Default loads all current stock (48 max) |

### Parsing rules

- Implemented in `src/features/vehicle-listings/lib/vehicle-listing-search-params.ts`
- Invalid enum/number values are **dropped** (page remains usable)
- Unknown URL parameters are **ignored**
- Empty strings behave as **unset**
- Default values are centralized in `CARS_LISTING_DEFAULTS`
- `minPrice > maxPrice` → `maxPrice` is removed during normalization

### Default query

| Parameter  | Value                                  | Notes                                  |
| ---------- | -------------------------------------- | -------------------------------------- |
| `status`   | `AVAILABLE`, `RESERVED`, `COMING_SOON` | Excludes sold + hidden                 |
| `sort`     | `newest`                               | Omitted from URL when unchanged        |
| `page`     | `1`                                    | Reset on filter/sort changes           |
| `pageSize` | `MAX_VEHICLE_PAGE_SIZE` (48)           | All results until pagination UI exists |

## Filter architecture

Location: `src/features/vehicle-listings/`

| Piece                                 | Role                                                              |
| ------------------------------------- | ----------------------------------------------------------------- |
| `parseVehicleListingSearchParams`     | Server + client shared parser                                     |
| `serializeVehicleListingSearchParams` | URL writer — omits defaults                                       |
| `useVehicleListingParams`             | Client hook — `applyQuery`, `removeFilterKeys`, `clearAllFilters` |
| `VehicleFilters`                      | Orchestrates desktop bar, mobile sheet, sort, chips               |
| `VehicleFilterBar`                    | Desktop toolbar — immediate URL updates                           |
| `VehicleFilterSheet`                  | Mobile bottom sheet — draft state, Apply / Clear                  |
| `VehicleSortSelect`                   | Sort control — immediate URL update                               |
| `ActiveFilterChips`                   | Removable chips + clear all                                       |
| `VehicleFilterFields`                 | Shared form fields (make/model dependency)                        |

**URL is the single source of truth.** No global state, no client-side inventory fetching.

### Reset-to-page-1 rule

Filter and sort changes reset `page` to `1` via `useVehicleListingParams` (pagination UI will rely on this in 2.2.5).

### Make / model dependency

- Options from `getVehicleFilterOptions({ status: CARS_LISTING_DEFAULT_STATUS })`
- `modelsByMake` drives dependent model dropdown
- Changing make clears incompatible model (client draft + URL commit)
- Options are sorted alphabetically; only published public inventory

## Desktop filter layout

- Horizontal filter grid (`lg+`) above the inventory grid
- Fields: make, model, min/max price, fuel, transmission, body type, min year, max mileage
- Sort control in the top row (right-aligned on larger breakpoints)
- Clear all aligned under the toolbar
- Native styled selects (`FilterSelect`) for consistency and progressive enhancement

## Mobile filter experience

- Prominent **Filters** button with active-filter count badge
- Bottom sheet with vertically stacked controls + status field
- **Apply filters** commits draft to URL; **Clear all** resets defaults
- Result count shown in sheet header
- Large touch targets (`h-11`), keyboard-accessible Sheet primitive

## Sorting options

| Label                | URL value     |
| -------------------- | ------------- |
| Newest               | `newest`      |
| Price: Low to High   | `price_asc`   |
| Price: High to Low   | `price_desc`  |
| Mileage: Low to High | `mileage_asc` |
| Year: Newest First   | `year_desc`   |

Sort changes preserve filters, reset page to 1, and use `router.push` with `scroll: false`.

## Active-filter chips

- Rendered when any non-default filter is active
- Readable labels (e.g. `BMW`, `Automatic`, `Up to £50,000`)
- Non-default sort shown as a removable chip
- Each chip removes only its filter; page resets to 1
- **Clear all** when multiple chips are active

## Result summary

Dynamic copy from actual `total`:

- `15 vehicles` — no inventory filters
- `6 vehicles matching your filters` — filters active
- `No vehicles match your current filters` — filtered empty state heading

Subtitle: `All vehicles · Newest first` or `Filtered results · {sort label}`.

## Empty states

| Condition                      | Component                                            |
| ------------------------------ | ---------------------------------------------------- |
| Zero public stock (no filters) | `CarsEmptyState`                                     |
| Filters return zero matches    | `CarsFilteredEmptyState` (+ clear filters + contact) |

## Page structure

1. **`CarsPageHero`** — muted internal-page hero
2. **Summary + filters** — count, sort, desktop bar / mobile sheet, chips
3. **Inventory grid** or empty state
4. **`CarsBottomCta`** — contact / sell-your-car links

## Grid behaviour

`VehicleInventoryGrid` — same responsive columns as Phase 2.2.3. Subtle opacity transition on query change via `VehicleInventoryResults` (reduced-motion safe).

## Loading state

`loading.tsx` — hero skeletons, filter bar skeleton (`CarsFiltersFallback`), card grid skeletons.

## Intentionally deferred

- Pagination controls (URL `page` / `pageSize` contract is ready)
- Vehicle detail page (`/cars/[slug]`)
- Auto Trader integration
- Homepage featured section wiring

## Related docs

- [`docs/vehicle-domain.md`](../vehicle-domain.md)
- [`docs/components/vehicle-card.md`](../components/vehicle-card.md)
