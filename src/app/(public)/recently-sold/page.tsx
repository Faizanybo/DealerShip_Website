import type { Metadata } from 'next';

import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Recently Sold',
  description:
    "A showcase of vehicles we've recently sold. This page is being connected to our sales history — check back soon.",
};

/**
 * Temporary structural shell (Phase 2.1). Real content depends on the same
 * synced vehicle data source as `/cars` — see that page's comment.
 */
export default function RecentlySoldPage() {
  return (
    <PagePlaceholder
      eyebrow="Sales history"
      title="Recently Sold"
      description="A showcase of vehicles we've recently sold will appear here once our sales history is connected."
    />
  );
}
