import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Heart, Package } from 'lucide-react';
import Button from '@/components/aviary/Button';
import Wordmark from '@/components/aviary/Wordmark';
import {
  BUYMEACOFFEE_URL,
  DISCUSSIONS_URL,
  FOUNDING_SPONSORS,
  GITHUB_URL,
  SPONSORS_URL,
  SPONSOR_FAQ,
  SPONSOR_PLATFORMS,
  SPONSOR_TIERS,
} from '@/lib/sponsors';

const NPM_URL = 'https://www.npmjs.com/package/@ru1vly/aviary';
const ISSUES_URL = 'https://github.com/Ru1vly/Aviary/issues';

export const metadata: Metadata = {
  title: 'Support Aviary',
  description:
    'Sponsor Aviary through GitHub Sponsors or Buy Me a Coffee. Recognition-only tiers with an opt-in sponsors wall — Aviary stays MIT-licensed and free forever.',
  alternates: {
    canonical: '/support',
  },
};

export default function SupportPage() {
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
            <Link href="/support">Supporting</Link>
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
        <section className="home-section support-section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Community & Sustainability</p>
              <h2>
                Support
                <br />
                Aviary.
              </h2>
            </div>
            <p className="support-intro-lead">
              Aviary is independent, open-source, and free forever. Sponsorship sustains
              ongoing maintenance and development — keeping 242 browser checks accurate as
              web standards evolve.
            </p>
          </div>

          <div className="support-grid">
            {SPONSOR_PLATFORMS.map((platform) => (
              <article key={platform.number} className="support-card">
                <div>
                  <div className="support-card-meta">
                    <span className="support-card-num">{platform.number}</span>
                    <span className="support-card-tag">{platform.tag}</span>
                  </div>
                  <h3>{platform.name}</h3>
                  <p>
                    {platform.detail} Best for {platform.bestFor.toLowerCase()}.
                  </p>
                </div>
                <div>
                  <a
                    href={platform.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-action-link"
                  >
                    {platform.actionLabel}
                    <ArrowRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="support-banner">
            <div className="support-banner-copy">
              <strong>Sponsor tiers with a thank-you on the wall.</strong>
              <span>
                Recognition-only perks. No features gated, no SLAs — just visible credit
                for sustaining the project.
              </span>
            </div>
          </div>

          <div className="support-grid tier-grid">
            {SPONSOR_TIERS.map((tier) => (
              <article key={tier.number} className="support-card tier-card">
                <div>
                  <div className="support-card-meta">
                    <span className="support-card-num">{tier.number}</span>
                    <span className="support-card-tag">{tier.tag}</span>
                  </div>
                  <h3>{tier.name}</h3>
                  <p className="tier-price">
                    {tier.price} <span>· {tier.via}</span>
                  </p>
                  <p>{tier.body}</p>
                  <ul className="tier-perks">
                    {tier.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <a
                    href={tier.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-action-link"
                  >
                    {tier.actionLabel}
                    <ArrowRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="sponsor-wall">
            <h3>Founding sponsors</h3>
            {FOUNDING_SPONSORS.length === 0 ? (
              <p className="sponsor-wall-empty">
                No sponsors listed yet — be the first name on the wall.{' '}
                <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">
                  Claim your spot after sponsoring
                </a>
                .
              </p>
            ) : (
              <ul className="sponsor-wall-list">
                {FOUNDING_SPONSORS.map((sponsor) => (
                  <li key={sponsor.name}>
                    {sponsor.href ? (
                      <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
                        {sponsor.name}
                      </a>
                    ) : (
                      sponsor.name
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="support-faq">
            {SPONSOR_FAQ.map((item) => (
              <details key={item.q} className="support-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <p className="support-footnote">
            Transparency note: audits run on your machine, docs and CI run on free GitHub
            tiers, and browsers come free with Playwright — so sponsorship funds
            maintenance and development, not servers. Need scoped help? Ask about separate
            consulting via{' '}
            <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">
              GitHub Discussions
            </a>
            .
          </p>

          <div className="support-banner">
            <div className="support-banner-copy">
              <strong>Questions about contributing or local setup?</strong>
              <span>
                Explore our open documentation or start a discussion on GitHub. Community
                help only.
              </span>
            </div>
            <div className="support-banner-actions">
              <Link href="/docs/contributing/">
                <Button variant="secondary" size="md">
                  Contribution guide <ArrowRight size={14} />
                </Button>
              </Link>
              <a href={SPONSORS_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="md">
                  <Heart size={14} className="support-heart-icon" aria-hidden="true" />{' '}
                  Sponsor
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <Wordmark size={20} />
        <p>Real-browser website audits · 242 automated checks</p>
        <div>
          <Link href="/docs">Docs</Link>
          <Link href="/support">Support</Link>
          <Link href="/docs/contributing/">Contributing</Link>
          <Link href="/docs/roadmap/">Roadmap</Link>
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
            npm
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
            Issues
          </a>
          <a href={SPONSORS_URL} target="_blank" rel="noopener noreferrer">
            Sponsor
          </a>
          <a href={BUYMEACOFFEE_URL} target="_blank" rel="noopener noreferrer">
            Buy Me a Coffee
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
