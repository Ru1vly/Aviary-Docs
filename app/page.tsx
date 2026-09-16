'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Check, Copy, Github } from 'lucide-react';
import Button from '@/components/aviary/Button';
import Wordmark from '@/components/aviary/Wordmark';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
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
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github size={15} aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
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

        <section className="home-cta">
          <p className="eyebrow">MIT licensed · Runs locally</p>
          <h2>Make the invisible<br />problems visible.</h2>
          <Link href="/docs"><Button variant="primary" size="lg">Read the quick start <ArrowRight size={15} /></Button></Link>
        </section>
      </main>

      <footer className="home-footer">
        <Wordmark size={20} />
        <p>Real-browser website audits.</p>
        <div>
          <Link href="/docs">Docs</Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
