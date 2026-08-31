import { Check, TriangleAlert, X, Info, Minus } from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';

export type Verdict = 'pass' | 'warn' | 'fail' | 'info' | 'skip';

const MAP: Record<Verdict, { icon: typeof Check; color: string; bg: string; label: string }> = {
  pass: { icon: Check, color: 'var(--verdict-pass)', bg: 'var(--verdict-pass-bg)', label: 'Pass' },
  warn: { icon: TriangleAlert, color: 'var(--verdict-warn)', bg: 'var(--verdict-warn-bg)', label: 'Warn' },
  fail: { icon: X, color: 'var(--verdict-fail)', bg: 'var(--verdict-fail-bg)', label: 'Fail' },
  info: { icon: Info, color: 'var(--verdict-info)', bg: 'var(--verdict-info-bg)', label: 'Info' },
  skip: { icon: Minus, color: 'var(--verdict-skip)', bg: 'var(--verdict-skip-bg)', label: 'Skipped' },
};

export default function VerdictBadge({
  verdict = 'pass',
  children,
  compact,
  style,
}: {
  verdict?: Verdict;
  children?: ReactNode;
  compact?: boolean;
  style?: CSSProperties;
}) {
  const v = MAP[verdict];
  const Icon = v.icon;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 0 : 6,
        height: compact ? 18 : 22,
        width: compact ? 18 : undefined,
        justifyContent: 'center',
        padding: compact ? 0 : '0 8px',
        background: v.bg,
        border: `1px solid ${v.color}`,
        borderRadius: 'var(--radius-xs)',
        color: v.color,
        font: 'var(--type-label)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <Icon size={11} strokeWidth={2} />
      {compact ? null : children || v.label}
    </span>
  );
}
