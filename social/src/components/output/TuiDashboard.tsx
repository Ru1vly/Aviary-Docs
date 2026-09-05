import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, stagger } from '../../motion';

const CATEGORIES = [
  { name: 'Meta Tags', pass: 5, total: 6 },
  { name: 'Headings', pass: 3, total: 3 },
  { name: 'Images', pass: 1, total: 2 },
  { name: 'Accessibility', pass: 2, total: 4 },
  { name: 'Core Web Vitals', pass: 17, total: 20 },
  { name: 'Spam Detection', pass: 15, total: 15 },
  { name: 'Mobile UX', pass: 14, total: 15 },
  { name: 'Structured Data', pass: 3, total: 3 },
  { name: 'Heatmap & UX', pass: 4, total: 5 },
];

const CHECKS = [
  { verdict: 'pass' as const, text: 'Title is optimal (54 chars)' },
  { verdict: 'warn' as const, text: 'Description is short (98 chars)' },
  { verdict: 'fail' as const, text: 'Canonical URL is missing' },
  { verdict: 'pass' as const, text: 'Open Graph title present' },
  { verdict: 'warn' as const, text: 'og:image is missing' },
  { verdict: 'pass' as const, text: 'Viewport meta is present' },
  { verdict: 'pass' as const, text: 'Charset declared in first 1024b' },
  { verdict: 'warn' as const, text: 'twitter:card not set' },
  { verdict: 'pass' as const, text: 'No duplicate meta descriptions' },
];

const VERDICT_COLOR = { pass: color.pass, warn: color.warn, fail: color.fail };

/**
 * The Rust TUI dashboard: categories on the left, checks for the selected
 * category on the right, detail below.
 *
 * The selection walks down the category list on a timer, and the right pane
 * re-renders with it — that motion is what communicates "interactive dashboard"
 * rather than "static screenshot".
 */
export const TuiDashboard: React.FC<{
  width?: number;
  height?: number;
  startFrame?: number;
  /** Frames between each downward move of the selection. */
  selectEvery?: number;
}> = ({ width = 900, height = 480, startFrame = 0, selectEvery = 26 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const selected = Math.min(CATEGORIES.length - 1, Math.floor(elapsed / selectEvery));

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        border: `1px solid ${color.hairline}`,
        background: color.ink1000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        opacity: anim(frame, [startFrame, startFrame + 12], [0, 1], ease.softOut),
      }}
    >
      <div
        style={{
          padding: '14px 24px',
          borderBottom: `1px solid ${color.hairline}`,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: font.code,
          fontSize: 23,
          color: color.ochre400,
        }}
      >
        <span>aviary · https://example.com</span>
        <span style={{ color: color.bone500 }}>preset advanced · 235 checks</span>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.35fr', minHeight: 0 }}>
        {/* Category pane */}
        <div style={{ borderRight: `1px solid ${color.hairline}`, padding: '10px 0' }}>
          {CATEGORIES.map((c, i) => {
            const active = i === selected;
            return (
              <div
                key={c.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '13px 24px',
                  fontFamily: font.code,
                  fontSize: 25,
                  color: active ? color.ink1000 : color.bone300,
                  background: active ? color.ochre400 : 'transparent',
                }}
              >
                <span>{c.name}</span>
                <span style={{ opacity: 0.75 }}>
                  {c.pass}/{c.total}
                </span>
              </div>
            );
          })}
        </div>

        {/* Check pane — keyed on `selected` so entries re-animate on each move */}
        <div style={{ padding: '10px 20px' }} key={selected}>
          {CHECKS.map((chk, i) => {
            const at = stagger(i, 3, startFrame + selected * selectEvery);
            return (
              <div
                key={chk.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 0',
                  fontFamily: font.code,
                  fontSize: 25,
                  color: color.bone200,
                  opacity: anim(frame, [at, at + 8], [0, 1], ease.softOut),
                  translate: `${anim(frame, [at, at + 12], [12, 0], ease.quintOut)}px 0`,
                }}
              >
                <span
                  style={{
                    color: VERDICT_COLOR[chk.verdict],
                    textTransform: 'uppercase',
                    fontSize: 18,
                    letterSpacing: 1,
                    border: `1px solid ${VERDICT_COLOR[chk.verdict]}`,
                    borderRadius: 4,
                    padding: '2px 8px',
                    minWidth: 64,
                    textAlign: 'center',
                  }}
                >
                  {chk.verdict}
                </span>
                <span>{chk.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${color.hairline}`,
          padding: '13px 24px',
          fontFamily: font.code,
          fontSize: 22,
          color: color.bone500,
          display: 'flex',
          gap: 26,
        }}
      >
        <span>↑↓ navigate</span>
        <span>1 all</span>
        <span>2 failed</span>
        <span>3 warnings</span>
        <span>q quit</span>
      </div>
    </div>
  );
};
