import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease } from '../../motion';

const SPIN = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

type Step = {
  label: string;
  /** How long the step animates for — compressed, not real time. */
  durationFrames: number;
  /** What the run actually took, printed on the row. */
  elapsed: string;
  verdict: 'pass' | 'fail';
};

const STEPS: Step[] = [
  { label: 'Install chromium', durationFrames: 13, elapsed: '24s', verdict: 'pass' },
  { label: 'Build preview', durationFrames: 11, elapsed: '1m 12s', verdict: 'pass' },
  { label: 'Playwright · checkout.spec.ts (42 tests)', durationFrames: 14, elapsed: '38s', verdict: 'pass' },
  { label: 'Aviary · audit rendered site', durationFrames: 20, elapsed: '19s', verdict: 'fail' },
];

/**
 * A deploy-preview check run, ending in the one line that matters: the tests
 * are green and the audit still catches things they never look at.
 *
 * Steps run sequentially — spinner while running, verdict on completion — so
 * the failure reads as an outcome rather than a pre-baked red row.
 */
export const CiCheckPanel: React.FC<{
  width?: number;
  startFrame?: number;
}> = ({ width = 900, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  // Precompute when each step starts and finishes.
  let cursor = startFrame + 8;
  const timed = STEPS.map((s) => {
    const begin = cursor;
    cursor += s.durationFrames;
    return { ...s, begin, end: cursor };
  });

  const allDone = frame >= cursor;

  return (
    <div
      style={{
        width,
        borderRadius: 16,
        border: `1px solid ${color.hairline}`,
        background: color.ink900,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        opacity: anim(frame, [startFrame, startFrame + 12], [0, 1], ease.softOut),
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${color.hairline}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: font.ui,
          fontSize: 17,
          color: color.bone400,
        }}
      >
        <span style={{ letterSpacing: 2, textTransform: 'uppercase', fontSize: 15, color: color.bone500 }}>
          deploy-preview · audit.yml
        </span>
        <span
          style={{
            fontFamily: font.code,
            fontSize: 17,
            color: allDone ? color.fail : color.ochre400,
          }}
        >
          {allDone ? 'failed' : 'running'}
        </span>
      </div>

      <div style={{ padding: '10px 24px 20px' }}>
        {timed.map((s, i) => {
          const started = frame >= s.begin;
          const finished = frame >= s.end;
          if (!started) return null;

          const c = finished
            ? s.verdict === 'pass'
              ? color.pass
              : color.fail
            : color.ochre400;

          return (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '13px 0',
                borderBottom: i < timed.length - 1 ? `1px solid ${color.hairline}` : 'none',
                opacity: anim(frame, [s.begin, s.begin + 8], [0, 1], ease.softOut),
                translate: `0 ${anim(frame, [s.begin, s.begin + 12], [8, 0], ease.quintOut)}px`,
              }}
            >
              <span
                style={{
                  fontFamily: font.code,
                  fontSize: 26,
                  color: c,
                  width: 30,
                  textAlign: 'center',
                  flexShrink: 0,
                  // Verdict glyph pops in; the spinner just spins.
                  scale: finished
                    ? anim(frame, [s.end, s.end + 10], [0.4, 1], ease.backOut)
                    : 1,
                }}
              >
                {finished ? (s.verdict === 'pass' ? '✓' : '✗') : SPIN[frame % SPIN.length]}
              </span>
              <span style={{ flex: 1, fontFamily: font.ui, fontSize: 23, color: color.bone200 }}>
                {s.label}
              </span>
              {finished ? (
                <span style={{ fontFamily: font.code, fontSize: 19, color: color.bone500 }}>
                  {s.elapsed}
                </span>
              ) : null}
            </div>
          );
        })}

        {allDone ? (
          <div
            style={{
              marginTop: 16,
              borderLeft: `2px solid ${color.fail}`,
              paddingLeft: 18,
              opacity: anim(frame, [cursor, cursor + 12], [0, 1], ease.softOut),
              translate: `${anim(frame, [cursor, cursor + 16], [-10, 0], ease.quintOut)}px 0`,
            }}
          >
            <div style={{ fontFamily: font.code, fontSize: 22, color: color.fail }}>
              Score 61/100 below threshold 80 — blocking merge
            </div>
            <div style={{ fontFamily: font.code, fontSize: 20, color: color.bone500, marginTop: 6 }}>
              canonical missing · 7 inputs unlabeled · og:image absent
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const CI_PANEL_DURATION = 8 + STEPS.reduce((a, s) => a + s.durationFrames, 0) + 30;
