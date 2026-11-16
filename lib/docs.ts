import fs from 'node:fs';
import path from 'node:path';
import { extractHeadings, parseMarkdownToHtml } from '@/lib/markdown';

export const DOCS_FILES = [
  {
    id: 'quickstart',
    title: 'Quick start',
    description: 'Quick start: install Aviary, run your first real-browser SEO & GEO audit, review a finding, and wire reports into CI.',
    fileName: 'quickstart.md',
  },
  {
    id: 'accuracy-limitations',
    title: 'Accuracy limitations',
    description: 'Where Aviary’s SEO and GEO checks can get it wrong, and why — read this before you trust a score or an AI-visibility claim.',
    fileName: 'accuracy-limitations.md',
  },
  {
    id: 'contributing',
    title: 'Contributing & Support',
    description: 'Guidelines for contributing code, checks, and docs to the open-source SEO & GEO audit engine — plus sponsorship and community outreach.',
    fileName: 'contributing.md',
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    description: 'Shipped SEO, GEO, and AI search visibility capabilities, plus proposed priorities for improving adoption.',
    fileName: 'roadmap.md',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Our privacy principles and data handling policies for the local-first SEO & GEO audit engine — zero telemetry, zero report uploads.',
    fileName: 'privacy.md',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Terms governing the use of the Aviary open-source SEO & GEO audit software, CLI, and documentation site.',
    fileName: 'terms.md',
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    description: 'Cookie and browser storage usage on the Aviary SEO & GEO docs site and auditing engine — we set zero cookies.',
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
