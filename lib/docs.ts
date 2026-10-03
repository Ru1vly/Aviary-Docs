import fs from 'node:fs';
import path from 'node:path';
import { extractHeadings, parseMarkdownToHtml } from '@/lib/markdown';

export const DOCS_FILES = [
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
    id: 'contributing',
    title: 'Contributing & Support',
    description: 'Guidelines for code contributions, financial sponsorship, and community outreach.',
    fileName: 'contributing.md',
  },
  {
    id: 'roadmap',
    title: 'Roadmap & Production Readiness',
    description: 'Architectural roadmap, completed features, and production readiness checklist.',
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
] as const;

export interface DocItem {
  id: string;
  title: string;
  description: string;
  htmlContent: string;
  headings: { level: number; title: string; id: string }[];
}

type DocDefinition = (typeof DOCS_FILES)[number];

export function getDocDefinition(id: string): DocDefinition | undefined {
  return DOCS_FILES.find((page) => page.id === id);
}

export function loadDoc(id: string): DocItem | undefined {
  const page = getDocDefinition(id);
  if (!page) return undefined;

  const markdownContent = fs.readFileSync(path.join(process.cwd(), 'content', page.fileName), 'utf8');
  return {
    id: page.id,
    title: page.title,
    description: page.description,
    htmlContent: parseMarkdownToHtml(markdownContent),
    headings: extractHeadings(markdownContent),
  };
}

export function loadDocs(): Record<string, DocItem> {
  return Object.fromEntries(
    DOCS_FILES.map((page) => {
      const doc = loadDoc(page.id);
      if (!doc) throw new Error(`Missing documentation entry for "${page.id}".`);
      return [page.id, doc];
    })
  );
}
