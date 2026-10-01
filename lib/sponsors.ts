export const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
export const SPONSORS_URL = 'https://github.com/sponsors/Ru1vly';
export const BUYMEACOFFEE_URL = 'https://buymeacoffee.com/ru1vly';
export const DISCUSSIONS_URL = 'https://github.com/Ru1vly/Aviary/discussions';

export interface SponsorPlatform {
  number: string;
  name: string;
  detail: string;
  bestFor: string;
  actionLabel: string;
  actionHref: string;
  tag: string;
}

export const SPONSOR_PLATFORMS: SponsorPlatform[] = [
  {
    number: '01',
    name: 'GitHub Sponsors',
    detail: 'Recurring or one-time sponsorship through GitHub.',
    bestFor: 'Developers & organizations',
    actionLabel: 'Sponsor on GitHub',
    actionHref: SPONSORS_URL,
    tag: 'Recurring',
  },
  {
    number: '02',
    name: 'Buy Me a Coffee',
    detail: 'Micro-donations and quick one-time tips.',
    bestFor: 'Individual engineers',
    actionLabel: 'Buy a coffee',
    actionHref: BUYMEACOFFEE_URL,
    tag: 'One-time',
  },
];

export interface SponsorTier {
  number: string;
  name: string;
  price: string;
  via: string;
  body: string;
  perks: string[];
  actionLabel: string;
  actionHref: string;
  tag: string;
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    number: '01',
    name: 'Coffee',
    price: '$5 one-time',
    via: 'Buy Me a Coffee',
    body: 'A small thank-you for the maintenance work behind 242 browser checks.',
    perks: ['Name on the sponsors wall (opt-in)'],
    actionLabel: 'Buy a coffee',
    actionHref: BUYMEACOFFEE_URL,
    tag: 'Individual',
  },
  {
    number: '02',
    name: 'Sustainer',
    price: '$10 / month',
    via: 'GitHub Sponsors',
    body: 'Ongoing support that keeps Aviary independent and actively maintained.',
    perks: ['Name + link on the sponsors wall (opt-in)'],
    actionLabel: 'Sustain on GitHub',
    actionHref: SPONSORS_URL,
    tag: 'Most popular',
  },
  {
    number: '03',
    name: 'Backer',
    price: '$49+ / month',
    via: 'GitHub Sponsors',
    body: 'For teams and companies that rely on Aviary in CI and want visible credit.',
    perks: ['Logo + link on the sponsors wall (opt-in)'],
    actionLabel: 'Back on GitHub',
    actionHref: SPONSORS_URL,
    tag: 'Organizations',
  },
];

export interface SponsorFaq {
  q: string;
  a: string;
}

export const SPONSOR_FAQ: SponsorFaq[] = [
  {
    q: 'Is Aviary still free?',
    a: 'Yes. Aviary is MIT-licensed and free forever — sponsorship unlocks no features and gates nothing. Every check ships to everyone.',
  },
  {
    q: 'What does sponsorship sustain?',
    a: 'Day-to-day maintenance and development: new checks, bug fixes, docs, and keeping 242 checks aligned with evolving web standards.',
  },
  {
    q: 'How do I appear on the sponsors wall?',
    a: 'Sponsor first, then comment on GitHub Discussions with the name (and link or logo) you want listed. Listings are opt-in and removed on request or when sponsorship lapses.',
  },
  {
    q: 'Do sponsors get priority fixes or SLAs?',
    a: 'No. Sponsorship buys no priority triage, no roadmap votes, and no support SLA — it is recognition-only. Scoped consulting is handled separately via GitHub Discussions.',
  },
];

// Opt-in recognition wall. Entries are added manually after a sponsor claims
// their spot via GitHub Discussions — no automatic tracking, no data selling.
export const FOUNDING_SPONSORS: { name: string; href?: string }[] = [];
