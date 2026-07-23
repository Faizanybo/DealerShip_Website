import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Horizontal page gutter + max-width wrapper. Mobile-first: padding starts
 * small and grows at `md`/`lg`, and content never exceeds `--container-content`
 * (see globals.css) regardless of viewport.
 */
function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="container"
      className={cn(
        'max-w-content px-page-mobile md:px-page-tablet lg:px-page-desktop mx-auto w-full',
        className,
      )}
      {...props}
    />
  );
}

export { Container };
