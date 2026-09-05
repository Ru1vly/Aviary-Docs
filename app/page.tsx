'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Wordmark from '@/components/aviary/Wordmark';
import Button from '@/components/aviary/Button';
import Tag from '@/components/aviary/Tag';
import VerdictBadge from '@/components/aviary/VerdictBadge';
import IssueRow from '@/components/aviary/IssueRow';
import ScoreDial from '@/components/aviary/ScoreDial';
import Tabs from '@/components/aviary/Tabs';
import ParticleField from '@/components/aviary/ParticleField';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';

const HERO = [
  { name: 'Meta tags', pass: 5, total: 6 },
  { name: 'Headings', pass: 3, total: 3 },
  { name: 'Images', pass: 1, total: 2 },
  { name: 'Accessibility', pass: 2, total: 4 },
  { name: 'Performance', pass: 1, total: 2 },
  { name: 'Structured data', pass: 3, total: 3 },
  { name: 'Security', pass: 3, total: 3 },
  { name: 'Core web vitals', pass: 18, total: 20 },
];

const CATEGORIES: [string, number, string][] = [
  ['Meta Tags', 6, 'Title, description, Open Graph, and canonical tags.'],
  ['Headings', 3, 'Single H1 presence, hierarchy, and character length.'],
  ['Images', 2, 'Alt text, source validity, and explicit image dimensions.'],
  ['Performance', 2, 'Load time, DOM content loaded, and first paint times.'],
  ['Robots.txt', 2, 'Reachable file, bot directives, and sitemap reference.'],
  ['Sitemap', 2, 'Sitemap discovery, valid format, and URL entries.'],
  ['Security', 3, 'HTTPS enforcement, mixed content, and security headers.'],
  ['Structured Data', 3, 'Valid JSON-LD, microdata schema, and syntax parsing.'],
  ['Social Media', 3, 'Twitter cards, Open Graph metadata, and image previews.'],
  ['Content', 4, 'Word count, text readability score, and content ratio.'],
  ['Links', 3, 'Internal links, external references, and nofollow status.'],
  ['UI Elements', 4, 'Favicon, breadcrumbs navigation, and HTML lang attributes.'],
  ['Technical SEO', 4, 'HTTP status codes, redirects, and Gzip compression.'],
  ['Accessibility', 4, 'ARIA labels, form input labels, and logical tab order.'],
  ['URL Factors', 10, 'URL length, directory depth, and keyword readability.'],
  ['Spam Detection', 15, 'Hidden text checks, keyword stuffing, and cloaking tests.'],
  ['Page Quality', 15, 'Viewport tags, content structure, and media elements.'],
  ['Advanced Images', 10, 'Responsive images, modern formats, and lazy loading.'],
  ['Multimedia', 10, 'Video controls, audio elements, and media accessibility.'],
  ['Core Web Vitals', 20, 'Largest Contentful Paint, layout shift, and blocking time.'],
  ['Analytics', 15, 'Google Analytics, tag managers, and tracking pixels.'],
  ['Mobile UX', 15, 'Tap target sizes, touch spacing, and readable font sizes.'],
  ['Schema Validation', 15, 'Schema validation for Breadcrumb, Site, and Organization.'],
  ['Resource Optimization', 15, 'Script minification, CDN usage, and caching headers.'],
  ['Legal & Compliance', 15, 'Privacy policy, terms of service, and cookie policy links.'],
  ['E-commerce', 15, 'Product schemas, checkout indicators, and trust signals.'],
  ['Internationalization', 15, 'HTML lang tags, UTF-8 charset, and localized URLs.'],
  ['Heatmap & UX', 5, 'Above the fold attention, click targets, and scroll ratio.'],
];

const COVERAGE: [string, string, number][] = [
  ['META', 'Meta Tags', 83], ['HEAD', 'Headings', 100], ['IMG', 'Images', 75],
  ['PERF', 'Performance', 67], ['ROBO', 'Robots.txt', 100], ['SITE', 'Sitemap', 100],
  ['SEC', 'Security', 100], ['SCHM', 'Structured Data', 100], ['SOCL', 'Social Media', 67],
  ['CNTT', 'Content', 86], ['LINK', 'Links', 83], ['UI', 'UI Elements', 100],
  ['TECH', 'Technical SEO', 90], ['A11Y', 'Accessibility', 50], ['URL', 'URL Factors', 100],
  ['SPAM', 'Spam Detection', 100], ['PGQ', 'Page Quality', 92], ['AIMG', 'Advanced Images', 85],
  ['MMED', 'Multimedia', 91], ['CWV', 'Core Web Vitals', 86], ['ANLY', 'Analytics', 92],
  ['MOBL', 'Mobile UX', 92], ['SCVL', 'Schema Validation', 93], ['RSRC', 'Resource Opt.', 88],
  ['LEGL', 'Legal', 92], ['ECOM', 'E-commerce', 93], ['I18N', 'i18n', 93], ['HEAT', 'Heatmap', 92],
];

const C = {
  primary: 'var(--text-primary)',
  body: 'var(--text-body)',
  muted: 'var(--text-muted)',
  faint: 'var(--text-faint)',
  ochre: 'var(--ochre-400)',
  pass: 'var(--verdict-pass)',
  fail: 'var(--verdict-fail)',
  info: 'var(--verdict-info)',
};

