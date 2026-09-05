import React from 'react';
import { color, font } from '../theme';

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      border: `1px solid ${color.lineDefault}`,
      borderRadius: 999,
      padding: '10px 20px',
      fontFamily: font.ui,
      fontSize: 18,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: color.bone400,
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color.ochre400 }} />
    {children}
  </span>
);
