import React from 'react';
import { PostFooter, PostShell } from './PostShell';
import { color, font } from '../theme';
import { useBrandFonts } from '../useBrandFonts';

const CATEGORIES: [string, string][] = [
  ['META', 'Meta Tags'],
  ['HEAD', 'Headings'],
  ['IMG', 'Images'],
  ['PERF', 'Performance'],
  ['ROBO', 'Robots.txt'],
  ['SITE', 'Sitemap'],
  ['SEC', 'Security'],
  ['SCHM', 'Structured Data'],
  ['SOCL', 'Social Media'],
  ['CNTT', 'Content'],
  ['LINK', 'Links'],
  ['UI', 'UI Elements'],
  ['TECH', 'Technical SEO'],
  ['A11Y', 'Accessibility'],
  ['URL', 'URL Factors'],
  ['SPAM', 'Spam Detection'],
  ['CWV', 'Core Web Vitals'],
  ['ANLY', 'Analytics'],
  ['MOBL', 'Mobile UX'],
  ['SCVL', 'Schema Validation'],
  ['LEGL', 'Legal'],
  ['I18N', 'i18n'],
];

export const Post2Grid: React.FC = () => {
  useBrandFonts();

  return (
    <PostShell glow="top">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: font.display, fontSize: 56, color: color.bone100, textAlign: 'center' }}>
            28 categories.
          </span>
          <span style={{ fontFamily: font.display, fontSize: 56, color: color.ochre400, textAlign: 'center' }}>
            Every layer of your site.
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
            width: '100%',
            maxWidth: 900,
          }}
        >
          {CATEGORIES.map(([code, name]) => (
            <div
              key={code}
              style={{
                border: `1px solid ${color.hairline}`,
                borderRadius: 12,
                background: color.ink900,
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span style={{ fontFamily: font.code, fontWeight: 700, fontSize: 20, color: color.ochre400 }}>
                {code}
              </span>
              <span style={{ fontFamily: font.ui, fontSize: 14, color: color.bone400, lineHeight: 1.3 }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <PostFooter />
    </PostShell>
  );
};
