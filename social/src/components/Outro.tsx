import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font, GITHUB_URL, INSTALL_COMMAND } from '../theme';
import { anim, ease, stagger } from '../motion';

/**
 * The end card.
 *
 * Elements arrive in the order the viewer needs them — name, then what it
 * covers, then how to get it — each on a slightly different curve so the block
 * assembles instead of sliding in as one lump. The install command gets a
 * `backOut` overshoot because it's the one thing we want acted on.
 */
export const Outro: React.FC<{
  appearFrame?: number;
  /** Set false on the Gen-Z cuts, which carry their own end card. */
  showGithub?: boolean;
}> = ({ appearFrame = 0, showGithub = true }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 38 }}>
      <span
        style={{
          fontFamily: font.display,
          fontSize: 142,
          lineHeight: 1,
          color: color.bone100,
          letterSpacing: '0.01em',
          opacity: anim(frame, [appearFrame, appearFrame + 18], [0, 1], ease.softOut),
          scale: anim(frame, [appearFrame, appearFrame + 30], [0.86, 1], ease.expoOut),
        }}
      >
        Aviary
      </span>

      <span
        style={{
          fontFamily: font.ui,
          fontSize: 27,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: color.ochre400,
          textAlign: 'center',
          opacity: anim(frame, [stagger(1, 10, appearFrame), stagger(1, 10, appearFrame) + 18], [0, 1], ease.softOut),
          translate: `0 ${anim(frame, [stagger(1, 10, appearFrame), stagger(1, 10, appearFrame) + 24], [14, 0], ease.expoOut)}px`,
        }}
      >
        SEO · Performance · Accessibility · Security · UX
      </span>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: `1px solid ${color.lineStrong}`,
          borderRadius: 14,
          padding: '22px 40px',
          background: color.ink1000,
          opacity: anim(frame, [stagger(2, 10, appearFrame), stagger(2, 10, appearFrame) + 16], [0, 1], ease.softOut),
          scale: anim(frame, [stagger(2, 10, appearFrame), stagger(2, 10, appearFrame) + 26], [0.9, 1], ease.backOut),
        }}
      >
        <span style={{ fontFamily: font.code, fontSize: 36, color: color.ochre400 }}>$</span>
        <span style={{ fontFamily: font.code, fontSize: 36, color: color.bone100 }}>
          {INSTALL_COMMAND}
        </span>
      </div>

      {showGithub ? (
        <span
          style={{
            fontFamily: font.code,
            fontSize: 26,
            color: color.bone500,
            opacity: anim(frame, [stagger(3, 10, appearFrame), stagger(3, 10, appearFrame) + 16], [0, 1], ease.softOut),
          }}
        >
          {GITHUB_URL.replace('https://', '')}
        </span>
      ) : null}
    </div>
  );
};
