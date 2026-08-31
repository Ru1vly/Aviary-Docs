'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Wordmark from '@/components/aviary/Wordmark';
import Button from '@/components/aviary/Button';

const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh', background: 'var(--surface-page)', color: 'var(--text-body)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px 20px', textAlign: 'center', gap: 24,
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Wordmark size={20} />
      </Link>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 'var(--tracking-caps)',
            textTransform: 'uppercase', color: 'var(--verdict-fail)', marginBottom: 16,
          }}
        >
          Something went wrong
        </div>
        <h1
          style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-regular)' as unknown as number,
            fontSize: 'clamp(28px, 3.6vw, 40px)', lineHeight: 1.15, color: 'var(--text-primary)',
          }}
        >
          This page failed to load.
        </h1>
        <p
          style={{
            margin: '16px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)',
            lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)', maxWidth: '48ch',
          }}
        >
          Try again, or head back home. If it keeps happening, let us know what you were doing.
        </p>
        {error.digest ? (
          <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-code)', fontSize: 13, color: 'var(--text-faint)' }}>
            Error ref: {error.digest}
          </p>
        ) : null}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <Button variant="primary" size="lg" onClick={() => reset()}>Try again</Button>
        <Link href="/" style={{ textDecoration: 'none' }}><Button variant="secondary" size="lg">Back home</Button></Link>
        <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="lg">Report this</Button>
        </a>
      </div>
    </div>
  );
}
