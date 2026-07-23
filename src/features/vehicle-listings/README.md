# `features/vehicle-listings`

Vehicle inventory browsing: search, filtering, listing detail pages, and related UI.

**Phase 2.2.1–2.2.3** introduced the domain model, `VehicleCard`, and the server-rendered
[`/cars`](../../../docs/pages/cars-listing.md) listing page. Filters, sorting controls, and
pagination are intentionally deferred to later subphases.

Listing pages consume `@/services/vehicle.service` — see [`docs/vehicle-domain.md`](../../../docs/vehicle-domain.md).
