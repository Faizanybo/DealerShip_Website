import * as React from 'react';

import { cn } from '@/lib/utils';
import { BodyLarge, Eyebrow, SectionTitle } from '@/components/ui/typography';

interface SectionHeaderProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /** Small uppercase label rendered above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Supporting copy rendered below the title. */
  description?: React.ReactNode;
  align?: 'left' | 'center';
  /** Element the title renders as — keep this in sync with document outline. */
  titleAs?: React.ComponentProps<typeof SectionTitle>['as'];
}

/**
 * Standard "eyebrow + title + description" heading block used to introduce a
 * `<Section>`. Purely presentational — no business content baked in.
 */
function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  titleAs,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <SectionTitle as={titleAs}>{title}</SectionTitle>
      {description ? (
        <BodyLarge className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
          {description}
        </BodyLarge>
      ) : null}
    </div>
  );
}

export { SectionHeader };
