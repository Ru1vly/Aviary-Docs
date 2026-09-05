import React, { useId, useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { color } from '../theme';
import { anim, ease, wobble } from '../motion';

const GRAIN_TILE = 180;

/**
 * Film grain, as an inline SVG pattern.
 *
 * The turbulence filter runs on one 180px tile rather than the full 1080×1920
 * frame, and the tile is translated each frame so the noise moves instead of
 * looking like a texture baked onto the image. (CSS `background-image` would be
 * the obvious way to do this, but Remotion can't tell when such an image has
 * loaded and renders it as a flicker.)
 */
const Grain: React.FC<{ frame: number }> = ({ frame }) => {
  // Two scenes overlap during a transition, so the filter/pattern ids have to
  // be unique per instance.
  const id = useId().replace(/:/g, '');

  return (
    <AbsoluteFill style={{ opacity: 0.05 }}>
      <svg width="100%" height="100%">
        <defs>
          <filter id={`noise-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <pattern
            id={`grain-${id}`}
            width={GRAIN_TILE}
            height={GRAIN_TILE}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${(frame * 13) % GRAIN_TILE} ${(frame * 7) % GRAIN_TILE})`}
          >
            <rect width={GRAIN_TILE} height={GRAIN_TILE} filter={`url(#noise-${id})`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grain-${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

const PARTICLE_COUNT = 54;

type Particle = { x: number; y: number; r: number; speed: number; phase: number; depth: number };

const seededParticles = (seed: number, count: number): Particle[] => {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => {
    const depth = rand();
    return {
      x: rand() * 100,
      y: rand() * 100,
      // Nearer particles are larger and drift faster — cheap parallax depth.
      r: 0.8 + depth * 2.6,
      speed: 0.1 + depth * 0.45,
      phase: rand() * Math.PI * 2,
      depth,
    };
  });
};

export const Background: React.FC<{
  glow?: 'top' | 'center' | 'bottom' | 'none';
  /** Tint the glow — defaults to brand ochre. */
  tint?: string;
  /** Slow push-in over the scene. Adds life to otherwise static frames. */
  drift?: boolean;
  grain?: boolean;
}> = ({ glow = 'top', tint = '224,177,90', drift = true, grain = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const particles = useMemo(() => seededParticles(7, PARTICLE_COUNT), []);

  // Glow blooms in, holds, and eases off so consecutive scenes don't strobe.
  const glowOpacity = Math.min(
    anim(frame, [0, 24], [0, 1], ease.softOut),
    anim(frame, [durationInFrames - 24, durationInFrames], [1, 0.65], ease.softOut),
  );

  const gradient =
    glow === 'top'
      ? `radial-gradient(ellipse 120% 60% at 50% -10%, rgba(${tint},0.18), transparent 62%)`
      : glow === 'center'
        ? `radial-gradient(ellipse 90% 60% at 50% 48%, rgba(${tint},0.15), transparent 66%)`
        : glow === 'bottom'
          ? `radial-gradient(ellipse 120% 55% at 50% 108%, rgba(${tint},0.18), transparent 62%)`
          : 'none';

  return (
    <AbsoluteFill style={{ background: color.ink950, overflow: 'hidden' }}>
      {glow !== 'none' ? (
        <AbsoluteFill
          style={{
            opacity: glowOpacity,
            background: gradient,
            // Breathing the glow keeps long holds from looking like a freeze.
            scale: 1 + wobble(frame, 150, 0.04),
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          scale: drift ? anim(frame, [0, durationInFrames], [1, 1.06], ease.drift) : 1,
        }}
      >
        {particles.map((p, i) => {
          const y = (p.y + frame * p.speed * 0.06) % 100;
          const twinkle = 0.3 + 0.5 * Math.abs(Math.sin(frame / 42 + p.phase));
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${p.x + wobble(frame, 200, 0.5, p.phase)}%`,
                top: `${y}%`,
                width: p.r * 2,
                height: p.r * 2,
                borderRadius: '50%',
                background: color.bone300,
                opacity: twinkle * (0.2 + p.depth * 0.4),
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Vignette — pulls the eye to the centre of a 9:16 frame. */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 78% 62% at 50% 50%, transparent 40%, rgba(8,9,8,0.62) 100%)',
        }}
      />

      {grain ? <Grain frame={frame} /> : null}
    </AbsoluteFill>
  );
};
