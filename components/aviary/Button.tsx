import { ButtonHTMLAttributes, CSSProperties } from 'react';

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
  ...rest
}: AviaryButtonProps) {
  const s = SIZES[size];
  return (
    <button
      type="button"
      disabled={disabled}
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
        ...style,
      }}
    >
      {children}
    </button>
  );
}
