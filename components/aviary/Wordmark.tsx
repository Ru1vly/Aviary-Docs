import { CSSProperties } from 'react';

export default function Wordmark({
  size = 24,
  tagline,
  style,
}: {
  size?: number;
  tagline?: string;
  style?: CSSProperties;
}) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, ...style }}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: size,
          lineHeight: 1,
          letterSpacing: '0.01em',
          color: 'var(--text-primary)',
        }}
      >
        Aviary
      </span>
      {tagline ? (
        <span
          style={{
            font: 'var(--type-label)',
            letterSpacing: 'var(--tracking-caps-loose)',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
          }}
        >
          {tagline}
        </span>
      ) : null}
    </span>
  );
}
