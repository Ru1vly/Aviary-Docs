import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../theme';
import { anim, ease } from '../motion';

type Verdict = 'pass' | 'warn' | 'fail' | 'info';

const VERDICT_COLOR: Record<Verdict, string> = {
  pass: color.pass,
  warn: color.warn,
  fail: color.fail,
  info: color.info,
};

/**
 * One check result.
 *
 * The row slides in from the left on `expoOut` while the verdict badge pops on
 * `backOut` a couple of frames behind it — the badge arriving last is what
 * makes the verdict feel like a decision rather than part of the layout.
 */
export const CheckRow: React.FC<{
  verdict: Verdict;
  label: string;
  value?: string;
  selector?: string;
  appearFrame: number;
  fontSize?: number;
}> = ({ verdict, label, value, selector, appearFrame, fontSize = 28 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '11px 0',
        borderBottom: `1px solid ${color.hairline}`,
        opacity: anim(frame, [appearFrame, appearFrame + 12], [0, 1], ease.softOut),
        translate: `${anim(frame, [appearFrame, appearFrame + 20], [-22, 0], ease.expoOut)}px 0`,
      }}
    >
      <span
        style={{
          fontFamily: font.code,
          fontSize: fontSize * 0.6,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: VERDICT_COLOR[verdict],
          border: `1px solid ${VERDICT_COLOR[verdict]}`,
          borderRadius: 6,
          padding: '3px 10px',
          minWidth: fontSize * 2.7,
          textAlign: 'center',
          flexShrink: 0,
          scale: anim(frame, [appearFrame + 4, appearFrame + 18], [0.5, 1], ease.backOut),
        }}
      >
        {verdict}
      </span>
      <span
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: value ? 'space-between' : 'flex-start',
          alignItems: 'baseline',
          gap: 12,
          minWidth: 0,
        }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <span style={{ fontFamily: font.code, fontSize, color: color.bone200 }}>{label}</span>
          {selector ? (
            <span style={{ fontFamily: font.code, fontSize: fontSize * 0.62, color: color.bone500 }}>
              {selector}
            </span>
          ) : null}
        </span>
        {value ? (
          <span
            style={{
              fontFamily: font.code,
              fontSize,
              color: color.bone400,
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
            }}
          >
            {value}
          </span>
        ) : null}
      </span>
    </div>
  );
};
