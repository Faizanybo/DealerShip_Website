/**
 * Strongly typed navigation model shared by the Header and Footer.
 *
 * Kept intentionally simple: `items` supports one level of nesting so a
 * future mega-menu/dropdown doesn't require a type rewrite, but nothing here
 * renders nested items yet — the Header/Footer only render top-level links
 * for now.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Optional supporting copy — reserved for a future richer nav (e.g. a dropdown). */
  description?: string;
  /** Set to `false` to temporarily hide an item without deleting its config. Defaults to `true`. */
  visible?: boolean;
  /** Opens in a new tab with `rel="noopener noreferrer"`. Defaults to `false`. */
  external?: boolean;
  /** Reserved for future nested navigation (e.g. a "Cars" dropdown by body type). */
  items?: NavItem[];
}

/**
 * Primary public navigation. Every route below exists (either as a real page
 * or a temporary `PagePlaceholder` shell — see `docs/homepage.md`), so
 * nothing here 404s. The set and order was expanded to match the
 * information architecture typically found on premium dealership sites
 * (see `docs/research/seymour-pope-analysis.md`) — Header/Footer only ever
 * read from this array, so reordering or renaming items here is the only
 * change needed to update navigation everywhere.
 */
export const primaryNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars' },
  { label: 'Recently Sold', href: '/recently-sold' },
  { label: 'Finance', href: '/finance' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Sell Your Car', href: '/sell-your-car' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Legal/footer-only navigation. */
export const legalNavigation: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

/** Returns only the items that should currently be rendered (`visible !== false`). */
export function getVisibleNavItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => item.visible !== false);
}

/**
 * Whether `href` should be treated as the "current page" for `pathname`.
 * The home route (`/`) only matches exactly; every other route also matches
 * its own sub-paths (e.g. `/cars` stays active on `/cars/some-model`).
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
