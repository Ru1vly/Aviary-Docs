import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsView from '@/components/DocsView';
import { DOCS_FILES, loadDoc } from '@/lib/docs';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS_FILES.map(({ id }) => ({ id }));
}

type DocPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { id } = await params;
  const doc = loadDoc(id);
  if (!doc) return { title: 'Document not found' };

  const canonical = `/docs/${doc.id}/`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical },
    openGraph: {
      title: `${doc.title} | Aviary`,
      description: doc.description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${doc.title} — Aviary Documentation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} | Aviary`,
      description: doc.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { id } = await params;
  const doc = loadDoc(id);
  if (!doc) notFound();

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--surface-page)' }} />}>
      <DocsView docs={{ [id]: doc }} initialDocId={id} legacyQueryRouting={false} />
    </Suspense>
  );
}
