import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease } from '../../motion';

const bandColor = (score: number): string => {
  if (score >= 90) return color.pass;
  if (score >= 50) return color.warn;
  return color.fail;
};

/**
 * The score dial from the report, drawn as a real sweeping arc.
 *
 * The arc and the number are driven off the same eased progress so the digits
 * never run ahead of the ring. Digits use the mono face — Lancelot's numerals
 * are unusable at display size.
 */
export const ScoreDial: React.FC<{
  score: number;
  size?: number;
  thickness?: number;
  appearFrame?: number;
  durationFrames?: number;
  label?: string;
  /** Score to count up *from* — use for the "your old tool said 94" drop. */
  fromScore?: number;
}> = ({
  score,
  size = 260,
  thickness = 8,
  appearFrame = 0,
  durationFrames = 46,
  label,
  fromScore = 0,
}) => {
  const frame = useCurrentFrame();
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;

  // One eased progress value drives both the ring and the digits.
  const progress = anim(frame, [appearFrame, appearFrame + durationFrames], [0, 1], ease.expoOut);
  const value = fromScore + (score - fromScore) * progress;
  const shown = Math.round(value);
  const ringColor = bandColor(shown);

  // A short bloom as the arc lands, so the number arrives with weight.
  const bloom = anim(
    frame,
    [appearFrame + durationFrames - 8, appearFrame + durationFrames + 10],
    [0, 1],
    ease.softOut,
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          scale: anim(frame, [appearFrame, appearFrame + 20], [0.9, 1], ease.backOut),
        }}
      >
        <svg width={size} height={size} style={{ rotate: '-90deg', overflow: 'visible' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color.hairline}
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={ringColor}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            style={{ filter: `drop-shadow(0 0 ${12 + bloom * 20}px ${ringColor}66)` }}
          />
        </svg>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: font.code,
            fontWeight: 700,
            fontSize: Math.round(size * 0.36),
            color: ringColor,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {shown}
        </span>
      </div>
      {label ? (
        <span
          style={{
            fontFamily: font.ui,
            fontSize: Math.round(size * 0.075),
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: color.bone500,
            opacity: anim(frame, [appearFrame + 10, appearFrame + 26], [0, 1], ease.softOut),
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