const TABS = [
  {
    id: 'cli', label: 'CLI', file: 'shell',
    note: 'One command, human-readable output on stderr so stdout stays clean for pipes.',
    lines: [
      ['$ aviary -u https://example.com', C.primary], ['', C.primary],
      ['Score: 91/100', C.pass], ['Total checks: 235', C.muted], ['  Passed: 214', C.pass], ['  Failed: 21', C.fail], ['', C.primary],
      ['Meta Tags:', C.body], ['  pass  Title is optimal (54 characters)', C.muted], ['  fail  Canonical URL is missing', C.fail],
    ],
  },
  {
    id: 'json', label: 'JSON', file: 'shell',
    note: 'Machine-readable payload for pipelines, dashboards and diffing between deploys.',
    lines: [
      ['$ aviary -u https://example.com --output report.json', C.primary], ['', C.primary],
      ['{', C.muted], ['  "url": "https://example.com",', C.body], ['  "score": 91,', C.ochre],
      ['  "summary": { "total": 235, "passed": 214, "failed": 21 },', C.body],
      ['  "checks": {', C.body], ['    "metaTags": [', C.body],
      ['      { "passed": false, "severity": "error",', C.body],
      ['        "message": "Canonical URL is missing" }', C.body], ['    ] } }', C.muted],
    ],
  },
  {
    id: 'html', label: 'HTML report', file: 'shell',
    note: 'A self-contained page with score, ranked issues, category overview and every check.',
    lines: [
      ['$ aviary -u https://example.com --html report.html', C.primary], ['', C.primary],
      ['HTML report saved  { path: "report.html" }', C.muted], ['', C.primary],
      ['$ open report.html', C.primary],
    ],
  },
  {
    id: 'api', label: 'TypeScript', file: 'audit.ts',
    note: 'The same engine as a library — run it inside your own tooling and read the typed report.',
    lines: [
      ["import { SEOChecker } from 'aviary';", C.ochre], ['', C.primary],
      ['const checker = new SEOChecker({', C.body], ["  url: 'https://example.com',", C.body],
      ['  headless: true,', C.body], ['});', C.body], ['', C.primary],
      ['const report = await checker.check();', C.body], ['', C.primary],
      ['console.log(report.score);          // 91', C.muted], ['console.log(report.summary.failed); // 25', C.muted],
    ],
  },
  {
    id: 'ci', label: 'CI', file: '.github/workflows/audit.yml',
    note: 'Fail a build when quality regresses, and keep the JSON report as an artifact.',
    lines: [
      ['- name: Audit rendered site', C.body], ['  run: |', C.body],
      ['    npx playwright install chromium', C.muted],
      ['    npx aviary -u $DEPLOY_URL \\', C.muted], ['      --preset strict --output report.json', C.muted], ['', C.primary],
      ['- uses: actions/upload-artifact@v4', C.body], ['  with:', C.body], ['    path: report.json', C.muted],
    ],
  },
  {
    id: 'mcp', label: 'MCP', file: 'mcp.json',
    note: 'Three tools over stdio: seo_audit, seo_score and seo_check_category.',
    lines: [
      ['{', C.muted], ['  "mcpServers": {', C.body], ['    "aviary": {', C.ochre],
      ['      "command": "node",', C.body], ['      "args": ["dist/mcp/server.js"]', C.body],
      ['    }', C.body], ['  }', C.body], ['}', C.muted],
    ],
  },
] as const;

const SPIN = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const PIPELINE = [
  { stage: 'URL', title: 'Navigate', detail: 'Playwright launches Chromium at your chosen viewport and loads the target.' },
  { stage: 'DOM', title: 'Rendered document', detail: 'Metadata, headings, schema and images are read after scripts have run.' },
  { stage: 'NETWORK', title: 'Resources & timings', detail: 'Requests, transfer weight, compression, load and DOMContentLoaded timings.' },
  { stage: 'LAYOUT', title: 'Visual hierarchy', detail: 'Above-the-fold scoring, tap targets, scroll depth and predicted attention zones.' },
  { stage: 'EXTERNAL', title: 'Site-level signals', detail: 'robots.txt, XML sitemaps, canonical targets and security response headers.' },
  { stage: 'REPORT', title: 'Structured result', detail: 'Every check as { passed, message, severity, details } plus a 0–100 score.' },
];

const CONTRAST_ISSUES = [
  { verdict: 'fail' as const, title: 'Canonical URL is missing', selector: 'head', category: 'seo' },
  { verdict: 'fail' as const, title: '7 form inputs missing labels', selector: 'form input', category: 'accessibility' },
  { verdict: 'warn' as const, title: 'Title is too long (74 characters)', selector: 'head > title', category: 'seo' },
  { verdict: 'warn' as const, title: 'Missing essential Open Graph tags: og:image', selector: 'meta[property]', category: 'seo' },
];

const STEPS = [
  { n: '01', title: 'Navigate', body: 'Launch a real browser and load the page at the viewport you specify.' },
  { n: '02', title: 'Observe', body: 'Inspect rendered content, metadata, resources and runtime behaviour.' },
  { n: '03', title: 'Analyze', body: 'Run 235 specialized checks across 28 categories, weighted by preset.' },
  { n: '04', title: 'Report', body: 'Return structured results, a score and detailed findings per check.' },
];

const TUI_CATEGORIES = [
  { name: 'Meta Tags', pass: 5, total: 6, active: true },
  { name: 'Headings', pass: 3, total: 3, active: false },
  { name: 'Images', pass: 1, total: 2, active: false },
  { name: 'A11y', pass: 2, total: 4, active: false },
];

const TUI_CHECKS = [
  { verdict: 'pass' as const, text: 'Title is optimal' },
  { verdict: 'warn' as const, text: 'Description is short' },
  { verdict: 'fail' as const, text: 'Canonical URL missing' },
];

