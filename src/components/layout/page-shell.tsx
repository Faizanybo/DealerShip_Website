import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Outermost structural scaffold for a route. Establishes a full-height flex
 * column so a future sticky header/footer can sit alongside a growing
 * `<main>` without extra wiring.
 *
 * Deliberately unopinionated about *what* children are — header, footer and
 * navigation are out of scope for this phase and are added by call sites.
 */
function PageShell({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="page-shell" className={cn('flex min-h-svh flex-col', className)} {...props} />
  );
}

export { PageShell };
