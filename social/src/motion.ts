import { Easing, interpolate } from 'remotion';

/**
 * Named easing curves used across the reels and posts.
 *
 * Each entry has a distinct personality so scenes don't all move the same way:
 * content arrives with `expoOut`, UI chrome snaps with `snap`, numbers that are
 * meant to feel physical land with `backOut`, and anything failing/crashing
 * uses an `in` curve so it accelerates away instead of easing to a stop.
 */
export const ease = {
  /** Mirrors --ease-standard on the marketing site. Neutral, for UI chrome. */
  standard: Easing.bezier(0.2, 0, 0, 1),
  /** Long, soft arrival. The default for text and panels entering. */
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),
  /** Slightly tighter than expoOut — for secondary content following a lead. */
  quintOut: Easing.bezier(0.22, 1, 0.36, 1),
  /** Gentle deceleration without the long tail. Good for opacity. */
  softOut: Easing.bezier(0.33, 1, 0.68, 1),
  /** Overshoots the target then settles. For badges, counters, stamps. */
  backOut: Easing.bezier(0.34, 1.56, 0.64, 1),
  /** Pulls back before launching forward. For emphasis on a single element. */
  anticipate: Easing.bezier(0.68, -0.5, 0.27, 1.4),
  /** Slow start, violent finish. For failures, drops and exits. */
  sharpIn: Easing.bezier(0.7, 0, 0.84, 0),
  /** Fast through the middle, hard stops at both ends. For beat-synced cuts. */
  snap: Easing.bezier(0.9, 0, 0.1, 1),
  /** Symmetrical acceleration/deceleration. For camera pushes and pans. */
  smoothInOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Very slight drift. For continuous ambient motion. */
  drift: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  /** Springy oscillation on arrival. Use sparingly — it reads as playful. */
  elasticOut: Easing.out(Easing.elastic(1.1)),
  /** Settles with two small bounces. For things that "land". */
  bounceOut: Easing.out(Easing.bounce),
} as const;

export type EaseFn = (t: number) => number;

/** `interpolate` with clamped extrapolation, which is what we want ~always. */
export const anim = (
  frame: number,
  range: readonly [number, number],
  output: readonly [number, number],
  easing: EaseFn = ease.expoOut,
): number =>
  interpolate(frame, range as [number, number], output as [number, number], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * A 0→1 progress value that eases in at the start of a scene and back out at
 * the end, so scenes breathe instead of popping on and cutting off.
 */
export const inOut = (
  frame: number,
  duration: number,
  inFrames = 14,
  outFrames = 12,
): number =>
  Math.min(
    anim(frame, [0, inFrames], [0, 1], ease.expoOut),
    anim(frame, [duration - outFrames, duration], [1, 0], ease.sharpIn),
  );

/** Frame offset for the i-th item in a staggered list. */
export const stagger = (index: number, per = 6, start = 0): number => start + index * per;

/**
 * Continuous, non-repeating drift for ambient motion (background parallax,
 * slow scale). Deterministic so renders are reproducible.
 */
export const wobble = (frame: number, period: number, amplitude: number, phase = 0): number =>
  Math.sin((frame / period) * Math.PI * 2 + phase) * amplitude;
