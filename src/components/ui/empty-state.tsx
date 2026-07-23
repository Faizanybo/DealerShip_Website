import * as React from 'react';
import { Inbox, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Body, CardTitle } from '@/components/ui/typography';

interface EmptyStateProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Typically a `<PrimaryButton>` or `<SecondaryButton>`. */
  action?: React.ReactNode;
}

/**
 * Generic "nothing to show" placeholder — no business content baked in.
 * Used for empty search results, empty lists, empty dashboards, etc.
 */
function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'rounded-card border-border-subtle flex flex-col items-center gap-3 border border-dashed px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      <span className="bg-surface-muted text-text-muted flex size-12 items-center justify-center rounded-full">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <CardTitle as="h3">{title}</CardTitle>
      {description ? <Body className="max-w-sm">{description}</Body> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
