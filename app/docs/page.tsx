import { Suspense } from 'react';
import type { Metadata } from 'next';
import DocsView from '@/components/DocsView';
import { loadDocs } from '@/lib/docs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Comprehensive documentation and guides for Aviary — automated real-browser website auditing.',
  alternates: {
    canonical: '/docs/',
  },
  openGraph: {
    title: 'Documentation | Aviary',
    description: 'Comprehensive documentation and guides for Aviary — automated real-browser website auditing.',
    url: '/docs/',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Aviary Documentation — Automated Real-Browser Website Auditing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation | Aviary',
    description: 'Comprehensive documentation and guides for Aviary — automated real-browser website auditing.',
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
