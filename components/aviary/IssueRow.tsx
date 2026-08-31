import { ChevronRight } from 'lucide-react';
import { CSSProperties } from 'react';
import VerdictBadge, { Verdict } from './VerdictBadge';

export default function IssueRow({
  verdict = 'fail',
  title,
  selector,
  category,
  count,
  onClick,
  style,
}: {
  verdict?: Verdict;
  title: string;
  selector?: string;
  category?: string;
  count?: number;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto 14px',
        alignItems: 'center',
        gap: 'var(--space-3)',
        minHeight: 'var(--row-h)',
        padding: '6px var(--space-4)',
        borderBottom: 'var(--border-hairline)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition-ui)',
        ...style,
      }}
    >
      <VerdictBadge verdict={verdict} compact />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ font: 'var(--type-ui)', color: 'var(--text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
        {selector ? (
          <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selector}
          </span>
        ) : null}
      </div>
      {category ? (
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: `var(--cat-${category})` }}>
          {category}
        </span>
      ) : (
        <span />
      )}
      {count != null ? (
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', minWidth: 28, textAlign: 'right' }}>
          {count}
        </span>
      ) : (
        <span />
      )}
      <span style={{ color: 'var(--text-faint)' }}>
        <ChevronRight size={13} />
      </span>
    </div>
  );
}
