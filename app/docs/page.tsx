import fs from 'fs';
import path from 'path';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { parseMarkdownToHtml } from '@/lib/markdown';
import DocsView, { DocItem } from '@/components/DocsView';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Documentation — Aviary',
  description: 'Comprehensive documentation and guides for Aviary — automated real-browser website auditing.',
};

const DOCS_FILES = [
  {
    id: 'quickstart',
    title: 'Quick start',
    description: 'Install it, run your first audit, and wire it into your own code.',
    fileName: 'quickstart.md',
  },
  {
    id: 'accuracy-limitations',
    title: 'Accuracy limitations',
    description: 'Where checks can get it wrong, and why — read this before you trust a score.',
    fileName: 'accuracy-limitations.md',
  },
  {
    id: 'roadmap',
    title: 'Product roadmap',
    description: 'What still needs work, and what we’re building next.',
    fileName: 'roadmap.md',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Our principles and data handling policies.',
    fileName: 'privacy.md',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Terms governing the use of Aviary software and sites.',
    fileName: 'terms.md',
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    description: 'Information regarding local storage and cookie usage.',
    fileName: 'cookies.md',
  },
];

function loadDocs(): Record<string, DocItem> {
  const docs: Record<string, DocItem> = {};
  for (const page of DOCS_FILES) {
    const filePath = path.join(process.cwd(), 'content', page.fileName);
    let markdownContent = '';
    try {
      markdownContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`Error reading doc file ${filePath}:`, err);
      markdownContent = [
        '# This page couldn\'t load',
        '',
        `We couldn't find the content for "${page.title}" in this build.`,
        '',
        '- [Go to Quick start](/docs)',
        '- [Report this on GitHub](https://github.com/Ru1vly/Aviary/issues)',
      ].join('\n');
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

    docs[page.id] = {
      id: page.id,
      title: page.title,
      description: page.description,
      htmlContent: parseMarkdownToHtml(markdownContent),
      headings,
    };
  }
  return docs;
}

export default function DocsPage() {
  const docs = loadDocs();

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--surface-page)' }} />}>
      <DocsView docs={docs} initialDocId="quickstart" />
    </Suspense>
  );
}
