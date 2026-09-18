'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Check, Copy, Github, Heart, Package } from 'lucide-react';
import Button from '@/components/aviary/Button';
import Wordmark from '@/components/aviary/Wordmark';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
const NPM_URL = 'https://www.npmjs.com/package/@ru1vly/aviary';
const SPONSORS_URL = 'https://github.com/sponsors/Ru1vly';
const BUYMEACOFFEE_URL = 'https://buymeacoffee.com/ru1vly';
const ISSUES_URL = 'https://github.com/Ru1vly/Aviary/issues';
const GLOBAL_INSTALL_COMMAND = 'npm install -g @ru1vly/aviary';
const AUDIT_COMMAND = 'npx @ru1vly/aviary -u https://example.com';

const CHECK_GROUPS = [
  {
    number: '01',
    title: 'Find what is missing',
    body: 'Metadata, headings, alt text, labels, schema, security headers, and more.',
  },
  {
    number: '02',
    title: 'Measure what is slow',
    body: 'Core Web Vitals, resources, rendering, caching, and mobile experience.',
  },
  {
    number: '03',
    title: 'Fix what matters',
    body: 'A scored report ranks every issue and points to the element that caused it.',
  },
];

const SUPPORT_PATHWAYS = [
  {
    number: '01',
    category: 'Code & Architecture',
    title: 'Contributing by Coding',
    body: 'Finding and fixing bugs, writing new browser audit checks for @ru1vly/aviary, improving TypeScript definitions, submitting PRs to GitHub, and enhancing documentation.',
    actionLabel: 'Read code guide',
    actionHref: '/docs?doc=contributing#1-contributing-by-coding',
    external: false,
    tag: 'PRs Welcome',
  },
  {
    number: '02',
    category: 'Infrastructure & Testing',
    title: 'Contributing Financially',
    body: 'Sponsoring the project (GitHub Sponsors / Buy Me a Coffee), supporting test-runner server costs and browser testing infrastructure.',
    actionLabel: 'Sponsor on GitHub',
    actionHref: SPONSORS_URL,
    external: true,
    tag: 'Infrastructure',
  },
  {
    number: '03',
    category: 'Ecosystem & Outreach',
    title: 'Content & Outreach',
    body: 'Starring the repo on GitHub, sharing audit reports and scores on social media (X/Twitter, LinkedIn), reporting issues on GitHub, and writing articles/tutorials on web auditing.',
    actionLabel: 'Star repository',
    actionHref: GITHUB_URL,
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
          <div className="hero-copy">
            <h1>See your site<br />the way browsers do.</h1>
            <p className="hero-lede">
              Aviary opens your page in Chromium, runs 235 checks, and gives you a clear list of what to fix for better SEO.
            </p>

            <div className="hero-install">
              <code><span>$</span> {GLOBAL_INSTALL_COMMAND}</code>
              <button
                type="button"
                onClick={() => copyCommand(GLOBAL_INSTALL_COMMAND, 'install')}
                aria-label="Copy global install command"
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
          <div><strong>235</strong><span>checks</span></div>
          <div><strong>28</strong><span>categories</span></div>
          <div><strong>1</strong><span>real browser</span></div>
          <p>No account. No dashboard. Your audit stays on your machine.</p>
        </section>

        <section className="home-section" id="checks">
          <div className="section-intro">
            <p className="eyebrow">A quieter way to audit</p>
            <h2>One report.<br />Only useful signals.</h2>
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
            <p>Use the readable terminal report, or export JSON and HTML for CI and sharing.</p>
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

        <section className="home-section support-section" id="support">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Community & Sustainability</p>
              <h2>Supporting<br />Aviary.</h2>
            </div>
            <p className="support-intro-lead">
              Aviary is an independent, 100% open-source auditing suite. Sustaining 235 browser checks across evolving web standards takes continuous testing, server resources, and active community maintenance. Here is how you can support the project.
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
              <strong>Need custom audit checks or enterprise CI assistance?</strong>
              <span>Explore our open documentation or start a discussion on GitHub.</span>
            </div>
            <div className="support-banner-actions">
              <Link href="/docs?doc=contributing">
                <Button variant="secondary" size="md">
                  Contribution guide <ArrowRight size={14} />
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
        <p>Real-browser website audits · 235 automated checks</p>
        <div>
          <Link href="/docs">Docs</Link>
          <Link href="/docs?doc=contributing">Contributing</Link>
          <Link href="/docs?doc=roadmap">Roadmap</Link>
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
