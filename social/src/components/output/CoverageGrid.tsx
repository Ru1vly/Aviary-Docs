import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, stagger } from '../../motion';
import { COVERAGE } from '../../data';

const bandColor = (pct: number): string => {
  if (pct >= 90) return color.pass;
  if (pct >= 70) return color.warn;
  return color.fail;
};

/**
 * The report's "Category coverage" panel — all 28 categories, each filling to
 * its pass rate.
 *
 * The count of categories is the point here, so the tiles are deliberately
 * small and the whole grid is legible in one glance. Bars fill on a diagonal
 * stagger (row + column) rather than in reading order, which makes 28 separate
 * animations read as one sweep.
 */
export const CoverageGrid: React.FC<{
  columns?: number;
  startFrame?: number;
  width?: number;
  /** Only draw the first N categories — useful for tighter frames. */
  limit?: number;
}> = ({ columns = 4, startFrame = 0, width = 984, limit }) => {
  const frame = useCurrentFrame();
  const items = limit ? COVERAGE.slice(0, limit) : COVERAGE;

  return (
    <div
      style={{
        width,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 18,
      }}
    >
      {items.map((c, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        const at = stagger(row + col, 3, startFrame);
        const enter = anim(frame, [at, at + 16], [0, 1], ease.quintOut);
        const fill = anim(frame, [at + 4, at + 30], [0, c.pct], ease.expoOut);

        return (
          <div
            key={c.code}
            style={{
              border: `1px solid ${color.hairline}`,
              borderRadius: 12,
              background: color.ink900,
              padding: '20px 20px 22px',
              opacity: enter,
              translate: `0 ${anim(frame, [at, at + 16], [14, 0], ease.quintOut)}px`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: font.ui,
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: 1.5,
                  color: color.bone300,
                }}
              >
                {c.code}
              </span>
              <span
                style={{
                  fontFamily: font.code,
                  fontSize: 24,
                  color: bandColor(c.pct),
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {Math.round(fill)}%
              </span>
            </div>
            <div
              style={{
                marginTop: 14,
                height: 7,
                borderRadius: 999,
                background: color.hairline,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${fill}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: bandColor(c.pct),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
