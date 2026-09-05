import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, wobble } from '../../motion';
import type { Grid } from '../../audio';

/**
 * Edit-style primitives for the Gen-Z cuts.
 *
 * These deliberately break the house style of the brand reels: no fades, no
 * long eases, everything lands hard on a beat and holds. The brand palette is
 * kept — the aggression is all in the timing.
 */

/**
 * Text that slams in on `backOut`, holds, and cuts.
 *
 * The overshoot is what sells it — a linear or `expoOut` entrance at this speed
 * just looks like a dropped frame.
 */
export const PunchText: React.FC<{
  children: React.ReactNode;
  appearFrame?: number;
  size?: number;
  tone?: string;
  weight?: number;
  /** Small fixed rotation, in degrees. Reads as hand-placed, not generated. */
  tilt?: number;
  /** Draw a filled block behind the text, like a caption sticker. */
  highlight?: string;
}> = ({
  children,
  appearFrame = 0,
  size = 96,
  tone = color.bone100,
  weight = 900,
  tilt = 0,
  highlight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = Math.round(fps * 0.28);

  return (
    <span
      style={{
        fontFamily: font.ui,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: -1,
        color: highlight ? color.ink1000 : tone,
        background: highlight,
        padding: highlight ? `${size * 0.08}px ${size * 0.16}px` : undefined,
        borderRadius: highlight ? size * 0.1 : undefined,
        textAlign: 'center',
        display: 'inline-block',
        opacity: anim(frame, [appearFrame, appearFrame + 2], [0, 1], ease.snap),
        scale: anim(frame, [appearFrame, appearFrame + dur], [0.72, 1], ease.backOut),
        rotate: `${tilt}deg`,
      }}
    >
      {children}
    </span>
  );
};

/**
 * Full-frame flash. One or two frames of near-white on a kick, which is what
 * makes a hard cut register as an impact rather than an edit mistake.
 */
export const FlashFrame: React.FC<{
  at: number;
  frames?: number;
  tone?: string;
  /** Opening opacity. Keep low — much above 0.3 and the frame reads as blown
   *  out rather than hit, and it stops being comfortable to watch. */
  peak?: number;
}> = ({ at, frames = 3, tone = color.bone100, peak = 0.22 }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + frames) return null;
  return (
    <AbsoluteFill
      style={{
        background: tone,
        opacity: anim(frame, [at, at + frames], [peak, 0], ease.sharpIn),
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * Beat-synced camera shake.
 *
 * Amplitude decays across each beat via `grid.pulse`, so the frame settles
 * before the next hit instead of vibrating continuously.
 */
export const Shake: React.FC<{
  children: React.ReactNode;
  grid: Grid;
  amount?: number;
  /** Also push the frame in on each beat. */
  zoom?: number;
}> = ({ children, grid, amount = 6, zoom = 0.012 }) => {
  const frame = useCurrentFrame();
  const p = grid.pulse(frame, 0.4);

  return (
    <AbsoluteFill
      style={{
        translate: `${wobble(frame, 3.1, amount) * p}px ${wobble(frame, 2.3, amount, 1.7) * p}px`,
        scale: 1 + zoom * p,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** A rotated caption sticker — pinned label, off-axis, with a hard border. */
export const Sticker: React.FC<{
  children: React.ReactNode;
  appearFrame?: number;
  tone?: string;
  tilt?: number;
  size?: number;
}> = ({ children, appearFrame = 0, tone = color.ochre400, tilt = -3, size = 30 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <span
      style={{
        fontFamily: font.ui,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: tone,
        border: `2px solid ${tone}`,
        borderRadius: 8,
        padding: `${size * 0.28}px ${size * 0.6}px`,
        background: `${color.ink1000}CC`,
        rotate: `${tilt}deg`,
        display: 'inline-block',
        opacity: anim(frame, [appearFrame, appearFrame + 2], [0, 1], ease.snap),
        scale: anim(frame, [appearFrame, appearFrame + Math.round(fps * 0.25)], [0.6, 1], ease.backOut),
      }}
    >
      {children}
    </span>
  );
};

/**
 * A number that counts between two values fast and hard.
 *
 * Uses `sharpIn` when falling so the drop accelerates — a score crashing should
 * not ease gently into its new value.
 */
export const SlamNumber: React.FC<{
  from: number;
  to: number;
  appearFrame: number;
  durationFrames: number;
  size?: number;
  tone?: string;
  suffix?: string;
}> = ({ from, to, appearFrame, durationFrames, size = 300, tone, suffix }) => {
  const frame = useCurrentFrame();
  const falling = to < from;
  const v = anim(
    frame,
    [appearFrame, appearFrame + durationFrames],
    [from, to],
    falling ? ease.sharpIn : ease.expoOut,
  );
  const shown = Math.round(v);
  const auto = shown >= 90 ? color.pass : shown >= 50 ? color.warn : color.fail;

  return (
    <span
      style={{
        fontFamily: font.code,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        color: tone ?? auto,
        fontVariantNumeric: 'tabular-nums',
        textShadow: `0 0 ${size * 0.16}px ${(tone ?? auto)}55`,
        scale: anim(
          frame,
          [appearFrame + durationFrames, appearFrame + durationFrames + 8],
          [1, 1.06],
          ease.backOut,
        ),
      }}
    >
      {shown}
      {suffix ? <span style={{ fontSize: size * 0.4, color: color.bone500 }}>{suffix}</span> : null}
    </span>
  );
};

/**
 * Background for the Gen-Z cuts: a hard vignette over a beat-reactive glow, and
 * horizontal scan bands that step on the beat rather than drifting.
 */
export const GenzBackground: React.FC<{
  grid: Grid;
  tint?: string;
}> = ({ grid, tint = '224,177,90' }) => {
  const frame = useCurrentFrame();
  const p = grid.pulse(frame, 0.7);

  return (
    <AbsoluteFill style={{ background: color.ink1000, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 95% 55% at 50% 50%, rgba(${tint},${0.1 + p * 0.16}), transparent 68%)`,
        }}
      />
      {/* Scan bands — quantised to the beat so they read as part of the track. */}
      <AbsoluteFill
        style={{
          opacity: 0.16,
          background: `repeating-linear-gradient(0deg, transparent 0 5px, rgba(230,227,218,0.10) 5px 6px)`,
          translate: `0 ${Math.floor(frame / (grid.perBeat / 4)) % 6}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, transparent 30%, rgba(8,9,8,0.85) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Platform-safe centred stack for the Gen-Z cuts (tighter than the brand reels). */
export const GenzCenter: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 34,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap,
      padding: '200px 64px',
      textAlign: 'center',
    }}
  >
    {children}
  </AbsoluteFill>
);
