import * as React from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Project-specific button wrappers around the shadcn/ui `Button` primitive.
 *
 * These fix a predictable variant/size per intent (primary/secondary/ghost)
 * and add a `loading` state, rather than duplicating `Button`'s markup.
 * Default height is 44px (`h-11`) to meet the mobile touch-target guideline;
 * pass `size` to opt into shadcn's compact sizes where space is constrained.
 */

interface AppButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  /** Shows a spinner, disables the button, and sets `aria-busy`. */
  loading?: boolean;
}

const baseTouchTarget = 'h-11 min-w-11 px-6 has-[>svg]:px-5';

function withLoadingContent(loading: boolean | undefined, children: React.ReactNode) {
  if (!loading) return children;
  return (
    <>
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      {children}
    </>
  );
}

function PrimaryButton({ className, loading, disabled, children, ...props }: AppButtonProps) {
  return (
    <Button
      variant="default"
      className={cn(baseTouchTarget, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {withLoadingContent(loading, children)}
    </Button>
  );
}

function SecondaryButton({ className, loading, disabled, children, ...props }: AppButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(baseTouchTarget, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {withLoadingContent(loading, children)}
    </Button>
  );
}

function GhostButton({ className, loading, disabled, children, ...props }: AppButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(baseTouchTarget, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {withLoadingContent(loading, children)}
    </Button>
  );
}

interface IconButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'> {
  /** Required — icon-only buttons have no visible text, so this sets `aria-label`. */
  label: string;
  variant?: 'default' | 'outline' | 'ghost';
}

/** Square icon-only button. Always requires an accessible `label`. */
function IconButton({ label, variant = 'ghost', className, children, ...props }: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      aria-label={label}
      title={label}
      className={cn('size-11', className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export { PrimaryButton, SecondaryButton, GhostButton, IconButton };
