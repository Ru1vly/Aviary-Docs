'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface AviaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  children,
  ...rest
}: AviaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        'aviary-btn',
        `aviary-btn-${size}`,
        `aviary-btn-${variant}`,
        fullWidth && 'aviary-btn-full',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

