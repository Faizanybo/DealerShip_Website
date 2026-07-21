# `integrations`

Typed clients and adapters for third-party services and external APIs.

Code here should expose a clean, typed interface to the rest of the app and encapsulate all
vendor-specific request/response shapes, auth, and error handling — nothing outside this folder
should know about a vendor's raw API.

Planned integrations:

- `autotrader` — Auto Trader Connect APIs (Stock Sync, Search, Webhooks, Valuations). Not implemented yet.
- `email` — Transactional email provider client. Not implemented yet.