const REPORT_ISSUES = [
  { verdict: 'fail' as const, cat: 'seo', message: 'Canonical URL is missing', selector: 'head' },
  { verdict: 'fail' as const, cat: 'accessibility', message: '7 form inputs missing labels', selector: 'form input' },
  { verdict: 'warn' as const, cat: 'seo', message: 'Title is too long (74 characters)', selector: 'head > title' },
  { verdict: 'warn' as const, cat: 'seo', message: 'Missing essential Open Graph tags: og:image', selector: 'meta[property]' },
  { verdict: 'warn' as const, cat: 'accessibility', message: 'No skip navigation link found', selector: 'body > a' },
  { verdict: 'info' as const, cat: 'performance', message: '4 images served without WebP/AVIF alternatives', selector: 'img' },
];

const SURFACES = [
  { name: 'CLI', body: 'Run audits anywhere — locally, over SSH, inside a container.', code: 'aviary -u https://example.com' },
  { name: 'TypeScript API', body: 'Integrate checks into your own applications and tests.', code: 'new SEOChecker({ url }).check()' },
  { name: 'CI', body: 'Catch quality regressions on every deploy preview.', code: 'aviary -u $DEPLOY_URL -p strict' },
  { name: 'HTML reports', body: 'Share and inspect results without a service.', code: 'aviary -u ... --html report.html' },
  { name: 'MCP', body: 'Expose auditing to AI tooling over stdio.', code: 'aviary-mcp' },
];

const NAV_LINK: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  minHeight: 44,
  minWidth: 44,
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 8px',
  textDecoration: 'none',
  transition: 'var(--transition-ui)',
};
const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 24,
};
const sectionH2: React.CSSProperties = {
  margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number,
  fontSize: 'clamp(34px, 3.4vw, 48px)', lineHeight: 1.12, color: 'var(--text-primary)',
};
const bodyP: React.CSSProperties = {
  margin: '20px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)',
  lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)',
};

