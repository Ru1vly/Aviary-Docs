import React from 'react';
import { PostFooter, PostShell } from './PostShell';
import { color, font } from '../theme';
import { useBrandFonts } from '../useBrandFonts';

const SURFACES = [
  { name: 'CLI', code: 'aviary -u https://example.com' },
  { name: 'TypeScript', code: 'new SEOChecker({ url }).check()' },
  { name: 'CI', code: 'aviary -u $DEPLOY_URL -p strict' },
  { name: 'HTML reports', code: 'aviary -u ... --html report.html' },
  { name: 'MCP', code: 'aviary-mcp' },
];

export const Post4Surfaces: React.FC = () => {
  useBrandFonts();

  return (
    <PostShell glow="center">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, width: '100%' }}>
        <span
          style={{
            fontFamily: font.display,
            fontSize: 56,
            color: color.bone100,
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          One engine. Five ways in.
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 860 }}>
          {SURFACES.map((s) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                border: `1px solid ${color.hairline}`,
                borderRadius: 14,
                background: color.ink900,
                padding: '18px 26px',
              }}
            >
              <span
                style={{
                  fontFamily: font.ui,
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: color.ochre400,
                  minWidth: 190,
                }}
              >
                {s.name}
              </span>
              <span style={{ fontFamily: font.code, fontSize: 22, color: color.bone300 }}>{s.code}</span>
            </div>
          ))}
        </div>
      </div>
      <PostFooter />
    </PostShell>
  );
};
