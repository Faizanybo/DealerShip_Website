# `features/vehicle-listings`

Vehicle inventory browsing: URL-driven search, filtering, sorting, pagination, and listing UI.

**Phase 2.2.5** adds pagination and page-size controls for [`/cars`](../../../docs/pages/cars-listing.md).

Listing pages consume `@/services/vehicle.service` — see [`docs/vehicle-domain.md`](../../../docs/vehicle-domain.md).

## Public API

```ts
import {
  parseVehicleListingSearchParams,
  VehicleFilters,
  VehiclePagination,
  VehiclePageSizeSelect,
  useVehicleListingParams,
} from '@/features/vehicle-listings';
```

Server pages parse `searchParams`; client components update the URL via `useVehicleListingParams` (`goToPage`, `setPageSize`, filter helpers).
