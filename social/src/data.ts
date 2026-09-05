/**
 * Product facts and sample output, mirrored from the marketing site
 * (`app/page.tsx`) so the videos never drift from what the site claims.
 */

export const TOTAL_CHECKS = 235;
export const TOTAL_CATEGORIES = 28;
export const SAMPLE_SCORE = 91;
export const SAMPLE_PASSED = 214;
export const SAMPLE_FAILED = 21;

export type Verdict = 'pass' | 'warn' | 'fail' | 'info';

export type Issue = {
  verdict: Verdict;
  message: string;
  selector: string;
  category: 'seo' | 'accessibility' | 'performance' | 'ux' | 'security';
};

/** The ranked-issues list as it appears in the HTML report. */
export const ISSUES: Issue[] = [
  { verdict: 'fail', message: 'Canonical URL is missing', selector: 'head', category: 'seo' },
  { verdict: 'fail', message: '7 form inputs missing labels', selector: 'form input', category: 'accessibility' },
  { verdict: 'warn', message: 'Title is too long (74 characters)', selector: 'head > title', category: 'seo' },
  { verdict: 'warn', message: 'Missing essential Open Graph tags: og:image', selector: 'meta[property]', category: 'seo' },
  { verdict: 'warn', message: 'No skip navigation link found', selector: 'body > a', category: 'accessibility' },
  { verdict: 'info', message: '4 images served without WebP/AVIF alternatives', selector: 'img', category: 'performance' },
];

/** Per-category pass counts, as the CLI prints them. */
export const CATEGORY_ROWS: { verdict: 'pass' | 'warn' | 'fail'; label: string; value: string }[] = [
  { verdict: 'warn', label: 'Meta Tags', value: '5 / 6' },
  { verdict: 'pass', label: 'Headings', value: '3 / 3' },
  { verdict: 'warn', label: 'Images', value: '1 / 2' },
  { verdict: 'warn', label: 'Accessibility', value: '2 / 4' },
  { verdict: 'pass', label: 'Security', value: '3 / 3' },
];

/** The 28-category coverage grid from the report's "Category coverage" panel. */
export const COVERAGE: { code: string; name: string; pct: number }[] = [
  { code: 'META', name: 'Meta Tags', pct: 83 },
  { code: 'HEAD', name: 'Headings', pct: 100 },
  { code: 'IMG', name: 'Images', pct: 75 },
  { code: 'PERF', name: 'Performance', pct: 67 },
  { code: 'ROBO', name: 'Robots.txt', pct: 100 },
  { code: 'SITE', name: 'Sitemap', pct: 100 },
  { code: 'SEC', name: 'Security', pct: 100 },
  { code: 'SCHM', name: 'Structured Data', pct: 100 },
  { code: 'SOCL', name: 'Social Media', pct: 67 },
  { code: 'CNTT', name: 'Content', pct: 86 },
  { code: 'LINK', name: 'Links', pct: 83 },
  { code: 'UI', name: 'UI Elements', pct: 100 },
  { code: 'TECH', name: 'Technical SEO', pct: 90 },
  { code: 'A11Y', name: 'Accessibility', pct: 50 },
  { code: 'URL', name: 'URL Factors', pct: 100 },
  { code: 'SPAM', name: 'Spam Detection', pct: 100 },
  { code: 'PGQ', name: 'Page Quality', pct: 92 },
  { code: 'AIMG', name: 'Advanced Images', pct: 85 },
  { code: 'MMED', name: 'Multimedia', pct: 91 },
  { code: 'CWV', name: 'Core Web Vitals', pct: 86 },
  { code: 'ANLY', name: 'Analytics', pct: 92 },
  { code: 'MOBL', name: 'Mobile UX', pct: 92 },
  { code: 'SCVL', name: 'Schema Validation', pct: 93 },
  { code: 'RSRC', name: 'Resource Opt.', pct: 88 },
  { code: 'LEGL', name: 'Legal', pct: 92 },
  { code: 'ECOM', name: 'E-commerce', pct: 93 },
  { code: 'I18N', name: 'i18n', pct: 93 },
  { code: 'HEAT', name: 'Heatmap', pct: 92 },
];

/** The audit pipeline, stage by stage. */
export const PIPELINE = [
  { stage: 'URL', title: 'Navigate', detail: 'Chromium opens the page at your viewport.' },
  { stage: 'DOM', title: 'Rendered document', detail: 'Read after scripts have run.' },
  { stage: 'NETWORK', title: 'Resources & timings', detail: 'Requests, weight, compression.' },
  { stage: 'LAYOUT', title: 'Visual hierarchy', detail: 'Above the fold, tap targets, scroll depth.' },
  { stage: 'EXTERNAL', title: 'Site-level signals', detail: 'robots.txt, sitemaps, headers.' },
  { stage: 'REPORT', title: 'Structured result', detail: 'Every check, plus a 0–100 score.' },
] as const;

/** The JSON payload written by `--output report.json`. */
export const JSON_LINES: [string, 'punct' | 'key' | 'string' | 'number' | 'bool'][] = [
  ['{', 'punct'],
  ['  "url": "https://example.com",', 'string'],
  ['  "score": 91,', 'number'],
  ['  "grade": "A",', 'string'],
  ['  "summary": { "total": 235, "passed": 214, "failed": 21 },', 'key'],
  ['  "checks": {', 'key'],
  ['    "metaTags": [', 'key'],
  ['      { "passed": false, "severity": "error",', 'bool'],
  ['        "message": "Canonical URL is missing" }', 'string'],
  ['    ]', 'punct'],
  ['  }', 'punct'],
  ['}', 'punct'],
];
