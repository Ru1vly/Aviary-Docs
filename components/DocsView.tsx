'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  Github,
  FileText,
  Scale,
  Cookie,
  Heart,
  Compass,
  Package,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DocsClientWrapper from '@/components/DocsClientWrapper';
import Wordmark from '@/components/aviary/Wordmark';
import Button from '@/components/aviary/Button';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
const NPM_URL = 'https://www.npmjs.com/package/@ru1vly/aviary';

export interface DocItem {
  id: string;
  title: string;
  description: string;
  htmlContent: string;
  headings: { level: number; title: string; id: string }[];
}

export interface DocsViewProps {
  docs: Record<string, DocItem>;
  initialDocId?: string;
}

const DOCS_NAV = [
  { id: 'quickstart', title: 'Quick start', icon: Terminal },
  { id: 'accuracy-limitations', title: 'Accuracy limitations', icon: Shield },
  { id: 'contributing', title: 'Contributing & Support', icon: Heart },
  { id: 'roadmap', title: 'Roadmap & Production', icon: Compass },
  { id: 'privacy', title: 'Privacy Policy', icon: FileText },
  { id: 'terms', title: 'Terms of Service', icon: Scale },
  { id: 'cookies', title: 'Cookie Policy', icon: Cookie },
];

export default function DocsView({ docs, initialDocId = 'quickstart' }: DocsViewProps) {
  const searchParams = useSearchParams();
  const currentDocParam = searchParams.get('doc');
  const isUnknownDoc = Boolean(currentDocParam && !Object.hasOwn(docs, currentDocParam));
  const activeDocId = (currentDocParam && Object.hasOwn(docs, currentDocParam)) ? currentDocParam : initialDocId;
  const activeDoc = (Object.hasOwn(docs, activeDocId) ? docs[activeDocId] : undefined) || docs['quickstart'] || {
    id: 'quickstart',
    title: 'Documentation',
    description: '',
    htmlContent: '',
    headings: [],
  };

  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [prevDocParam, setPrevDocParam] = React.useState(currentDocParam);
  const isMobile = useIsMobile(1024);

  // Synchronize state when doc parameter changes without cascading effect renders
  if (prevDocParam !== currentDocParam) {
    setPrevDocParam(currentDocParam);
    setMobileNavOpen(false);
  }

  const activeNavEntry = DOCS_NAV.find((p) => p.id === activeDocId) || DOCS_NAV[0];
  const ActiveNavIcon = activeNavEntry.icon;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)', color: 'var(--text-body)' }}>
      {/* Top Navigation */}
      <nav
        style={{
          position: 'sticky', top: 0, zIndex: 50, background: 'var(--surface-page)',
          borderBottom: '1px solid var(--line-hairline)', padding: '0 20px', height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        className="sm:px-8"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Wordmark size={20} tagline="Docs" />
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-code)', fontSize: 12, color: 'var(--text-faint)' }}>v0.1.1 · MIT</span>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}
          >
            <Package size={15} />
            npm
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </nav>

      {/* Page Container */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 120px', display: 'flex', gap: 64 }} className="flex-col lg:flex-row sm:px-8">
        {/* Mobile Navigation Dropdown / Drawer (< 1024px) */}
        <div className="block lg:hidden w-full">
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-docs-navigation"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--line-strong)',
              background: 'var(--surface-sunken)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ActiveNavIcon size={16} color="var(--ochre-400)" />
              <span style={{ fontWeight: 500 }}>{activeDoc.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
              <span style={{ fontSize: 'var(--text-xs)' }}>{mobileNavOpen ? 'Close menu' : 'Documentation Menu'}</span>
              {mobileNavOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {mobileNavOpen && (
            <div
              id="mobile-docs-navigation"
              style={{
                marginTop: 8,
                padding: '12px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--line-hairline)',
                background: 'var(--surface-sunken)',
              }}
            >
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
                {DOCS_NAV.map((page) => {
                  const IconComponent = page.icon;
                  const isActive = activeDocId === page.id;
                  return (
                    <li key={page.id}>
                      <Link
                        href={`/docs?doc=${page.id}`}
                        onClick={() => setMobileNavOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 8px',
                          borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)',
                          background: isActive ? 'var(--surface-hover)' : 'transparent',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                          transition: 'var(--transition-ui)', textDecoration: 'none',
                        }}
                      >
                        <IconComponent size={14} color={isActive ? 'var(--ochre-400)' : 'var(--text-faint)'} />
                        <span>{page.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div style={{ borderTop: '1px solid var(--line-hairline)', marginTop: 12, paddingTop: 12 }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Button variant="ghost" size="sm" fullWidth>← Back home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Left Sidebar (Desktop >= 1024px) */}
        <aside style={{ flexShrink: 0 }} className="hidden lg:block lg:w-[236px]">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 100 }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: 'var(--tracking-caps-loose)',
                  textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16, padding: '0 8px',
                }}
              >
                Documentation
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
                {DOCS_NAV.map((page) => {
                  const IconComponent = page.icon;
                  const isActive = activeDocId === page.id;
                  return (
                    <li key={page.id}>
                      <Link
                        href={`/docs?doc=${page.id}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, height: 32, padding: '0 8px',
                          borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)',
                          background: isActive ? 'var(--surface-hover)' : 'transparent',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                          transition: 'var(--transition-ui)', textDecoration: 'none',
                        }}
                      >
                        <IconComponent size={14} color={isActive ? 'var(--ochre-400)' : 'var(--text-faint)'} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{page.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ borderTop: '1px solid var(--line-hairline)', paddingTop: 16 }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="sm" fullWidth>← Back home</Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none" style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>
          {/* Unknown Document Notice */}
          {isUnknownDoc && (
            <div
              role="alert"
              style={{
                marginBottom: 32,
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--verdict-fail)',
                background: 'rgba(217, 105, 76, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--verdict-fail)', fontSize: 18 }} aria-hidden="true">⚠️</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                    Document not found
                  </p>
                  <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                    No documentation matches <code style={{ fontFamily: 'var(--font-code)', color: 'var(--ochre-400)' }}>{currentDocParam}</code>. Showing Quick start instead.
                  </p>
                </div>
              </div>
              <Link href="/docs?doc=quickstart" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="sm">Go to Quick start</Button>
              </Link>
            </div>
          )}

          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="breadcrumb"
            style={{ marginBottom: 16 }}
          >
            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: 0,
                padding: 0,
                listStyle: 'none',
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-faint)',
              }}
            >
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item" style={{ color: 'var(--text-faint)' }}>
                  <span itemProp="name">Aviary</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/docs" itemProp="item" style={{ color: 'var(--text-faint)' }}>
                  <span itemProp="name">Docs</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" style={{ color: 'var(--text-primary)' }}>{activeDoc.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Section Header */}
          <div style={{ marginBottom: 56, paddingBottom: 40, borderBottom: '1px solid var(--line-hairline)' }}>
            <h1
              style={{
                margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(38px, 4vw, 52px)', lineHeight: 1.06, letterSpacing: 'var(--tracking-tight)',
                color: 'var(--text-primary)',
              }}
            >
              {activeDoc.title}
            </h1>
            <p style={{ margin: 0, maxWidth: 580, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--leading-loose)' }}>
              {activeDoc.description}
            </p>
          </div>

          {/* Rendered Markdown Content */}
          <DocsClientWrapper key={activeDocId}>
            <article
              className="aviary-doc-content"
              dangerouslySetInnerHTML={{ __html: activeDoc.htmlContent }}
            />
          </DocsClientWrapper>
        </main>

        {/* Right Sidebar - On this page (TOC) */}
        {activeDoc.headings.length > 0 && (
          <aside className="hidden xl:block" style={{ width: 196, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 100, paddingLeft: 24, borderLeft: '1px solid var(--line-hairline)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 'var(--tracking-caps-loose)',
                  textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 16,
                }}
              >
                On this page
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'var(--text-sm)', listStyle: 'none', margin: 0, padding: 0 }}>
                {activeDoc.headings.map((h, i) => (
                  <li key={`${h.id}-${i}`} style={{ paddingLeft: (h.level - 2) * 10 }}>
                    <a href={`#${h.id}`} className="toc-link" style={{ fontFamily: 'var(--font-ui)' }}>
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
