import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
import { EmptyState } from '@/components/ui/empty-state';

interface InventoryPlaceholderSectionProps {
  id?: string;
  tone?: 'page' | 'muted';
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emptyStateTitle: string;
  emptyStateDescription: string;
}

/**
 * Structural placeholder for a future data-driven inventory section
 * (featured stock, recently sold). Renders an `EmptyState` instead of real
 * vehicle cards — real content arrives once vehicle data is synced from Auto
 * Trader Connect into PostgreSQL and read from there (see docs/homepage.md).
 * Reused for both the "Featured vehicles" and "Recently sold" homepage
 * sections rather than duplicating this markup twice.
 */
function InventoryPlaceholderSection({
  id,
  tone = 'page',
  eyebrow,
  title,
  description,
  icon,
  emptyStateTitle,
  emptyStateDescription,
}: InventoryPlaceholderSectionProps) {
  return (
    <Section id={id} tone={tone} spacing="lg">
      <Container className="flex flex-col gap-10">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <EmptyState icon={icon} title={emptyStateTitle} description={emptyStateDescription} />
      </Container>
    </Section>
  );
}

export { InventoryPlaceholderSection };
