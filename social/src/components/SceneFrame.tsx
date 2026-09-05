import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font } from '../theme';
import { anim, ease } from '../motion';

/**
 * Safe-area wrapper for reel content.
 *
 * 9:16 platforms overlay UI at the very top and bottom of the frame, so nothing
 * meaningful goes in the outer ~170px. Every reel scene centres inside this.
 */
export const Center: React.FC<{
  children: React.ReactNode;
  /** Extra vertical padding beyond the platform-safe area. */
  pad?: number;
}> = ({ children, pad = 0 }) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${170 + pad}px 48px`,
    }}
  >
    {children}
  </AbsoluteFill>
);

/**
 * Persistent reel chrome: a wordmark, a caption, and a progress bar tracking
 * position through the whole video.
 *
 * Sits above every scene, so it must be mounted once at the reel root rather
 * than per-scene — a per-scene progress bar would reset on every cut.
 */
export const ReelChrome: React.FC<{
  caption?: string;
  showProgress?: boolean;
}> = ({ caption, showProgress = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: 96,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 14,
          opacity: anim(frame, [6, 26], [0, 1], ease.softOut),
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: color.ochre400 }} />
        <span
          style={{
            fontFamily: font.ui,
            fontWeight: 600,
            fontSize: 21,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: color.bone400,
          }}
        >
          Aviary
        </span>
      </div>

      {caption ? (
        <div
          style={{
            position: 'absolute',
            bottom: 118,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: font.ui,
            fontSize: 22,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: color.bone500,
            opacity: anim(frame, [10, 30], [0, 1], ease.softOut),
          }}
        >
          {caption}
        </div>
      ) : null}

      {showProgress ? (
        <div
          style={{
            position: 'absolute',
            bottom: 78,
            left: 72,
            right: 72,
            height: 3,
            borderRadius: 999,
            background: color.hairline,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: color.ochre400,
              borderRadius: 999,
            }}
          />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/**
 * An eyebrow label — small, tracked-out caps above a headline. Rises into place
 * rather than fading, so it leads the eye to the line below it.
 */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  appearFrame?: number;
  tone?: string;
  size?: number;
}> = ({ children, appearFrame = 0, tone = color.bone500, size = 27 }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        fontFamily: font.ui,
        fontSize: size,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: tone,
        textAlign: 'center',
        opacity: anim(frame, [appearFrame, appearFrame + 16], [0, 1], ease.softOut),
        translate: `0 ${anim(frame, [appearFrame, appearFrame + 22], [12, 0], ease.expoOut)}px`,
      }}
    >
      {children}
    </span>
  );
};
