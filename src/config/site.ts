import { legalNavigation, primaryNavigation, type NavItem } from './navigation';

/**
 * Centralized, typed dealership/brand configuration — the single source of
 * truth for Header/Footer content (and, later, SEO metadata).
 *
 * IMPORTANT: every dealership-specific value below (`dealershipName`,
 * `phone`, `email`, `address`, `businessHours`, `social`) is a TEMPORARY
 * PLACEHOLDER. Replace all of them with real client-supplied details before
 * launch — do not scatter dealership details across individual components;
 * change them here only.
 */

export interface SocialLink {
  /** Platform name, shown as the accessible/visible label (e.g. "Instagram"). */
  label: string;
  href: string;
}

export interface BusinessHoursEntry {
  /** e.g. "Monday – Friday", "Saturday", "Sunday". */
  days: string;
  hours: string;
}

/** PLACEHOLDER hero trust column — replace copy before launch. */
export interface HeroTrustItem {
  title: string;
  description: string;
}

export interface SiteConfig {
  /** Full legal/display name, e.g. in the footer and page titles. */
  dealershipName: string;
  /** Short brand name used in compact spaces (mobile brand mark, favicon alt text). */
  shortName: string;
  tagline: string;
  contact: {
    /** PLACEHOLDER phone number — replace before launch. */
    phone: string;
    /** PLACEHOLDER email — replace before launch. */
    email: string;
  };
  /** PLACEHOLDER address — replace before launch. */
  address: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  /** Empty by default; the Footer only renders social links that are actually configured. */
  social: SocialLink[];
  navigation: {
    primary: NavItem[];
    legal: NavItem[];
  };
  /** PLACEHOLDER business hours — replace before launch. */
  businessHours: BusinessHoursEntry[];
  /** Rendered in the footer alongside the dynamic current year. */
  copyrightHolder: string;
  hero: {
    /**
     * PLACEHOLDER trust-strip for the homepage hero — neutral claims with
     * short descriptors. Replace every entry before launch.
     */
    trustItems: readonly HeroTrustItem[];
  };
}

export const siteConfig: SiteConfig = {
  dealershipName: 'Placeholder Motors',
  shortName: 'Placeholder',
  tagline: 'Premium vehicles, honestly presented.',
  contact: {
    phone: '+44 0000 000000',
    email: 'enquiries@example.com',
  },
  address: {
    line1: '1 Placeholder Way',
    city: 'Placeholder City',
    postcode: 'PL4 0CE',
    country: 'United Kingdom',
  },
  // Intentionally empty — the Footer only renders configured platforms. Add entries once the
  // client confirms which social profiles are live, e.g.:
  // { label: 'Instagram', href: 'https://instagram.com/...' }
  social: [],
  navigation: {
    primary: primaryNavigation,
    legal: legalNavigation,
  },
  businessHours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  copyrightHolder: 'Placeholder Motors',
  hero: {
    trustItems: [
      {
        title: 'Carefully inspected',
        description: 'Every vehicle checked before it reaches you.',
      },
      {
        title: 'Transparent pricing',
        description: 'Clear, honest numbers with no hidden fees.',
      },
      {
        title: 'Flexible finance',
        description: 'Options to suit a range of budgets.',
      },
    ],
  },
};
