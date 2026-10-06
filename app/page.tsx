'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Check, Copy, Github, Heart, Package } from 'lucide-react';
import Button from '@/components/aviary/Button';
import Wordmark from '@/components/aviary/Wordmark';
import HeroBackground from '@/components/HeroBackground';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
const NPM_URL = 'https://www.npmjs.com/package/@ru1vly/aviary';
const SPONSORS_URL = 'https://github.com/sponsors/Ru1vly';
const BUYMEACOFFEE_URL = 'https://buymeacoffee.com/ru1vly';
const ISSUES_URL = 'https://github.com/Ru1vly/Aviary/issues';
const FIRST_AUDIT_COMMAND = 'npx @ru1vly/aviary -u https://example.com/';
const AUDIT_COMMAND = 'npx @ru1vly/aviary -u https://example.com/ --output report.json --html report.html';

const CHECK_GROUPS = [
  {
    number: '01',
    title: 'Find what is missing',
    body: 'Metadata, headings, alt text, labels, schema, security headers, and more.',
  },
  {
    number: '02',
    title: 'Measure what is slow',
    body: 'Lab performance measurements, resources, rendering, caching, and mobile experience.',
  },
  {
    number: '03',
    title: 'Fix what matters',
    body: 'Review failed checks and supporting details, then verify your changes with another audit.',
  },
];

const SUPPORT_PATHWAYS = [
  {
    number: '01',
    category: 'Code & Architecture',
    title: 'Contributing by Coding',
    body: 'Finding and fixing bugs, writing new browser audit checks for @ru1vly/aviary, improving TypeScript definitions, submitting PRs to GitHub, and enhancing documentation.',
    actionLabel: 'Read code guide',
    actionHref: '/docs/contributing/#1-contributing-by-coding',
    external: false,
    tag: 'PRs Welcome',
  },
  {
    number: '02',
    category: 'Sustainability',
    title: 'Contributing Financially',
    body: 'Sponsor tiers with recognition-only perks and an opt-in sponsors wall. Aviary is independent and free forever.',
    actionLabel: 'View support page',
    actionHref: '/support',
    external: false,
    tag: 'Sponsors',
  },
  {
    number: '03',
    category: 'Ecosystem & Outreach',
    title: 'Content & Outreach',
    body: 'Tell us which findings helped, report confusing results, or write a tutorial showing an audit and its fix.',
    actionLabel: 'Share feedback',
    actionHref: `${ISSUES_URL}/new?template=workflow_feedback.md`,
    external: true,
    tag: 'Community',
  },
];

