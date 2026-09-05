import React from 'react';
import { CheckRow } from '../components/CheckRow';
import { PostFooter, PostShell } from './PostShell';
import { color, font } from '../theme';
import { useBrandFonts } from '../useBrandFonts';

export const Post5Position: React.FC = () => {
  useBrandFonts();

  return (
    <PostShell glow="center">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: font.display, fontSize: 58, color: color.bone100, textAlign: 'center' }}>
            Checked after your
          </span>
          <span style={{ fontFamily: font.display, fontSize: 58, color: color.bone100, textAlign: 'center' }}>
            JavaScript runs.
          </span>
          <span style={{ fontFamily: font.display, fontSize: 58, color: color.ochre400, textAlign: 'center' }}>
            Not before.
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 780 }}>
          <CheckRow verdict="fail" label="Canonical URL is missing" appearFrame={-20} fontSize={26} />
          <CheckRow verdict="fail" label="7 form inputs missing labels" appearFrame={-20} fontSize={26} />
          <CheckRow verdict="warn" label="Missing essential Open Graph tags" appearFrame={-20} fontSize={26} />
        </div>
        <span style={{ fontFamily: font.ui, fontSize: 20, color: color.bone500 }}>Chromium via Playwright</span>
      </div>
      <PostFooter />
    </PostShell>
  );
};
