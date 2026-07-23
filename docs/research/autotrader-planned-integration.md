# Planned Auto Trader Integration (Not Implemented)

**Status: planning notes only.** No Auto Trader API client, request, schema, or integration code exists
in this repository. This document identifies _which pages_ are expected to become data-driven and _why_,
so future phases have a clear, agreed starting point — it does not describe how any Auto Trader API
actually works.

> **Hard rule for future implementation:** when a future phase reaches actual Auto Trader Connect
> integration work, **stop and request the official Auto Trader API documentation first** (endpoints,
> authentication, request/response schemas, rate limits, webhook payloads, etc.). Nothing below should be
> read as, or used as, an assumed API contract. No endpoint paths, field names, or payload shapes are
> guessed anywhere in this document.

## Why this document exists

Objective 4 of the navigation/IA task asked us to note which _pages_ (not APIs) are expected to become
data-driven, based on the competitor research in
[`seymour-pope-analysis.md`](./seymour-pope-analysis.md), so the distinction between "static/placeholder
today" and "will read from synced data later" is explicit and doesn't get lost as more pages are added.

## Pages expected to become data-driven

### `Cars` (`/cars`)

- **Expected data source:** our own PostgreSQL database (via Prisma), populated by a future sync process
  from Auto Trader Connect — never Auto Trader called directly from the public page (see
  `docs/application-shell.md` / `docs/homepage.md` → "Future data source" for the existing architecture
  boundary already agreed in earlier phases).
- **Dynamic?** Yes — full current inventory, expected to support filtering/sorting once implemented.
- **Expected synchronization approach:** not yet designed. We know only that it will be a
  server-to-server sync (Auto Trader → our database), not a live per-request proxy — the exact
  mechanism (polling vs. webhook-driven, sync frequency, conflict handling) is **to be defined once we
  have the official Auto Trader API documentation.**
- **Backend dependency:** a future sync job/service, a vehicle domain schema in Prisma (not created
  yet), and normalization logic so Auto Trader's payload shape never becomes our internal domain model
  directly (an existing, already-documented architectural boundary).
- **Frontend dependency:** a real listing UI (grid/list, filters, pagination) reading from our own
  database via a server-rendered route — none of this exists yet; `/cars` is currently a
  `PagePlaceholder`.

### `Recently Sold` (`/recently-sold`)

- **Expected data source:** same PostgreSQL database as `Cars` — likely vehicles whose status changes to
  "sold" rather than a separate table, but the exact schema is a database-design decision for a later
  phase, not this one.
- **Dynamic?** Yes — a filtered/sorted view of historical (sold) inventory.
- **Expected synchronization approach:** depends entirely on whether Auto Trader's API exposes a "sold"
  or "removed" status we can sync, or whether sold-state is inferred/managed on our side once a vehicle
  disappears from the Auto Trader feed. **To be confirmed against the official documentation** — not
  assumed here.
- **Backend dependency:** same vehicle schema/sync service as `Cars`, plus whatever status/state field
  ends up representing "sold."
- **Frontend dependency:** a listing UI analogous to `Cars`, likely reusing the same components once
  built.

### Vehicle Details (planned future route, not built yet — e.g. `/cars/[slug]`)

- **Expected data source:** the same PostgreSQL database, one row per vehicle.
- **Dynamic?** Yes — one page per vehicle, generated from database rows (likely
  `generateStaticParams`/ISR or on-demand rendering — implementation choice deferred).
- **Expected synchronization approach:** inherits whatever sync mechanism is designed for `Cars`; a
  vehicle's detail page and its listing-card summary should come from the same synced record so they
  never disagree.
- **Backend dependency:** the vehicle schema (fields like spec, price, images, description — exact shape
  still to be designed) plus the sync service.
- **Frontend dependency:** a detail-page template (gallery, spec sheet, enquiry CTA) — not built yet, and
  no route currently exists for it. The reference research noted this pattern exists on comparable sites
  (see `seymour-pope-analysis.md` → "Vehicle detail"), which is why we're flagging it as planned rather
  than inventing it from nothing.

## Pages that stay static/marketing-only (for now)

`Finance`, `Warranty`, and `Sell Your Car` are currently structural placeholders with no data dependency
at all — they're expected to hold static informational content plus (eventually) a first-party lead
form, not synced Auto Trader data. They are **not** in scope for this integration-planning document
beyond noting that they don't need it.

## What is explicitly not decided yet

- Auto Trader API endpoints, authentication method, and request/response shapes — unknown until we have
  official documentation.
- Sync trigger mechanism (scheduled job, webhook-driven, manual trigger) and frequency.
- The vehicle domain schema itself (fields, relations, image storage strategy).
- How "sold"/"reserved"/"removed" states are represented internally.
- Whether vehicle detail pages are statically generated, ISR, or on-demand rendered.

None of the above should be guessed at implementation time either — the same rule applies: **stop and
request the relevant official Auto Trader API documentation before implementing any of it.**
