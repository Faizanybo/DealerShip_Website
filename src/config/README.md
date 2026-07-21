# `config`

Centralized, typed application configuration.

- `env.ts` — server-only runtime validation for required environment variables (currently just
  `DATABASE_URL`). Call `getServerEnv()` instead of reading `process.env` directly elsewhere, so
  missing configuration fails fast with a clear error. Deliberately hand-rolled rather than using a
  schema-validation library while the surface area is this small — revisit once more variables
  need real (not just presence) validation.
- Site-wide constants (nav structure, feature flags, SEO defaults) will live here in a later phase.
- Nothing in this folder should read secrets directly outside of a single validated entry point.
