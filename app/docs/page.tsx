import { Suspense } from 'react';
import type { Metadata } from 'next';
import DocsView from '@/components/DocsView';
import { loadDocs } from '@/lib/docs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'SEO & GEO Audit Documentation',
  description: 'Guides and reference for Aviary, the open-source real-browser SEO and GEO audit tool — quick starts, technical SEO fixes, AI crawler visibility checks, and CI workflows.',
  alternates: {
    canonical: '/docs/',
  },
  openGraph: {
    title: 'SEO & GEO Audit Documentation | Aviary',
    description: 'Guides and reference for Aviary, the open-source real-browser SEO and GEO audit tool — quick starts, technical SEO fixes, AI crawler visibility checks, and CI workflows.',
    url: '/docs/',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Aviary Documentation — SEO & GEO Real-Browser Audit Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO & GEO Audit Documentation | Aviary',
    description: 'Guides and reference for Aviary, the open-source real-browser SEO and GEO audit tool — quick starts, technical SEO fixes, AI crawler visibility checks, and CI workflows.',
    images: ['/og-image.png'],
  },
};

export default function DocsPage() {
  const docs = loadDocs();

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--surface-page)' }} />}>
      <DocsView docs={docs} initialDocId="quickstart" />
    </Suspense>
  );
}
