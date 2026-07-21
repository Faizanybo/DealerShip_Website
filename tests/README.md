# Tests

Root-level test suites, separate from any tests colocated with source files.

- `unit` — isolated unit tests for `lib`, `services`, and utility logic.
- `integration` — tests that exercise multiple modules together (e.g. a service plus a mocked integration).
- `e2e` — end-to-end tests driving the app through the browser.

No test runner is configured yet — this structure is reserved for a future phase.
