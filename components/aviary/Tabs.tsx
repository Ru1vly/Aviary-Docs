'use client';

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

export default function Tabs({
  items = [],
  value,
  onChange,
}: {
  items: TabItem[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', borderBottom: 'var(--border-hairline)', overflowX: 'auto' }}>
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '0 0 9px',
              background: 'none',
              border: 'none',
              borderBottom: `1px solid ${on ? 'var(--bone-100)' : 'transparent'}`,
              marginBottom: -1,
              color: on ? 'var(--text-primary)' : 'var(--text-faint)',
              font: 'var(--type-label)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-ui)',
              whiteSpace: 'nowrap',
            }}
          >
            {it.label}
            {it.count != null ? (
              <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{it.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
