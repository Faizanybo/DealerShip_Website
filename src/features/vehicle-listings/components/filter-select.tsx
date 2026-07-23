import * as React from 'react';

import { cn } from '@/lib/utils';

interface FilterSelectProps extends React.ComponentProps<'select'> {
  placeholder?: string;
}

/**
 * Native select styled to match form controls — accessible, works without JS
 * when used inside a form (progressive enhancement).
 */
function FilterSelect({ className, placeholder, children, ...props }: FilterSelectProps) {
  return (
    <select
      data-slot="filter-select"
      className={cn(
        'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-11 min-h-11 w-full min-w-0 rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:min-h-10',
        className,
      )}
      {...props}
    >
      {placeholder ? (
        <option value="" disabled={props.required}>
          {placeholder}
        </option>
      ) : null}
      {children}
    </select>
  );
}

export { FilterSelect };
