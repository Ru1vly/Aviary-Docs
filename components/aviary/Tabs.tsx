'use client';

import { useState } from 'react';

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
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', borderBottom: 'var(--border-hairline)', overflowX: 'auto' }}>
      {items.map((it) => {
        const on = it.value === value;
        const isHovered = hovered === it.value;
        const isPressed = pressed === it.value;
        const color = on
          ? (isPressed ? 'var(--ochre-400)' : 'var(--text-primary)')
          : (isHovered ? 'var(--text-muted)' : 'var(--text-faint)');
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            onMouseEnter={() => setHovered(it.value)}
            onMouseLeave={() => { setHovered(null); setPressed(null); }}
            onMouseDown={() => setPressed(it.value)}
            onMouseUp={() => setPressed(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '0 0 9px',
              background: 'none',
              border: 'none',
              borderBottom: `1px solid ${on ? (isPressed ? 'var(--ochre-400)' : 'var(--bone-100)') : (isHovered ? 'var(--line-strong)' : 'transparent')}`,
              marginBottom: -1,
              color,
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
