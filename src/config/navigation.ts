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
 * Primary public navigation. Routes are placeholders for pages that don't
 * exist yet (Phase 1.4 only builds the shell) — the Header renders these
 * links, but the target pages themselves are built in later phases.
 */
export const primaryNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars' },
  { label: 'Recently Sold', href: '/recently-sold' },
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
