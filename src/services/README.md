# `services`

Domain/business-logic orchestration layer. Services compose `integrations` and `server/db` to
implement use cases (e.g. "sync vehicle stock", "submit a lead"), independent of HTTP or UI concerns.

Route Handlers and Server Actions should stay thin and delegate to services; services should
stay framework-agnostic and testable in isolation.

## Implemented

- `vehicle.service.ts` — server-side vehicle inventory access (mock repository today; Prisma later).
  See [`docs/vehicle-domain.md`](../docs/vehicle-domain.md).
