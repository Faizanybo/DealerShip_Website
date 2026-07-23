# Cars listing page (`/cars`)

Phase **2.2.3** — server-rendered current-stock inventory.

## Responsibilities

- Fetch published current-stock vehicles via **`getVehicles()`** from
  `@/services/vehicle.service`
- Render **`VehicleCard`** in a responsive grid
- Provide loading, empty, and error-ready UX
- Establish layout foundation for filters, sorting, and pagination (deferred)

## Data flow

```
/cars (Server Component)
    ↓
getVehicles({ status, sort, pageSize })
    ↓
VehicleService → MockVehicleRepository (today) / Prisma (future)
    ↓
VehicleInventoryGrid → VehicleCard
```

**Never** import raw mock arrays or call HTTP APIs from the page.

### Default query (Phase 2.2.3)

| Parameter  | Value                                  | Notes                                  |
| ---------- | -------------------------------------- | -------------------------------------- |
| `status`   | `AVAILABLE`, `RESERVED`, `COMING_SOON` | Excludes sold + hidden                 |
| `sort`     | `newest`                               | Deterministic default                  |
| `pageSize` | `MAX_VEHICLE_PAGE_SIZE` (48)           | All results until pagination UI exists |

Unpublished/hidden vehicles are excluded by repository query rules (`isPublished`).

## Page structure

1. **`CarsPageHero`** — muted internal-page hero (eyebrow, H1, supporting copy)
2. **Inventory section** — live count summary + grid or empty state
3. **`CarsBottomCta`** — contact / sell-your-car links

## Grid behaviour

`VehicleInventoryGrid` (`src/features/vehicles/components/vehicle-inventory-grid.tsx`):

| Breakpoint | Columns                              |
| ---------- | ------------------------------------ |
| default    | 1                                    |
| `sm:`      | 2                                    |
| `lg:`      | 3                                    |
| `2xl:`     | 4 (optional, when readability holds) |

Uses `VehicleCardGrid` + `VehicleCardReveal` for restrained staggered entrance (reduced-motion safe).

## Loading & empty states

- **`loading.tsx`** — hero skeletons + `LoadingCard` grid (16:10 media, matching breakpoints)
- **`CarsEmptyState`** — friendly copy + contact / home CTAs (not an error)
- **`error.tsx`** — non-technical message + retry + contact

## Intentionally deferred

- Filters, search, sort controls
- URL query state / pagination controls
- Vehicle detail page (`/cars/[slug]`) — cards already link there
- Auto Trader integration (replaces repository, not page contract)
- Homepage featured section wiring

## Metadata

Temporary production metadata via `siteConfig` — no static inventory counts in SEO copy.

## Related docs

- [`docs/vehicle-domain.md`](../vehicle-domain.md)
- [`docs/components/vehicle-card.md`](../components/vehicle-card.md)
