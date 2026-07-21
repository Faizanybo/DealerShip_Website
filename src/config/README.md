# `config`

Centralized, typed application configuration.

- Environment variable parsing/validation will live here (e.g. a `env.ts` that validates `process.env` at startup).
- Site-wide constants (nav structure, feature flags, SEO defaults) belong here.
- Nothing in this folder should read secrets directly outside of a single validated entry point.
