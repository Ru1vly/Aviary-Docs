'use client';

import { ButtonHTMLAttributes, CSSProperties, useState } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { height: number; padding: string; fontSize: string; gap: number }> = {
  sm: { height: 26, padding: '0 10px', fontSize: 'var(--text-2xs)', gap: 6 },
  md: { height: 32, padding: '0 14px', fontSize: 'var(--text-xs)', gap: 7 },
  lg: { height: 40, padding: '0 20px', fontSize: 'var(--text-sm)', gap: 8 },
};

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)', border: '1px solid var(--surface-inverse)' },
  secondary: { background: 'transparent', color: 'var(--text-primary)', border: 'var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent' },
  danger: { background: 'transparent', color: 'var(--verdict-fail)', border: '1px solid var(--verdict-fail)' },
};

const HOVER_VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--bone-200)', borderColor: 'var(--bone-200)' },
  secondary: { background: 'var(--surface-hover)', borderColor: 'var(--line-strong)' },
  ghost: { background: 'var(--surface-hover)', color: 'var(--text-primary)' },
  danger: { background: 'var(--verdict-fail-bg)' },
};

const ACTIVE_VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--bone-300)', borderColor: 'var(--bone-300)' },
  secondary: { background: 'var(--surface-active)', borderColor: 'var(--line-strong)' },
  ghost: { background: 'var(--surface-active)', color: 'var(--text-primary)' },
  danger: { background: 'var(--verdict-fail-bg)', borderColor: 'var(--verdict-fail)', color: 'var(--verdict-fail)' },
};

interface AviaryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  disabled,
  fullWidth,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onKeyDown,
  onKeyUp,
  ...rest
}: AviaryButtonProps) {
  const s = SIZES[size];
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setActive(false); onMouseLeave?.(e); }}
      onMouseDown={(e) => { setActive(true); onMouseDown?.(e); }}
      onMouseUp={(e) => { setActive(false); onMouseUp?.(e); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(true); onKeyDown?.(e); }}
      onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(false); onKeyUp?.(e); }}
      {...rest}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: 'var(--font-ui)',
        fontSize: s.fontSize,
        fontWeight: 'var(--weight-medium)' as unknown as number,
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-xs)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'var(--transition-ui)',
        whiteSpace: 'nowrap',
        ...VARIANTS[variant],
        ...(!disabled && hovered ? HOVER_VARIANTS[variant] : null),
        ...(!disabled && active ? ACTIVE_VARIANTS[variant] : null),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