export default function AviaryHome() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [tab, setTab] = useState('cli');
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [installBtnState, setInstallBtnState] = useState<'idle' | 'hover' | 'active'>('idle');
  const [codeBtnState, setCodeBtnState] = useState<'idle' | 'hover' | 'active'>('idle');
  const [tick, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const begin = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStep(0);
    setElapsed(0);
    setRunning(true);
    timerRef.current = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= HERO.length + 2) {
          if (timerRef.current) clearInterval(timerRef.current);
          setRunning(false);
        }
        return next;
      });
      setElapsed((e) => e + 0.34);
    }, 340);
  };

  useEffect(() => {
    const spin = setInterval(() => setTick((t) => t + 1), 110);
    begin();
    return () => {
      clearInterval(spin);
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = !running;
  const rows = HERO.map((c) => {
    const revealed = HERO.indexOf(c) < step;
    const fail = c.pass < c.total;
    return {
      name: c.name,
      count: revealed ? `${c.pass} / ${c.total}` : '· · ·',
      verdict: fail ? ('warn' as const) : ('pass' as const),
      revealed,
      opacity: revealed ? 1 : 0.28,
    };
  });

  const pct = Math.min(100, Math.round((step / (HERO.length + 2)) * 100));
  const tuiPct = (tick % 10) * 10;
  const filled = Math.round(tuiPct / 2.5);
  const activeTab = TABS.find((t) => t.id === tab) || TABS[0];
  const scoreValue = done ? 91 : Math.round(91 * (step / (HERO.length + 2)));

  const copyInstall = () => {
    navigator.clipboard?.writeText('npm install -g aviary');
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const copyCode = () => {
    navigator.clipboard?.writeText(activeTab.lines.map((l) => l[0]).join('\n'));
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 1400);
  };

  return (
    <div style={{ background: 'var(--surface-page)', color: 'var(--text-body)' }}>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50, background: 'var(--surface-page)',
          borderBottom: '1px solid var(--line-hairline)',
        }}
      >
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 20 }} className="sm:px-8 sm:gap-8">
          <Link href="#main-content" style={{ display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/icon.svg" alt="Aviary Logo" width="22" height="22" style={{ borderRadius: 4 }} />
            <Wordmark size={20} />
          </Link>
          <nav
            aria-label="Primary"
            className="hidden lg:flex"
            style={{
              alignItems: 'center', gap: 12, fontFamily: 'var(--font-ui)', fontSize: 14,
              letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)',
            }}
          >
            <a href="#browser" style={NAV_LINK}>Real browser</a>
            <a href="#checks" style={NAV_LINK}>Checks</a>
            <a href="#workflow" style={NAV_LINK}>Developers</a>
            <a href="#report" style={NAV_LINK}>Reports</a>
            <Link href="/docs" style={NAV_LINK}>Docs</Link>
          </nav>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>v1.0.0 · MIT</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}>
              <Button variant="secondary" size="sm">GitHub</Button>
            </a>
            <Link href="/docs" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}>
              <Button variant="primary" size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" style={{ position: 'relative' }}>
        <span id="top" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ParticleField height={560} density={0.95} fade="bottom" />
        </div>

        {/* Hero */}
        <section
          style={{
            position: 'relative', zIndex: 1, maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px 32px 128px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 56, alignItems: 'start',
          }}
        >
          <div>
            <Tag tone="neutral" dot>235 checks · 28 categories</Tag>
            <h1
              style={{
                margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number,
                fontSize: 'clamp(44px, 5vw, 68px)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)',
                color: 'var(--text-primary)', maxWidth: '18ch',
              }}
            >
              A real browser opens your site and tells you what&rsquo;s broken.
            </h1>
            <p
              itemProp="description"
              className="product-description"
              style={{ margin: '24px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)', maxWidth: '56ch' }}
            >
              SEO, speed, code quality, safety, and UX checks in a real web browser. Aviary runs Chromium to test what users and search bots see on your site. Fast. Clear. Accurate.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Link href="/docs" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}>
                <Button variant="primary" size="lg" data-cta="primary" role="button">
                  Get started
                </Button>
              </Link>{' '}
              <Link href="/docs" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}>
                <Button variant="secondary" size="lg">Documentation</Button>
              </Link>{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}>
                <Button variant="ghost" size="lg">GitHub</Button>
              </a>
            </div>
            <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--line-default)', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', maxWidth: 480 }}>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>$</span>
              <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-primary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                npm install -g aviary
              </code>
              <button
                type="button"
                onClick={copyInstall}
                aria-label="Copy install command"
                onMouseEnter={() => setInstallBtnState('hover')}
                onMouseLeave={() => setInstallBtnState('idle')}
                onMouseDown={() => setInstallBtnState('active')}
                onMouseUp={() => setInstallBtnState('hover')}
                style={{
                  background: installBtnState === 'active' ? 'var(--surface-active)' : installBtnState === 'hover' ? 'var(--surface-hover)' : 'none',
                  border: `1px solid ${installBtnState === 'idle' ? 'var(--line-strong)' : 'var(--line-default)'}`,
                  color: installBtnState === 'idle' ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-ui)', fontSize: 14, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                  minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 12px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', transition: 'var(--transition-ui)',
                }}
              >
                {copied ? 'copied' : 'copy'}
              </button>
            </div>
            <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>
              Chromium via Playwright · Node ≥ 14 · JSON / HTML / TUI / MCP
            </p>
          </div>

          <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-sunken)', border: '1px solid var(--line-default)', borderRadius: 'var(--radius-xs)', padding: '4px 10px', fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-muted)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: done ? 'var(--verdict-pass)' : 'var(--verdict-warn)' }} />
                https://example.com
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-faint)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase' }}>
                Chromium 1920×1080
              </span>
            </div>

            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: done ? C.pass : C.ochre }}>
                  {done ? 'Audit complete' : 'Running audit'}
                </span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>{elapsed.toFixed(1)} s</span>
              </div>

              <div style={{ height: 2, background: 'var(--line-hairline)', overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ height: '100%', background: 'var(--ochre-400)', width: `${pct}%`, transition: 'width 420ms var(--ease-standard)' }} />
              </div>

              {rows.map((row) => (
                <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 16, height: 36, borderBottom: '1px solid var(--line-hairline)', opacity: row.opacity, transition: 'opacity 220ms var(--ease-standard)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-body)' }}>{row.name}{' '}</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{' '}{row.count}{' '}</span>
                  <span style={{ width: 20, display: 'flex', justifyContent: 'center' }}>
                    {row.revealed ? <VerdictBadge verdict={row.verdict} compact /> : null}
                  </span>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                <span>+ 20 categories{' '}</span>
                <span>{' '}{done ? '175 / 189 passed' : 'queued'}</span>
              </div>

              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--line-hairline)', display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ScoreDial score={scoreValue} label="Score" size={76} />
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text-muted)', maxWidth: '22ch', lineHeight: 'var(--leading-normal)' }}>
                    {done ? '214 passed · 21 failed · 235 total' : 'chromium 1920×1080 · preset advanced'}
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={begin}>{running ? 'RUNNING' : 'RE-RUN AUDIT'}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 01 The problem */}
        <section style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={labelStyle}>01 — The problem</div>
              <h2 style={sectionH2}>
                E2E tests miss what search engines and screen readers see.
              </h2>
              <p style={bodyP}>
                Your suite confirms checkout works. It won&rsquo;t catch missing canonical URLs, unlabeled inputs, or broken sitemaps.
              </p>
              <p style={{ ...bodyP, margin: '16px 0 0', maxWidth: '54ch' }}>
                Aviary reads the same DOM, resources, and timings your visitors see — and shows what&rsquo;s wrong.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', background: 'var(--surface-card)', display: 'flex', alignItems: 'center', gap: 14, height: 36 }}>
                <VerdictBadge verdict="pass" />
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-body)' }}>checkout.spec.ts — 42 tests</span>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-faint)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>same page, inspected</div>
              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
                {CONTRAST_ISSUES.map((i) => (
                  <IssueRow key={i.title} verdict={i.verdict} title={i.title} selector={i.selector} category={i.category} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 Real browser */}
        <section id="browser" style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>02 — Real browser</div>
            <h2 style={{ ...sectionH2, maxWidth: '24ch' }}>Every check runs against the rendered document.</h2>
            <p style={{ ...bodyP, maxWidth: 640 }}>
              Chromium loads your URL with Playwright. It waits for scripts to settle. Then it reads the live DOM. It checks rendered meta tags, schema data, lazy images, and real timings.
            </p>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 28, alignItems: 'stretch' }}>
              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase' }}>
                  Rendered viewport
                </div>
                <div style={{ position: 'relative', padding: 16, height: 300, overflow: 'hidden' }}>
                  {/* Nav */}
                  <div style={{ height: 34, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 'var(--radius-xs)', background: 'var(--line-strong)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }} />
                    {[30, 30, 30].map((w, i) => (
                      <div key={i} style={{ width: w, height: 6, borderRadius: 'var(--radius-full)', background: 'var(--line-default)' }} />
                    ))}
                  </div>

                  {/* Hero */}
                  <div style={{ height: 96, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', marginBottom: 12, padding: 16 }}>
                    <div style={{ width: '62%', height: 10, borderRadius: 'var(--radius-full)', background: 'var(--line-strong)' }} />
                    <div style={{ width: '42%', height: 10, borderRadius: 'var(--radius-full)', background: 'var(--line-strong)', marginTop: 8 }} />
                    <div style={{ width: '28%', height: 6, borderRadius: 'var(--radius-full)', background: 'var(--line-default)', marginTop: 10 }} />
                    <div style={{ width: 64, height: 14, borderRadius: 'var(--radius-xs)', border: '1px solid var(--line-strong)', marginTop: 8 }} />
                  </div>

                  {/* Content cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ height: 70, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 30, background: 'var(--field-grain)', backgroundSize: 'var(--field-grain-size)' }} />
                        <div style={{ flex: 1, padding: '7px 8px', display: 'grid', gap: 4, alignContent: 'center' }}>
                          <div style={{ width: '80%', height: 5, borderRadius: 'var(--radius-full)', background: 'var(--line-default)' }} />
                          <div style={{ width: '55%', height: 5, borderRadius: 'var(--radius-full)', background: 'var(--line-hairline)' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detected-issue annotations, pinned to what they actually describe */}
                  <div style={{ position: 'absolute', left: 40, top: 80, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cat-seo)', boxShadow: '0 0 0 3px rgba(224,177,90,.16)' }} />
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 10, color: 'var(--cat-seo)' }}>h1 too long</span>
                  </div>
                  <div style={{ position: 'absolute', left: 108, top: 128, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cat-ux)', boxShadow: '0 0 0 3px rgba(169,139,176,.16)' }} />
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 10, color: 'var(--cat-ux)' }}>tap target &lt;44px</span>
                  </div>
                  <div style={{ position: 'absolute', left: 56, top: 190, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cat-accessibility)', boxShadow: '0 0 0 3px rgba(127,168,189,.16)' }} />
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 10, color: 'var(--cat-accessibility)' }}>missing alt text</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 0, alignContent: 'start' }}>
                {PIPELINE.map((step) => (
                  <div key={step.stage} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 18, padding: '14px 0', borderBottom: '1px solid var(--line-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--ochre-400)', paddingTop: 3 }}>{step.stage}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>{step.title}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)', marginTop: 4 }}>{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 Coverage */}
        <section id="checks" style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={labelStyle}>03 — Coverage</div>
                <h2 style={{ ...sectionH2, maxWidth: '22ch' }}>235 checks, grouped into 28 inspection categories.</h2>
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)', maxWidth: '44ch' }}>
                Turn categories on/off, or weight them, in config — or grab a preset:{' '}
                <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>basic</code>,{' '}
                <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>advanced</code> and{' '}
                <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>strict</code>.
              </p>
            </div>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(210px, 100%), 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
              {CATEGORIES.map(([label, total, sample]) => (
                <div key={label} style={{ background: 'var(--surface-page)', padding: 16, transition: 'background 140ms var(--ease-standard)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{label}{' '}</span>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>{' '}{total}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.45 }}>{' '}{sample}{' '}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 How it works */}
        <section id="workflow" style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>04 — How it works</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{ background: 'var(--surface-page)', padding: '24px 20px 28px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 'var(--tracking-caps)', color: 'var(--ochre-400)' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-medium)' as unknown as number, color: 'var(--text-primary)', marginTop: 16 }}>{s.title}</div>
                  <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{s.body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 40, alignItems: 'start' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
                  One engine, five ways to run it.
                </h2>
                <p style={{ margin: '18px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)', maxWidth: '48ch' }}>
                  The CLI, TypeScript API, terminal dashboard, and MCP server all call the same checker modules — no logic rewritten four times.
                </p>
                <div style={{ marginTop: 26 }}>
                  <Tabs items={TABS.map((t) => ({ value: t.id, label: t.label }))} value={tab} onChange={setTab} />
                </div>
                <p style={{ margin: '22px 0 0', fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)', maxWidth: '48ch' }}>
                  {activeTab.note}
                </p>
              </div>

              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)' }}>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-muted)' }}>{activeTab.file}</span>
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label="Copy code sample"
                    onMouseEnter={() => setCodeBtnState('hover')}
                    onMouseLeave={() => setCodeBtnState('idle')}
                    onMouseDown={() => setCodeBtnState('active')}
                    onMouseUp={() => setCodeBtnState('hover')}
                    style={{
                      background: codeBtnState === 'active' ? 'var(--surface-active)' : codeBtnState === 'hover' ? 'var(--surface-hover)' : 'none',
                      border: `1px solid ${codeBtnState === 'idle' ? 'var(--line-strong)' : 'var(--line-default)'}`,
                      color: codeBtnState === 'idle' ? 'var(--text-muted)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-ui)', fontSize: 14, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                      minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      padding: '0 12px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', transition: 'var(--transition-ui)',
                    }}
                  >
                    {codeCopied ? 'copied' : 'copy'}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: 16, overflowX: 'auto', fontFamily: 'var(--font-code)', fontSize: 14, lineHeight: 1.55 }}>
                  {activeTab.lines.map((l, i) => (
                    <div key={i} style={{ color: l[1], whiteSpace: 'pre' }}>{l[0] === '' ? ' ' : l[0]}</div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Terminal dashboard */}
        <section style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={labelStyle}>05 — Terminal dashboard</div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', lineHeight: 1.15, color: 'var(--text-primary)', maxWidth: '22ch' }}>
                Run <code style={{ fontFamily: 'var(--font-code)', fontSize: '0.8em', color: 'var(--ochre-400)' }}>aviary</code> with no arguments and you get a dashboard.
              </h2>
              <p style={{ ...bodyP, maxWidth: '52ch' }}>
                A full-screen TUI written in Rust — enter a URL, pick a preset and output path, and run it. Results open in a two-pane browser: categories left, checks right, details below, with severity filters on{' '}
                <kbd style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>A</kbd> /{' '}
                <kbd style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>E</kbd> /{' '}
                <kbd style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>W</kbd>.
              </p>
            </div>

            <div style={{ background: 'var(--surface-terminal)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 20, fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.55 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-primary)' }}>AVIARY AUDIT ENGINE v1.0</span>
                <span style={{ color: 'var(--text-faint)' }}>[ESC:QUIT]</span>
              </div>
              <div style={{ height: 1, background: 'var(--line-hairline)', margin: '10px 0 20px' }} />
              <div style={{ border: '1px solid var(--line-default)', position: 'relative', padding: 16 }}>
                <span style={{ position: 'absolute', top: -8, left: 12, background: 'var(--surface-terminal)', padding: '0 6px', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--ochre-400)' }}>
                  Audit in progress
                </span>
                <div><span style={{ color: 'var(--ochre-400)' }}>{SPIN[tick % 10]}</span> <span>Browser launched, running checks</span></div>
                <div style={{ height: 12 }} />
                <div style={{ color: 'var(--verdict-pass)', whiteSpace: 'nowrap', overflow: 'hidden' }}>{'[' + '▓'.repeat(filled) + '░'.repeat(40 - filled) + ']'}</div>
                <div style={{ height: 12 }} />
                <div><span style={{ color: 'var(--text-faint)' }}>ELAPSED: </span><span style={{ color: 'var(--text-primary)' }}>{'00:' + String(8 + (tick % 10)).padStart(2, '0')}</span></div>
              </div>

              <div style={{ height: 12 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '124px 1fr', border: '1px solid var(--line-default)' }}>
                <div style={{ borderRight: '1px solid var(--line-default)', padding: '8px 10px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', color: 'var(--text-faint)', marginBottom: 6 }}>CATEGORIES</div>
                  {TUI_CATEGORIES.map((c) => (
                    <div key={c.name} style={{ display: 'flex', gap: 4, fontSize: 14, color: c.active ? 'var(--ochre-400)' : 'var(--text-muted)' }}>
                      <span style={{ width: 8 }}>{c.active ? '>' : ''}</span>
                      <span style={{ flex: 1 }}>{c.name}</span>
                      <span style={{ color: c.pass < c.total ? 'var(--verdict-warn)' : 'var(--verdict-pass)' }}>{c.pass}/{c.total}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', color: 'var(--text-faint)', marginBottom: 6 }}>CHECKS — META TAGS</div>
                  {TUI_CHECKS.map((c) => (
                    <div key={c.text} style={{ fontSize: 14, color: c.verdict === 'pass' ? 'var(--verdict-pass)' : c.verdict === 'warn' ? 'var(--verdict-warn)' : 'var(--verdict-fail)' }}>
                      {c.verdict}  {c.text}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--line-hairline)', margin: '20px 0 10px' }} />
              <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>
                <span style={{ color: 'var(--text-body)' }}>TAB</span>: NEXT ·{' '}
                <span style={{ color: 'var(--text-body)' }}>ENTER</span>: LAUNCH ·{' '}
                <span style={{ color: 'var(--text-body)' }}>A/E/W</span>: FILTER ·{' '}
                <span style={{ color: 'var(--text-body)' }}>ESC</span>: QUIT
              </div>
            </div>
          </div>
        </section>

        {/* 06 Reports */}
        <section id="report" style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>06 — Reports</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', lineHeight: 1.15, color: 'var(--text-primary)', maxWidth: '26ch' }}>
              One HTML file. Open it, commit it, or bolt it onto a build.
            </h2>
            <p style={{ ...bodyP, maxWidth: 640 }}>
              Score and grade up top, a ranked list of fixes, a per-category breakdown, then every check with its severity and raw JSON.
            </p>

            <div style={{ marginTop: 48, maxWidth: 640 }}>
              <figure style={{ margin: 0 }}>
                <figcaption style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--ochre-400)', marginBottom: 12 }}>
                  report.html
                </figcaption>
                <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--surface-card)', minHeight: 560 }}>
                  <div style={{ borderBottom: '1px solid var(--line-hairline)', padding: 16, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    <ScoreDial score={91} label="Score" size={88} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-primary)', wordBreak: 'break-all' }}>https://example.com</div>
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)', marginTop: 4 }}>2026-08-30T09:14:02Z · preset advanced · chromium 1920×1080</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        <Tag tone="pass">214 passed</Tag>{' '}
                        <Tag tone="fail">21 failed</Tag>{' '}
                        <Tag tone="neutral">235 total</Tag>
                      </div>
                      <div style={{ display: 'flex', height: 3, marginTop: 12, overflow: 'hidden', background: 'var(--line-hairline)' }}>
                        <div style={{ width: '91.1%', background: 'var(--verdict-pass)' }} />
                        <div style={{ width: '8.9%', background: 'var(--verdict-fail)' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 8 }}>
                      Failures by severity
                    </div>
                    {REPORT_ISSUES.map((i) => (
                      <IssueRow key={i.message} verdict={i.verdict} title={i.message} selector={i.selector} category={i.cat} />
                    ))}
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '20px 0 8px' }}>
                      Category coverage
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(84px, 100%), 1fr))', gap: 4 }}>
                      {COVERAGE.map(([abbr, label, pctVal]) => {
                        const color = pctVal >= 90 ? C.pass : pctVal >= 70 ? C.ochre : C.fail;
                        return (
                          <div key={abbr} title={label} style={{ height: 34, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', position: 'relative', overflow: 'hidden', background: 'var(--surface-sunken)' }}>
                            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${pctVal}%`, background: color, opacity: 0.16 }} />
                            <span style={{ position: 'absolute', left: 6, top: 5, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{abbr}{' '}</span>
                            <span style={{ position: 'absolute', right: 6, bottom: 4, fontFamily: 'var(--font-code)', fontSize: 12, color }}>{' '}{pctVal}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* 07 Surfaces */}
        <section style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>07 — Surfaces</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
              {SURFACES.map((s) => (
                <div key={s.name} style={{ background: 'var(--surface-page)', padding: '24px 20px 28px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)' as unknown as number, color: 'var(--text-primary)' }}>{s.name}</div>
                  <p style={{ margin: '8px 0 16px', fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{s.body}</p>
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.code}</code>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 32, alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', lineHeight: 1.15, color: 'var(--text-primary)' }}>Let an agent run the audit for you</h2>
                <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)', maxWidth: '48ch' }}>
                  Three tools over stdio —{' '}
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>seo_audit</code>,{' '}
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>seo_score</code>,{' '}
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--ochre-400)' }}>seo_check_category</code> — so an agent can audit a URL and read the result directly.
                </p>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', padding: 16 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 8 }}>tools/call</div>
                  <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)', whiteSpace: 'pre-wrap' }}>{`{ "name": "seo_score",
  "arguments": { "url": "https://example.com" } }`}</pre>
                </div>
                <div style={{ border: '1px solid var(--line-default)', borderRadius: 'var(--radius-sm)', background: 'var(--verdict-warn-bg)', padding: 16 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--ochre-400)', marginBottom: 8 }}>result</div>
                  <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)', whiteSpace: 'pre-wrap' }}>{`{ "url": "https://example.com",
  "score": 91, "grade": "A",
  "passed": 214, "failed": 21, "total": 235 }`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 Architecture & Documentation Overview */}
        <section id="architecture" style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-page)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>08 — Deep Technical Auditing</div>
            <h2 style={{ ...sectionH2, maxWidth: '28ch' }}>
              Built for modern web applications and static sites alike.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 24, marginTop: 48 }}>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>Real Rendered DOM Audits</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Most modern web pages use React or Vue. They build the page with client code. Old tools only check raw HTML files on disk. Aviary is different. It starts a real browser. It waits for the full page to load. It checks what users see. It checks what search bots see.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>Complete Technical SEO</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Aviary checks your title tags. It checks meta tags. It checks your robots file. It checks your sitemap. It warns you if titles are too long. It warns you if meta tags are missing. It makes sure search bots can crawl your pages with ease.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>Performance and Web Vitals</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Fast pages keep users happy. Aviary measures your load time in real time. It checks your First Contentful Paint. It checks your Largest Contentful Paint. It checks script sizes and CSS files. It flags large images and slow network requests so you can speed up your site.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>Accessibility and Mobile Usability</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Good sites work well on all devices. Aviary tests your buttons and links. It makes sure every tap target is easy to press on a phone. It checks font sizes so your text is clear to read. It checks image alt text so screen readers can read your page.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>Security and Trust</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Keep your users safe. Aviary checks that your site uses HTTPS. It checks your security headers. It checks for a privacy policy and terms of service. It makes sure your checkout links and forms are safe.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>CI and CD Automation</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Run Aviary on every pull request. You can set a score goal like ninety. If a pull request breaks your score, the build stops. This stops bugs before they reach your users. You can also save audit reports as JSON files.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 09 Frequently Asked Questions */}
        <section id="faq" style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>09 — Questions &amp; Answers</div>
            <h2 style={{ ...sectionH2, maxWidth: '28ch' }}>
              Frequently asked questions about technical auditing.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 24, marginTop: 48 }}>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>Why is a real browser required for technical auditing?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Most modern websites use React or Next.js. They render with client code. Old HTTP tools do not run scripts. They miss dynamic meta tags. They miss structured schema data. Aviary runs a real headless browser. It waits for scripts to finish. It inspects what users and bots see.
                </p>
              </div>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>How does Aviary measure Core Web Vitals and load speed?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Aviary tracks real browser performance. It tracks First Contentful Paint. It tracks Largest Contentful Paint. It tracks Layout Shift. It also monitors script blocking time. You get clear diagnostics on heavy scripts and slow response times.
                </p>
              </div>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>How are tap targets and mobile readability evaluated?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Mobile usability is critical. Aviary checks every clickable button and link. Each tap target must be forty-four pixels tall and wide. If buttons are too small or clustered too closely, Aviary flags them. It also checks that your body text is at least fourteen pixels so it is easy to read.
                </p>
              </div>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>How does the weighted scoring system calculate scores?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Not all bugs are equal. Critical errors carry more weight than standard warnings. Minor notices carry a small weight. Aviary normalizes your overall score from zero to one hundred based on passed checks. This ensures critical bugs are surfaced right away.
                </p>
              </div>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>Can I run Aviary in automated CI and CD pipelines?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Yes. Aviary works in GitHub Actions and pre-commit hooks. You can set a minimum score threshold such as ninety. If your audit score falls below the threshold, Aviary exits with a non-zero code. This prevents regressions from reaching production.
                </p>
              </div>
              <div style={{ background: 'var(--surface-page)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>How do AI coding assistants interact with Aviary via MCP?</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Aviary supports the Model Context Protocol. AI coding tools can invoke website audits directly. The agent can request a quick score or run an in-depth category check. This allows coding agents to audit preview deployments and fix bugs on their own.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10 Step-by-Step Audit Guide & Best Practices */}
        <section id="guide" style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-page)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px 32px' }}>
            <div style={labelStyle}>10 — Audit Guide &amp; Best Practices</div>
            <h2 style={{ ...sectionH2, maxWidth: '28ch' }}>
              How to audit and fix a website step by step.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24, marginTop: 48 }}>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 01</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Run the first web audit</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  There is no need to install anything first. Open a terminal. Run npx aviary with the web link. Aviary launches Chromium in the background. It loads the page just like a real user. It checks more than two hundred rules across twenty-eight categories. It finishes in less than ten seconds.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 02</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Inspect the audit score</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  When the audit is done, a clean score is displayed. The score is between zero and one hundred. Aviary prints a summary table in the terminal. See how many checks passed. See how many checks failed. Identify which rules need attention. Export a full JSON report to share with team members.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 03</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Fix failing rules fast</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Each failing rule gives a clear tip. If the page title is too short, the tip gives the best character count. If an image lacks alt text, Aviary shows the exact tag. If a button is too small on mobile, Aviary specifies the height and width to set. Apply the fix in the code. Run Aviary again to see the score increase.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 04</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Automate in CI pipelines</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Stop new bugs from slipping into the main branch. Add Aviary to the build step in GitHub Actions. Set a minimum score threshold like ninety-five. If a pull request causes the score to drop, the build will fail. This protects users and keeps search rankings high.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 05</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Track metrics over time</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Check the site score after each release. Watch core web vitals. Make sure page speed stays fast. Fix broken links right away. Keep meta tags fresh. Good habits lead to high search ranks and happy users.
                </p>
              </div>
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', marginBottom: 8 }}>STEP 06</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)' }}>Share reports with teams</h3>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  Export JSON and HTML audit files. Share them in pull requests or team chats. Show designers which tap targets need more space. Show developers which scripts block the main thread. Clear data makes team work easy.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 48, background: 'var(--surface-sunken)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', padding: 28 }}>
              <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>Web Auditing Best Practices</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 20 }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Keep titles short and clear</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Aim for thirty to sixty characters. State what the page does. Include primary keywords early in the title.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Provide good meta descriptions</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Keep descriptions between one hundred twenty and one hundred sixty characters. Give users a clear reason to click.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Make all touch targets forty-four pixels</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Buttons must be easy to tap on phones. Provide ample spacing between adjacent links to avoid miss-clicks.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Always use HTTPS and secure headers</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Encrypt all traffic. Use Strict Transport Security and Content Security Policy headers to protect users.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Structure heading levels logically</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Use one unique H1 per page. Nest H2 and H3 tags in order. Headings help both readers and search bots understand page topics quickly.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Optimize images and media files</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Compress images before publishing. Provide descriptive alt text for accessibility. Set explicit dimensions to prevent layout shifts during page load.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Verify canonical links and sitemaps</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Point canonical tags to primary URLs. Keep XML sitemaps up to date. Sitemaps ensure search engine crawlers find every important page on the site.
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Test page performance regularly</h4>
                  <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    Run audits before and after every major code release. Monitor Core Web Vitals to keep load times fast and user bounce rates low.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line-hairline)' }}>
                <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--text-primary)' }}>Core audit areas for web teams</h4>
                <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                  SEO checks help search bots find and index web pages. Speed checks help pages load fast on all phones and networks. Mobile UX checks make buttons easy to tap. Accessibility checks let screen readers read page content with ease. Security checks ensure links and forms protect user privacy at all times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px 32px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>
                Check the page your users are loading.
              </h2>
              <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>MIT licensed. Runs on your machine, in CI, or behind an agent.</p>
              <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>npx aviary -u https://example.com</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/docs" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}><Button variant="primary" size="lg" data-cta="bottom" role="button">Read the docs</Button></Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, minWidth: 44, alignItems: 'center' }}><Button variant="secondary" size="lg">Star on GitHub</Button></a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--line-hairline)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 32 }}>
          <div>
            <Wordmark size={20} />
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text-faint)', lineHeight: 'var(--leading-loose)', maxWidth: '28ch' }}>
              Real, rendered-page audits, in a real browser. On npm as <code style={{ fontFamily: 'var(--font-code)', fontSize: 14 }}>aviary</code>.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Product</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 14 }}>
              <a href="#browser" style={NAV_LINK}>Real browser</a>
              <a href="#checks" style={NAV_LINK}>Checks</a>
              <a href="#report" style={NAV_LINK}>Reports</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Docs</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 14 }}>
              <Link href="/docs" style={NAV_LINK}>Getting started</Link>
              <Link href="/docs?doc=accuracy-limitations" style={NAV_LINK}>Accuracy limitations</Link>
              <Link href="/docs?doc=roadmap" style={NAV_LINK}>Roadmap</Link>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Project</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 14 }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={NAV_LINK}>GitHub</a>
              <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" style={NAV_LINK}>Issues</a>
              <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" style={NAV_LINK}>MIT License</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Legal</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 14 }}>
              <Link href="/docs?doc=privacy" style={NAV_LINK}>Privacy Policy</Link>
              <Link href="/docs?doc=terms" style={NAV_LINK}>Terms of Service</Link>
              <Link href="/docs?doc=cookies" style={NAV_LINK}>Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '18px 32px', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span>© 2026 Aviary contributors · All rights reserved.</span>
              <time dateTime="2026-09-05" style={{ color: 'var(--text-faint)' }}>Updated September 2026</time>
              <div className="secure secure-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="ssl" style={{ color: 'var(--lichen-400)' }}>🔒 SSL encrypted &amp; secure payment verification.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg"
                  alt="Rust high-performance engine"
                  width={16}
                  height={16}
                  style={{ width: 16, height: 16, verticalAlign: 'middle' }}
                />
                <span>Rust &amp; Chromium engine</span>
              </span>
              <span>235 checks · 28 categories</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
