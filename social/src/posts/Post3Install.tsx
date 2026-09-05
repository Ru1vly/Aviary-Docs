import React from 'react';
import { CheckRow } from '../components/CheckRow';
import { TerminalWindow } from '../components/TerminalWindow';
import { PostFooter, PostShell } from './PostShell';
import { color, font } from '../theme';
import { useBrandFonts } from '../useBrandFonts';

export const Post3Install: React.FC = () => {
  useBrandFonts();

  return (
    <PostShell glow="top">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <span
          style={{
            fontFamily: font.display,
            fontSize: 56,
            color: color.bone100,
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          One command. A full audit.
        </span>
        <TerminalWindow url="https://example.com" width={860}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: font.code, fontSize: 24, color: color.bone100 }}>
              <span style={{ color: color.bone500 }}>$ </span>
              aviary -u https://example.com
            </span>
            <div style={{ height: 14 }} />
            <span style={{ fontFamily: font.code, fontWeight: 700, fontSize: 28, color: color.pass }}>
              Score: 91 / 100
            </span>
            <span style={{ fontFamily: font.code, fontSize: 20, color: color.bone500, marginBottom: 8 }}>
              Total checks: 235 · Passed: 214 · Failed: 21
            </span>
            <CheckRow verdict="pass" label="Title is optimal" appearFrame={-20} fontSize={22} />
            <CheckRow verdict="fail" label="Canonical URL is missing" appearFrame={-20} fontSize={22} />
          </div>
        </TerminalWindow>
        <span style={{ fontFamily: font.ui, fontSize: 20, color: color.bone500 }}>npm install -g aviary</span>
      </div>
      <PostFooter />
    </PostShell>
  );
};