export default function AviaryHome() {
  const [copied, setCopied] = useState<'install' | 'audit' | null>(null);

  const copyCommand = async (command: string, source: 'install' | 'audit') => {
    await navigator.clipboard?.writeText(command);
    setCopied(source);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="home-shell">
      <header className="home-header">
        <div className="home-nav">
          <Link href="/" className="home-brand" aria-label="Aviary home">
            <Image src="/icon.svg" alt="" width={22} height={22} priority />
            <Wordmark size={21} />
          </Link>

          <nav className="home-links" aria-label="Primary navigation">
            <Link href="/docs">Docs</Link>
            <a href="#support">Supporting</a>
            <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
              <Package size={14} aria-hidden="true" />
              npm
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github size={15} aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <section className="home-hero">
          <HeroBackground />
          <div className="hero-copy">
            <h1>Catch SEO issues<br />before deployment.</h1>
            <p className="hero-lede">
              Open-source SEO and AI crawler audits for developers and web agencies. Inspect rendered pages in Chromium, review readable reports, and add checks to CI.
            </p>

            <div className="hero-install">
              <code><span>$</span> {FIRST_AUDIT_COMMAND}</code>
              <button
                type="button"
                onClick={() => copyCommand(FIRST_AUDIT_COMMAND, 'install')}
                aria-label="Copy first audit command"
              >
                {copied === 'install' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="hero-actions">
              <Link href="/docs"><Button variant="primary" size="lg">Get started <ArrowRight size={15} /></Button></Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="lg">View on GitHub</Button></a>
            </div>
          </div>

        </section>

        <section className="home-proof" aria-label="Product facts">
          <div><strong>MIT</strong><span>licensed</span></div>
          <div><strong>CI</strong><span>ready</span></div>
          <div><strong>1</strong><span>real browser</span></div>
          <p>No account required. Run locally and save your reports.</p>
        </section>

        <section className="home-section" id="checks">
          <div className="section-intro">
            <p className="eyebrow">A quieter way to audit</p>
            <h2>Review findings.<br />Verify your fixes.</h2>
          </div>

          <div className="check-grid">
            {CHECK_GROUPS.map((group) => (
              <article key={group.number}>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="install-section">
          <div className="install-copy">
            <p className="eyebrow">Run it anywhere</p>
            <h2>Start with one command.</h2>
            <p>Replace the example URL with your website. Open report.html, review a finding, make a fix, and run again. Node.js 20 or newer is required; Chromium may download on first use.</p>
          </div>

          <div className="install-command">
            <div className="command-bar">
              <span>Terminal</span>
              <button type="button" onClick={() => copyCommand(AUDIT_COMMAND, 'audit')} aria-label="Copy audit command">
                {copied === 'audit' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'audit' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code><span>$</span> {AUDIT_COMMAND}</code>
          </div>
        </section>

        <section className="home-section" id="workflow">
          <div className="section-intro">
            <p className="eyebrow">From a finding to a fix</p>
            <h2>Make your first audit useful.</h2>
          </div>
          <div className="check-grid">
            <article><span>01</span><h3>Inspect a finding</h3><p>For example, an unexpected noindex directive on a public landing page deserves review. This is an illustrative scenario, not a customer result.</p></article>
            <article><span>02</span><h3>Check your intent</h3><p>Inspect the page and crawler policy before changing them. Fix the directive if the page is intended for indexing, then audit the same URL again.</p></article>
            <article><span>03</span><h3>Keep checking</h3><p>Use a scheduled GitHub Actions audit to save reports and compare against a successful baseline.</p><Link href="/docs/#run-in-github-actions">Set up GitHub Actions <ArrowRight size={13} aria-hidden="true" /></Link></article>
          </div>
          <p>Scores summarize the checks run; they do not predict rankings or AI citations. Default local audits have no built-in telemetry or report uploads. <Link href="/docs/accuracy-limitations/">Read the limitations</Link> and <Link href="/docs/privacy/">data handling notes</Link>.</p>
        </section>

        <section className="home-section support-section" id="support">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Community & Sustainability</p>
              <h2>Supporting<br />Aviary.</h2>
            </div>
            <p className="support-intro-lead">
              Aviary is independent, open-source, and free forever. Sponsorship sustains ongoing maintenance and development — improving checks, documentation, and compatibility as web standards evolve.
            </p>
          </div>

          <div className="support-grid">
            {SUPPORT_PATHWAYS.map((pathway) => (
              <article key={pathway.number} className="support-card">
                <div>
                  <div className="support-card-meta">
                    <span className="support-card-num">{pathway.number}</span>
                    <span className="support-card-tag">{pathway.tag}</span>
                  </div>
                  <h3>{pathway.title}</h3>
                  <p>{pathway.body}</p>
                </div>
                <div>
                  {pathway.external ? (
                    <a
                      href={pathway.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="support-action-link"
                    >
                      {pathway.actionLabel}
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={pathway.actionHref} className="support-action-link">
                      {pathway.actionLabel}
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="support-banner">
            <div className="support-banner-copy">
              <strong>Questions about contributing or local setup?</strong>
              <span>Explore our open documentation or start a discussion on GitHub. Community help only.</span>
            </div>
            <div className="support-banner-actions">
              <Link href="/support">
                <Button variant="secondary" size="md">
                  Support page <ArrowRight size={14} />
                </Button>
              </Link>
              <a href={SPONSORS_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="md">
                  <Heart size={14} className="support-heart-icon" aria-hidden="true" /> Sponsor
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <p className="eyebrow">MIT licensed · Runs locally</p>
          <h2>Make the invisible<br />problems visible.</h2>
          <Link href="/docs"><Button variant="primary" size="lg">Read the quick start <ArrowRight size={15} /></Button></Link>
        </section>
      </main>

      <footer className="home-footer">
        <Wordmark size={20} />
        <p>Open-source SEO and AI crawler audits</p>
        <div>
          <Link href="/docs">Docs</Link>
          <Link href="/support">Support</Link>
          <Link href="/docs/contributing/">Contributing</Link>
          <Link href="/docs/roadmap/">Roadmap</Link>
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer">npm</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">Issues</a>
          <a href={SPONSORS_URL} target="_blank" rel="noopener noreferrer">Sponsor</a>
          <a href={BUYMEACOFFEE_URL} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
