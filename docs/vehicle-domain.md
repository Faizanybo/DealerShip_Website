# Vehicle domain (Phase 2.2.1)

Internal vehicle model, validation, mock inventory, and server-side data access for
future **Cars**, **Recently Sold**, and **Vehicle Detail** pages.

## Why a separate domain model?

The public website must **never** consume Auto Trader API payloads directly. The agreed
production flow is:

```
Auto Trader API
    ↓
Auto Trader mapper (integrations/autotrader — not built yet)
    ↓
Internal Vehicle domain model
    ↓
PostgreSQL (Prisma — vehicle schema not built yet)
    ↓
Vehicle repository / service
    ↓
Frontend pages
```

During Phase 2.2.1, **validated mock data** replaces PostgreSQL and Auto Trader. The
**frontend contract** (`Vehicle`, listing queries, service functions) stays stable when
real data is introduced.

> **Auto Trader mapping:** exact field names, lifecycle values, and webhook behaviour
> will be implemented only after reviewing the **official Auto Trader Connect API
> documentation**. Constants in `vehicle.constants.ts` document _assumed_ lifecycle
> mapping — not an API contract.

## Module layout

| Path                                                      | Purpose                              | Client-safe?    |
| --------------------------------------------------------- | ------------------------------------ | --------------- |
| `src/features/vehicles/vehicle.types.ts`                  | Domain interfaces                    | Yes             |
| `src/features/vehicles/vehicle.constants.ts`              | Status values, labels, lifecycle map | Yes             |
| `src/features/vehicles/vehicle.schemas.ts`                | Zod runtime validation               | Yes (Zod only)  |
| `src/features/vehicles/vehicle.utils.ts`                  | GBP/mileage/slug/status formatting   | Yes             |
| `src/features/vehicles/vehicle.query.ts`                  | Pure filter/sort/pagination          | Yes             |
| `src/features/vehicles/vehicle.repository.ts`             | Repository interface                 | Yes             |
| `src/features/vehicles/server/mock-vehicles.data.ts`      | Development mock records             | **Server only** |
| `src/features/vehicles/server/mock-vehicle.repository.ts` | Mock repository                      | **Server only** |
| `src/services/vehicle.service.ts`                         | Page entry point                     | **Server only** |

Import **`@/services/vehicle.service`** from Server Components, Route Handlers, or other
server code. Import types/utils from **`@/features/vehicles`** in client components when
formatting or displaying already-fetched data.

Do **not** import `server/` mock modules or raw mock arrays in UI components.

## Vehicle status model

**Public status** (`VehicleStatus`) — what the website shows:

- `AVAILABLE`
- `RESERVED`
- `COMING_SOON`
- `SOLD`
- `HIDDEN`

**Internal lifecycle** (`VehicleLifecycleState`) — normalized stock state before public
mapping (future sync layer):

| Lifecycle state        | Public status |
| ---------------------- | ------------- |
| `DUE_IN`               | `COMING_SOON` |
| `FORECOURT`            | `AVAILABLE`   |
| `SALE_IN_PROGRESS`     | `RESERVED`    |
| `SOLD`                 | `SOLD`        |
| `WASTEBIN` / `DELETED` | `HIDDEN`      |

Business rules enforced by Zod:

- `SOLD` requires `soldAt`
- Non-`SOLD` vehicles must have `soldAt: null`
- `HIDDEN` vehicles must not be `isPublished`
- Exactly one primary image; `featuredImage` must exist in `images`

## Mock data strategy

- **15 fictional vehicles** in `mock-vehicles.data.ts` — clearly marked development-only
- Balanced mix: available, reserved, coming soon, sold, featured, one hidden/unpublished
- Images reuse local placeholders under `public/images/vehicles/mock/` (copied from the
  existing hero placeholder — no external hotlinking)
- Validated on load via `vehicleListSchema` and via `pnpm vehicles:validate-mock`

## Service API (server)

```typescript
import {
  getVehicles,
  getFeaturedVehicles,
  getRecentlySoldVehicles,
  getVehicleBySlug,
  getVehicleFilterOptions,
} from '@/services/vehicle.service';
```

### Query support

`getVehicles(query?)` accepts `VehicleListingQuery`:

- Filters: `status`, `make`, `model`, `fuelType`, `transmission`, `bodyType`, `minPrice`,
  `maxPrice`, `minYear`, `maxMileage`
- Sort: `newest` (default), `price_asc`, `price_desc`, `mileage_asc`, `year_desc`
- Pagination: `page`, `pageSize` (default 12, max 48)

Unpublished (`isPublished: false`) vehicles are excluded from public listing queries.

Logic lives in pure functions in `vehicle.query.ts` so a future Prisma repository can
reuse the same behaviour.

## Replacing mock data (future phases)

1. Define Prisma `Vehicle` (and related) models in a dedicated database-design phase.
2. Implement `PrismaVehicleRepository` satisfying `VehicleRepository`.
3. Add Auto Trader mapper in `integrations/autotrader` → domain model (not UI-shaped).
4. Swap the singleton in `vehicle.service.ts` from `createMockVehicleRepository()` to
   the Prisma implementation.
5. Pages keep calling the same service functions — no component contract change.

## Related docs

- [`docs/research/autotrader-planned-integration.md`](./research/autotrader-planned-integration.md)
- [`src/features/vehicle-listings/README.md`](../src/features/vehicle-listings/README.md)
