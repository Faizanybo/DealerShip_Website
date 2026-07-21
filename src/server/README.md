# `server`

Server-only code: nothing in this folder should ever be imported from client components.

Sub-modules:

- `api` — shared helpers for Next.js Route Handlers (response formatting, error mapping).
- `auth` — server-side authentication/session logic.
- `db` — database access layer (Prisma client and queries, added in a later phase).
