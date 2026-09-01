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
  ['Meta Tags', 6, 'title · description · og · canonical'],
  ['Headings', 3, 'h1 presence · hierarchy · length'],
  ['Images', 2, 'alt text · src validity · dimensions'],
  ['Performance', 2, 'load time · DCL · first paint'],
  ['Robots.txt', 2, 'reachable · directives · sitemap ref'],
  ['Sitemap', 2, 'discovery · format · entries'],
  ['Security', 3, 'https · mixed content · headers'],
  ['Structured Data', 3, 'JSON-LD · microdata · parsing'],
  ['Social Media', 3, 'twitter cards · open graph'],
  ['Content', 4, 'word count · readability · ratio'],
  ['Links', 3, 'internal · external · nofollow'],
  ['UI Elements', 4, 'favicon · breadcrumbs · lang'],
  ['Technical SEO', 4, 'status · redirects · compression'],
  ['Accessibility', 4, 'aria · form labels · tab order'],
  ['URL Factors', 10, 'length · depth · readability'],
  ['Spam Detection', 15, 'hidden text · stuffing · cloaking'],
  ['Page Quality', 15, 'duplication · freshness · E-A-T'],
  ['Advanced Images', 10, 'responsive · lazy · webp'],
  ['Multimedia', 10, 'video · audio · captions'],
  ['Core Web Vitals', 20, 'timings · requests · weight'],
  ['Analytics', 15, 'GA · GTM · pixels · verification'],
  ['Mobile UX', 15, 'tap targets · viewport · PWA'],
  ['Schema Validation', 15, 'product · article · organization'],
  ['Resource Optimization', 15, 'minification · CDN · fonts'],
  ['Legal & Compliance', 15, 'privacy · GDPR · cookies'],
  ['E-commerce', 15, 'products · pricing · checkout'],
  ['Internationalization', 15, 'hreflang · locales · unicode'],
  ['Heatmap & UX', 5, 'click map · scroll depth · CTA'],
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

