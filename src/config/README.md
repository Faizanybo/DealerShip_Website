# `config`

Centralized, typed application configuration.

- `env.ts` — server-only runtime validation for required environment variables (currently just
  `DATABASE_URL`). Call `getServerEnv()` instead of reading `process.env` directly elsewhere, so
  missing configuration fails fast with a clear error. Deliberately hand-rolled rather than using a
  schema-validation library while the surface area is this small — revisit once more variables
  need real (not just presence) validation.
- `site.ts` — `siteConfig`: the single source of truth for dealership identity, contact details,
  address, social links, business hours, and copyright text used by the Header/Footer. Every
  dealership-specific value is a **temporary placeholder** — replace them here (only) once the
  client supplies real details. Nothing else should hardcode this information.
- `navigation.ts` — the strongly typed `NavItem` model plus `primaryNavigation`/`legalNavigation`
  arrays consumed by `site.ts`. Supports one level of nesting (`items`) for a future dropdown/mega
  menu without a type rewrite; nothing renders nested items yet.
- Nothing in this folder should read secrets directly outside of a single validated entry point.
