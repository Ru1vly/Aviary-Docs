import {
  Terminal,
  Shield,
  GitBranch,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { parseMarkdownToHtml } from '@/lib/markdown';
import DocsClientWrapper from '@/components/DocsClientWrapper';
import Wordmark from '@/components/aviary/Wordmark';
import Button from '@/components/aviary/Button';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';

// Define available documentation pages
const DOCS_PAGES = [
  {
    id: 'quickstart',
    title: 'Quick start',
    description: 'Install it, run your first audit, and wire it into your own code.',
    fileName: 'quickstart.md',
    icon: Terminal,
  },
  {
    id: 'accuracy-limitations',
    title: 'Accuracy limitations',
    description: 'Where checks can get it wrong, and why — read this before you trust a score.',
    fileName: 'accuracy-limitations.md',
    icon: Shield,
  },
  {
    id: 'roadmap',
    title: 'Product roadmap',
    description: 'What still needs work, and what we’re building next.',
    fileName: 'roadmap.md',
    icon: GitBranch,
  },
];

interface PageProps {
  searchParams: Promise<{ doc?: string }>;
}

export default async function DocsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeDocId = params.doc || 'quickstart';
  const activePage = DOCS_PAGES.find((p) => p.id === activeDocId) || DOCS_PAGES[0];

  const filePath = path.join(process.cwd(), 'content', activePage.fileName);
  let markdownContent = '';
  try {
    markdownContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading doc file ${filePath}:`, err);
    markdownContent = `# Error\nCould not load the document "${activePage.title}".`;
  }

  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; title: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const titleRaw = match[2].trim();
    const title = titleRaw.replace(/\*\*|`|✅|❌/g, '').trim();
    const id = titleRaw
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    headings.push({ level, title, id });
  }

  const htmlContent = parseMarkdownToHtml(markdownContent);

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
                {DOCS_PAGES.map((page) => {
                  const IconComponent = page.icon;
                  const isActive = activePage.id === page.id;
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
        <main style={{ flex: 1, minWidth: 0, maxWidth: 960 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--text-faint)' }}>Aviary</Link>
            <span>/</span>
            <Link href="/docs" style={{ color: 'var(--text-faint)' }}>Docs</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{activePage.title}</span>
          </div>

          {/* Section Header */}
          <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line-hairline)' }}>
            <h1
              style={{
                margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)',
                color: 'var(--text-primary)',
              }}
            >
              {activePage.title}
            </h1>
            <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 'var(--leading-normal)' }}>
              {activePage.description}
            </p>
          </div>

          {/* Rendered Markdown Content */}
          <DocsClientWrapper>
            <article
              className="aviary-doc-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </DocsClientWrapper>
        </main>

        {/* Right Sidebar - On this page (TOC) */}
        {headings.length > 0 && (
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
                {headings.map((h, i) => (
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
