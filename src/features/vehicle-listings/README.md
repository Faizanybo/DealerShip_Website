# `features/vehicle-listings`

Vehicle inventory browsing: search, filtering, listing detail pages, and related UI.

**Phase 2.2.1** introduced the shared domain model and mock data layer under
`src/features/vehicles/` — see [`docs/vehicle-domain.md`](../../../docs/vehicle-domain.md).
Listing pages and cards are **not built yet**; they will consume
`@/services/vehicle.service` on the server.
