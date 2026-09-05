'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  GitBranch,
  Github,
  FileText,
  Scale,
  Cookie,
} from 'lucide-react';
import DocsClientWrapper from '@/components/DocsClientWrapper';
import Wordmark from '@/components/aviary/Wordmark';
import Button from '@/components/aviary/Button';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';

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
  { id: 'roadmap', title: 'Product roadmap', icon: GitBranch },
  { id: 'privacy', title: 'Privacy Policy', icon: FileText },
  { id: 'terms', title: 'Terms of Service', icon: Scale },
  { id: 'cookies', title: 'Cookie Policy', icon: Cookie },
];

export default function DocsView({ docs, initialDocId = 'quickstart' }: DocsViewProps) {
  const searchParams = useSearchParams();
  const currentDocParam = searchParams.get('doc');
  const activeDocId = (currentDocParam && docs[currentDocParam]) ? currentDocParam : initialDocId;
  const activeDoc = docs[activeDocId] || docs['quickstart'] || {
    id: 'quickstart',
    title: 'Documentation',
    description: '',
    htmlContent: '',
    headings: [],
  };

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
          <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-code)', fontSize: 12, color: 'var(--text-faint)' }}>v1.1.0 · MIT</span>
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
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '32px 20px', display: 'flex', gap: 48 }} className="flex-col lg:flex-row sm:px-8">
        {/* Left Sidebar */}
        <aside style={{ flexShrink: 0 }} className="w-full lg:w-[236px]">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="static top-auto lg:sticky lg:top-[100px]">
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
        <main id="main-content" style={{ flex: 1, minWidth: 0, maxWidth: 960 }}>
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
          <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line-hairline)' }}>
            <h1
              style={{
                margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)',
                color: 'var(--text-primary)',
              }}
            >
              {activeDoc.title}
            </h1>
            <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 'var(--leading-normal)' }}>
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
          <aside className="hidden xl:block" style={{ width: 236, flexShrink: 0 }}>
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
