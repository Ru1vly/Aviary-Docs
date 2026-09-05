import React from 'react';
import { Tag } from '../components/Tag';
import { color, font } from '../theme';
import { PostFooter, PostShell } from './PostShell';
import { useBrandFonts } from '../useBrandFonts';

export const Post1Stat: React.FC = () => {
  useBrandFonts();

  return (
    <PostShell glow="center">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, maxWidth: 860 }}>
        <Tag>Real browser · Real results</Tag>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <span style={{ fontFamily: font.code, fontWeight: 700, fontSize: 168, color: color.ochre400, lineHeight: 1 }}>
            235
          </span>
          <span style={{ fontFamily: font.display, fontSize: 52, color: color.bone100 }}>checks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <span style={{ fontFamily: font.code, fontWeight: 700, fontSize: 96, color: color.bone100, lineHeight: 1 }}>
            28
          </span>
          <span style={{ fontFamily: font.display, fontSize: 44, color: color.bone400 }}>categories</span>
        </div>
        <span
          style={{
            marginTop: 8,
            fontFamily: font.ui,
            fontSize: 26,
            color: color.bone500,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          SEO · Performance · Accessibility · Security · UX
        </span>
      </div>
      <PostFooter />
    </PostShell>
  );
};
