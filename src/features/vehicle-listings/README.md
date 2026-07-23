# `features/vehicle-listings`

Vehicle inventory browsing: URL-driven search, filtering, sorting, and listing UI.

**Phase 2.2.4** adds filters and sort for [`/cars`](../../../docs/pages/cars-listing.md). Pagination UI is deferred to 2.2.5; the URL contract already supports `page` and `pageSize`.

Listing pages consume `@/services/vehicle.service` — see [`docs/vehicle-domain.md`](../../../docs/vehicle-domain.md).

## Public API

```ts
import {
  parseVehicleListingSearchParams,
  VehicleFilters,
  useVehicleListingParams,
} from '@/features/vehicle-listings';
```

Server pages parse `searchParams`; client components update the URL via `useVehicleListingParams`.