const NAV_LINK: React.CSSProperties = { color: 'var(--text-muted)' };
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
      mark: revealed ? (fail ? '!' : '✓') : '',
      color: fail ? C.ochre : C.pass,
      opacity: revealed ? 1 : 0.28,
    };
  });

  const pct = Math.min(100, Math.round((step / (HERO.length + 2)) * 100));
  const tuiPct = (tick % 10) * 10;
  const filled = Math.round(tuiPct / 2.5);
  const activeTab = TABS.find((t) => t.id === tab) || TABS[0];
  const scoreValue = done ? 91 : Math.round(91 * (step / (HERO.length + 2)));

  const copyInstall = () => {
    navigator.clipboard?.writeText('npx aviary -u https://example.com');
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
          <Link href="#top" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Wordmark size={20} />
          </Link>
          <nav
            aria-label="Primary"
            className="hidden lg:flex"
            style={{
              alignItems: 'center', gap: 22, fontFamily: 'var(--font-ui)', fontSize: 10,
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
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-code)', fontSize: 12, color: 'var(--text-faint)' }}>v1.0.0 · MIT</span>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden sm:inline-flex" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="sm">GitHub</Button>
            </a>
            <Link href="/docs" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main id="top" style={{ position: 'relative' }}>
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
            <p style={{ margin: '24px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)', maxWidth: '56ch' }}>
              SEO, performance, accessibility, security, and UX — checked after your JavaScript runs, not before.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Link href="/docs" style={{ textDecoration: 'none' }}><Button variant="primary" size="lg">Get started</Button></Link>
              <Link href="/docs" style={{ textDecoration: 'none' }}><Button variant="secondary" size="lg">Documentation</Button></Link>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><Button variant="ghost" size="lg">GitHub</Button></a>
            </div>
            <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--line-default)', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', maxWidth: 480 }}>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-faint)' }}>$</span>
              <code style={{ fontFamily: 'var(--font-code)', fontSize: 14, color: 'var(--text-primary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                npx aviary -u https://example.com
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
                  fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', transition: 'var(--transition-ui)',
                }}
              >
                {copied ? 'copied' : 'copy'}
              </button>
            </div>
            <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>
              Chromium via Playwright · Node ≥ 14 · JSON / HTML / TUI / MCP
            </p>
          </div>

          <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-sunken)', border: '1px solid var(--line-default)', borderRadius: 'var(--radius-xs)', padding: '4px 10px', fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--verdict-pass)' }} />
                https://example.com
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase' }}>
                Chromium 1920×1080
              </span>
            </div>

            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: done ? C.pass : C.ochre }}>
                  {done ? 'Audit complete' : 'Running audit'}
                </span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>{elapsed.toFixed(1)} s</span>
              </div>

              <div style={{ height: 2, background: 'var(--line-hairline)', overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ height: '100%', background: 'var(--ochre-400)', width: `${pct}%`, transition: 'width 420ms var(--ease-standard)' }} />
              </div>

              {rows.map((row) => (
                <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 16, height: 36, borderBottom: '1px solid var(--line-hairline)', opacity: row.opacity, transition: 'opacity 220ms var(--ease-standard)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-body)' }}>{row.name}</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{row.count}</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, width: 14, textAlign: 'center', color: row.color }}>{row.mark}</span>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                <span>+ 20 more categories</span>
                <span>{done ? '175 / 189 passed' : 'queued'}</span>
              </div>

              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--line-hairline)', display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ScoreDial score={scoreValue} label="Score" size={76} />
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', maxWidth: '22ch', lineHeight: 'var(--leading-normal)' }}>
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
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 64, alignItems: 'center' }}>
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
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px' }}>
            <div style={labelStyle}>02 — Real browser</div>
            <h2 style={{ ...sectionH2, maxWidth: '24ch' }}>Every check runs against the rendered document.</h2>
            <p style={{ ...bodyP, maxWidth: 640 }}>
              Chromium loads your URL via Playwright, waits for it to settle, then reads the live DOM — JS-rendered metadata, injected schema, lazy images, real timings.
            </p>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 28, alignItems: 'stretch' }}>
              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase' }}>
                  Rendered viewport
                </div>
                <div style={{ position: 'relative', padding: 16, height: 300, overflow: 'hidden' }}>
                  <div style={{ height: 34, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', marginBottom: 12, background: 'var(--field-grain)', backgroundSize: 'var(--field-grain-size)' }} />
                  <div style={{ height: 96, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', marginBottom: 12, background: 'var(--field-grain)', backgroundSize: 'var(--field-grain-size)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                    hero region
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ height: 70, border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-xs)', background: 'var(--field-grain)', backgroundSize: 'var(--field-grain-size)' }} />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', left: 32, top: 78, width: 6, height: 6, borderRadius: '50%', background: 'var(--ochre-400)' }} />
                  <div style={{ position: 'absolute', right: 48, top: 148, width: 6, height: 6, borderRadius: '50%', background: 'var(--vermilion-400)' }} />
                  <div style={{ position: 'absolute', left: 96, bottom: 44, width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-blue-400)' }} />
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
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px' }}>
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
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>{total}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.45 }}>{sample}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 How it works */}
        <section id="workflow" style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px' }}>
            <div style={labelStyle}>04 — How it works</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{ background: 'var(--surface-page)', padding: '24px 20px 28px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', color: 'var(--ochre-400)' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-medium)' as unknown as number, color: 'var(--text-primary)', marginTop: 16 }}>{s.title}</div>
                  <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{s.body}</p>
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
                <p style={{ margin: '22px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-loose)', color: 'var(--text-muted)', maxWidth: '48ch' }}>
                  {activeTab.note}
                </p>
              </div>

              <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--line-hairline)' }}>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-muted)' }}>{activeTab.file}</span>
                  <button
                    type="button"
                    onClick={copyCode}
                    onMouseEnter={() => setCodeBtnState('hover')}
                    onMouseLeave={() => setCodeBtnState('idle')}
                    onMouseDown={() => setCodeBtnState('active')}
                    onMouseUp={() => setCodeBtnState('hover')}
                    style={{
                      background: codeBtnState === 'active' ? 'var(--surface-active)' : codeBtnState === 'hover' ? 'var(--surface-hover)' : 'none',
                      border: `1px solid ${codeBtnState === 'idle' ? 'var(--line-strong)' : 'var(--line-default)'}`,
                      color: codeBtnState === 'idle' ? 'var(--text-muted)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', transition: 'var(--transition-ui)',
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
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 56, alignItems: 'center' }}>
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
              <div style={{ height: 1, background: 'var(--line-hairline)', margin: '20px 0 10px' }} />
              <div style={{ color: 'var(--text-faint)' }}>
                <span style={{ color: 'var(--text-body)' }}>TAB</span>:NEXT{'  '}
                <span style={{ color: 'var(--text-body)' }}>ENTER</span>:LAUNCH{'  '}
                <span style={{ color: 'var(--text-body)' }}>←/→</span>:PRESET{'  '}
                <span style={{ color: 'var(--text-body)' }}>ESC</span>:QUIT
              </div>
            </div>
          </div>
        </section>

        {/* 06 Reports */}
        <section id="report" style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px' }}>
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
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)', marginTop: 4 }}>2026-08-30T09:14:02Z · preset advanced · chromium 1920×1080</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        <Tag tone="pass">214 passed</Tag>
                        <Tag tone="fail">21 failed</Tag>
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
                            <span style={{ position: 'absolute', left: 6, top: 5, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{abbr}</span>
                            <span style={{ position: 'absolute', right: 6, bottom: 4, fontFamily: 'var(--font-code)', fontSize: 12, color }}>{pctVal}%</span>
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
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '128px 32px' }}>
            <div style={labelStyle}>07 — Surfaces</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
              {SURFACES.map((s) => (
                <div key={s.name} style={{ background: 'var(--surface-page)', padding: '24px 20px 28px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)' as unknown as number, color: 'var(--text-primary)' }}>{s.name}</div>
                  <p style={{ margin: '8px 0 16px', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{s.body}</p>
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--ochre-400)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.code}</code>
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

        {/* Final CTA */}
        <section style={{ borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px 32px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number, fontSize: 'var(--display-sm)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>
                Check the page your users are loading.
              </h2>
              <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>MIT licensed. Runs on your machine, in CI, or behind an agent.</p>
              <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>npx aviary -u https://example.com</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/docs" style={{ textDecoration: 'none' }}><Button variant="primary" size="lg">Read the docs</Button></Link>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><Button variant="secondary" size="lg">Star on GitHub</Button></a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--line-hairline)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(170px, 100%), 1fr))', gap: 32 }}>
          <div>
            <Wordmark size={20} />
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', lineHeight: 'var(--leading-loose)', maxWidth: '28ch' }}>
              Real, rendered-page audits, in a real browser. On npm as <code style={{ fontFamily: 'var(--font-code)', fontSize: 13 }}>aviary</code>.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Product</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
              <a href="#browser" style={NAV_LINK}>Real browser</a>
              <a href="#checks" style={NAV_LINK}>Checks</a>
              <a href="#report" style={NAV_LINK}>Reports</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Docs</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
              <Link href="/docs" style={NAV_LINK}>Getting started</Link>
              <Link href="/docs?doc=accuracy-limitations" style={NAV_LINK}>Accuracy limitations</Link>
              <Link href="/docs?doc=roadmap" style={NAV_LINK}>Roadmap</Link>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Project</div>
            <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={NAV_LINK}>GitHub</a>
              <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer" style={NAV_LINK}>Issues</a>
              <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer" style={NAV_LINK}>MIT License</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
          <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '18px 32px', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>
            <span>© 2026 Aviary contributors</span>
            <span>235 checks · 28 categories · chromium via playwright</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
