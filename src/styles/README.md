# `styles`

Home for design-token-level styling that goes beyond `app/globals.css`, if/when the token set outgrows
a single file.

As of Phase 1.3, all design tokens (colour, spacing, shape, motion) and the typography/Tailwind theme
mapping live directly in `src/app/globals.css` (the location shadcn/ui itself manages), which is
simpler for a token set this size. This folder stays intentionally empty — revisit only if
`globals.css` becomes unwieldy.
