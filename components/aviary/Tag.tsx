import { CSSProperties, ReactNode } from 'react';

type Tone = 'neutral' | 'pass' | 'warn' | 'fail' | 'info';

const TONES: Record<Tone, { color: string; border: string; bg: string }> = {
  neutral: { color: 'var(--text-muted)', border: 'var(--line-default)', bg: 'transparent' },
  pass: { color: 'var(--verdict-pass)', border: 'var(--line-hairline)', bg: 'var(--verdict-pass-bg)' },
  warn: { color: 'var(--verdict-warn)', border: 'var(--line-hairline)', bg: 'var(--verdict-warn-bg)' },
  fail: { color: 'var(--verdict-fail)', border: 'var(--line-hairline)', bg: 'var(--verdict-fail-bg)' },
  info: { color: 'var(--verdict-info)', border: 'var(--line-hairline)', bg: 'var(--verdict-info-bg)' },
};

export default function Tag({
  tone = 'neutral',
  children,
  dot,
  style,
}: {
  tone?: Tone;
  children: ReactNode;
  dot?: boolean;
  style?: CSSProperties;
}) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 20,
        padding: '0 7px',
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 'var(--radius-xs)',
        color: t.color,
        font: 'var(--type-label)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {dot ? (
        <span style={{ width: 5, height: 5, borderRadius: 'var(--radius-full)', background: 'currentColor' }} />
      ) : null}
      {children}
    </span>
  );
}
