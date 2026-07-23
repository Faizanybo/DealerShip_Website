# `types`

Shared, framework-agnostic TypeScript types and interfaces used across features, services, and
integrations.

Domain types for vehicles live in **`src/features/vehicles/vehicle.types.ts`** (Phase 2.2.1) and
are re-exported from `@/features/vehicles`. Vendor-specific API response types should live next
to their integration instead (e.g. `integrations/autotrader/types.ts`).
