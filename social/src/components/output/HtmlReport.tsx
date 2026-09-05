import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, stagger } from '../../motion';
import { COVERAGE, ISSUES, SAMPLE_FAILED, SAMPLE_PASSED, TOTAL_CHECKS, type Verdict } from '../../data';
import { ScoreDial } from './ScoreDial';

const VERDICT_COLOR: Record<Verdict, string> = {
  pass: color.pass,
  warn: color.warn,
  fail: color.fail,
  info: color.info,
};

const CAT_COLOR: Record<string, string> = {
  seo: color.ochre400,
  accessibility: color.slateBlue400,
  performance: color.vermilion400,
  ux: color.plum400,
  security: color.lichen400,
};

/**
 * `aviary -u <url> --html report.html` — the self-contained report page.
 *
 * Score and grade up top, ranked issues in the middle, category coverage at the
 * bottom. Rendered inside a browser chrome so it's unmistakably "a page you
 * open", not another terminal.
 */
export const HtmlReport: React.FC<{
  width?: number;
  startFrame?: number;
}> = ({ width = 984, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        borderRadius: 18,
        border: `1px solid ${color.hairline}`,
        background: color.ink950,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        opacity: anim(frame, [startFrame, startFrame + 14], [0, 1], ease.softOut),
        scale: anim(frame, [startFrame, startFrame + 22], [0.96, 1], ease.expoOut),
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 22px',
          borderBottom: `1px solid ${color.hairline}`,
          background: color.ink900,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {[color.vermilion400, color.ochre400, color.lichen400].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: color.ink1000,
            border: `1px solid ${color.lineDefault}`,
            borderRadius: 8,
            padding: '9px 18px',
            fontFamily: font.code,
            fontSize: 23,
            color: color.bone400,
          }}
        >
          file:///reports/report.html
        </div>
      </div>

      <div style={{ padding: '38px 42px 42px' }}>
        {/* Score header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <ScoreDial score={91} size={200} thickness={8} appearFrame={startFrame + 8} durationFrames={40} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 21,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: color.bone500,
                opacity: anim(frame, [startFrame + 12, startFrame + 26], [0, 1], ease.softOut),
              }}
            >
              https://example.com
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                gap: 10,
                opacity: anim(frame, [startFrame + 16, startFrame + 32], [0, 1], ease.softOut),
                translate: `0 ${anim(frame, [startFrame + 16, startFrame + 32], [10, 0], ease.quintOut)}px`,
              }}
            >
              {[
                { label: `${SAMPLE_PASSED} passed`, c: color.pass },
                { label: `${SAMPLE_FAILED} failed`, c: color.fail },
                { label: `${TOTAL_CHECKS} total`, c: color.bone400 },
              ].map((t) => (
                <span
                  key={t.label}
                  style={{
                    fontFamily: font.code,
                    fontSize: 25,
                    color: t.c,
                    border: `1px solid ${t.c}44`,
                    borderRadius: 999,
                    padding: '7px 19px',
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <span
            style={{
              fontFamily: font.code,
              fontWeight: 700,
              fontSize: 100,
              color: color.pass,
              opacity: anim(frame, [startFrame + 30, startFrame + 44], [0, 1], ease.backOut),
              scale: anim(frame, [startFrame + 30, startFrame + 44], [0.6, 1], ease.backOut),
            }}
          >
            A
          </span>
        </div>

        {/* Ranked issues */}
        <div
          style={{
            marginTop: 36,
            fontFamily: font.ui,
            fontSize: 20,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: color.bone500,
          }}
        >
          Top fixes
        </div>
        <div style={{ marginTop: 14, borderTop: `1px solid ${color.hairline}` }}>
          {ISSUES.slice(0, 4).map((issue, i) => {
            const at = stagger(i, 7, startFrame + 34);
            return (
              <div
                key={issue.message}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: 20,
                  padding: '16px 4px',
                  borderBottom: `1px solid ${color.hairline}`,
                  opacity: anim(frame, [at, at + 12], [0, 1], ease.softOut),
                  translate: `${anim(frame, [at, at + 14], [-14, 0], ease.quintOut)}px 0`,
                }}
              >
                <span
                  style={{
                    fontFamily: font.code,
                    fontSize: 20,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: VERDICT_COLOR[issue.verdict],
                    border: `1px solid ${VERDICT_COLOR[issue.verdict]}`,
                    borderRadius: 6,
                    padding: '3px 12px',
                    minWidth: 72,
                    textAlign: 'center',
                  }}
                >
                  {issue.verdict}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: font.ui, fontSize: 28, color: color.bone200 }}>
                    {issue.message}
                  </div>
                  <div style={{ fontFamily: font.code, fontSize: 21, color: color.bone500, marginTop: 3 }}>
                    {issue.selector}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: font.ui,
                    fontSize: 18,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: CAT_COLOR[issue.category],
                  }}
                >
                  {issue.category}
                </span>
              </div>
            );
          })}
        </div>

        {/* Category coverage strip */}
        <div
          style={{
            marginTop: 32,
            fontFamily: font.ui,
            fontSize: 20,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: color.bone500,
          }}
        >
          Category coverage
        </div>
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            // One row of 28 — two rows read as a chart with a broken axis.
            gridTemplateColumns: 'repeat(28, 1fr)',
            gap: 5,
            alignItems: 'end',
            height: 110,
          }}
        >
          {COVERAGE.map((c, i) => {
            const at = stagger(i, 1.6, startFrame + 46);
            const h = anim(frame, [at, at + 20], [0, c.pct], ease.expoOut);
            return (
              <div
                key={c.code}
                title={c.name}
                style={{
                  height: `${h}%`,
                  borderRadius: 3,
                  background:
                    c.pct >= 90 ? color.pass : c.pct >= 70 ? color.warn : color.fail,
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
