import type { Metadata } from 'next';

import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Cars',
  description:
    'Browse our current stock. This page is being connected to our inventory — check back soon.',
};

/**
 * Temporary structural shell (Phase 2.1). The real listing page — filters,
 * vehicle cards, pagination — is a later phase, once vehicle data is synced
 * from Auto Trader Connect into PostgreSQL and read from there.
 */
export default function CarsPage() {
  return (
    <PagePlaceholder
      eyebrow="Inventory"
      title="Cars"
      description="Our current stock is being connected. Once live, you'll be able to browse every vehicle we have available right here."
    />
  );
}
