import * as React from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingCardProps extends React.ComponentProps<'div'> {
  /** Show a media placeholder above the text lines (default: true). */
  withMedia?: boolean;
  /** Number of body text lines to render. */
  lines?: number;
}

/**
 * Generic skeleton placeholder shaped like a card (media + heading + body
 * lines), used while real card content is loading. Content-agnostic — no
 * business-specific structure.
 */
function LoadingCard({ withMedia = true, lines = 2, className, ...props }: LoadingCardProps) {
  return (
    <div
      data-slot="loading-card"
      role="status"
      aria-label="Loading"
      className={cn(
        'rounded-card border-border-subtle bg-surface-elevated shadow-subtle flex flex-col gap-3 border p-4',
        className,
      )}
      {...props}
    >
      {withMedia ? <Skeleton className="rounded-image aspect-[16/10] w-full" /> : null}
      <Skeleton className="h-4 w-3/4" />
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={cn('h-3', index === lines - 1 ? 'w-1/2' : 'w-full')} />
      ))}
    </div>
  );
}

export { LoadingCard };
