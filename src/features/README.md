# `features`

Feature-based modules, grouped by business domain rather than technical layer.

Each feature folder is expected to own its own components, hooks, and feature-local logic, and
may depend on `lib`, `services`, `integrations`, and `components/ui` — but features should not
depend on one another directly. Shared logic should be promoted to `lib` or `services`.

Planned feature modules:

- `vehicle-listings` — vehicle search, listing pages, filtering.
- `admin-dashboard` — internal dealer/staff management tooling.
- `auth` — sign-in, session, and account management UI.
