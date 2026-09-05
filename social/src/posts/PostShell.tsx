import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Background } from '../components/Background';
import { color, font } from '../theme';

export const PostShell: React.FC<{ children: React.ReactNode; glow?: 'top' | 'center' }> = ({
  children,
  glow = 'center',
}) => (
  <AbsoluteFill style={{ background: color.ink950 }}>
    <Background glow={glow} />
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 90 }}>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

export const PostFooter: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      position: 'absolute',
      left: 90,
      bottom: 72,
    }}
  >
    <span style={{ fontFamily: font.display, fontSize: 30, color: color.bone100 }}>Aviary</span>
    <span style={{ fontFamily: font.ui, fontSize: 16, color: color.bone500 }}>· npm i -g aviary</span>
  </div>
);
