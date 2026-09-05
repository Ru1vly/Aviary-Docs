import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, wobble } from '../../motion';

const CAT_COLOR = {
  seo: color.ochre400,
  accessibility: color.slateBlue400,
  performance: color.vermilion400,
  ux: color.plum400,
  security: color.lichen400,
} as const;

type Cat = keyof typeof CAT_COLOR;

const bar = (w: string, h: number, bg: string, mt = 0): React.CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 999,
  background: bg,
  marginTop: mt,
});

/**
 * An issue marker pinned to the element that caused it.
 *
 * `revealAt` is an absolute frame rather than a percentage of the page, because
 * the pin is positioned by its parent section — the scan line's arrival time is
 * computed once by the viewport and handed down.
 */
const Pin: React.FC<{
  label: string;
  cat: Cat;
  revealAt: number;
  seed?: number;
  style?: React.CSSProperties;
}> = ({ label, cat, revealAt, seed = 0, style }) => {
  const frame = useCurrentFrame();
  const p = anim(frame, [revealAt, revealAt + 14], [0, 1], ease.backOut);
  if (p <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: p,
        scale: p,
        transformOrigin: 'left center',
        ...style,
      }}
    >
      <span
        style={{
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: CAT_COLOR[cat],
          // A slow halo pulse keeps a held frame from going completely static.
          boxShadow: `0 0 0 ${5 + wobble(frame, 34, 2.5, seed)}px ${CAT_COLOR[cat]}2E`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: font.code,
          fontSize: 21,
          color: CAT_COLOR[cat],
          background: color.ink1000,
          border: `1px solid ${CAT_COLOR[cat]}55`,
          borderRadius: 6,
          padding: '4px 11px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
};

/**
 * A wireframe of the page Aviary is looking at, with the issues it found pinned
 * to the elements that caused them.
 *
 * This is the "real browser" claim made visible. The page body is a flex column
 * so it fills whatever height it's given, and each pin sits inside the section
 * it describes — so the annotations stay attached to their elements at any size.
 * A scan line sweeps top to bottom, and a pin only appears once the sweep has
 * passed it.
 */
export const RenderedViewport: React.FC<{
  width?: number;
  height?: number;
  scanFrame?: number;
  scanDuration?: number;
  showPins?: boolean;
}> = ({ width = 984, height = 900, scanFrame = 0, scanDuration = 80, showPins = true }) => {
  const frame = useCurrentFrame();
  const scanY = anim(frame, [scanFrame, scanFrame + scanDuration], [0, 100], ease.smoothInOut);
  const scanning = frame >= scanFrame && frame <= scanFrame + scanDuration + 6;

  /** Frame at which the scan line reaches `fraction` down the page. */
  const reaches = (fraction: number): number => scanFrame + fraction * scanDuration;

  return (
    <div
      style={{
        width,
        borderRadius: 18,
        border: `1px solid ${color.hairline}`,
        background: color.ink900,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${color.hairline}`,
          fontFamily: font.ui,
          fontSize: 19,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          color: color.bone500,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Rendered viewport</span>
        <span style={{ color: color.lichen400 }}>chromium 1920×1080</span>
      </div>

      <div
        style={{
          position: 'relative',
          height,
          padding: 28,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Site nav */}
        <div
          style={{
            height: 68,
            flexShrink: 0,
            border: `1px solid ${color.hairline}`,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '0 20px',
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: color.lineStrong }} />
          <div style={{ flex: 1 }} />
          {[58, 58, 58].map((w, i) => (
            <div key={i} style={bar(`${w}px`, 10, color.lineDefault)} />
          ))}
        </div>

        {/* Hero */}
        <div
          style={{
            position: 'relative',
            flex: 1.7,
            border: `1px solid ${color.hairline}`,
            borderRadius: 10,
            padding: 30,
          }}
        >
          <div style={bar('66%', 20, color.lineStrong)} />
          <div style={bar('46%', 20, color.lineStrong, 16)} />
          <div style={bar('32%', 12, color.lineDefault, 20)} />
          <div
            style={{
              width: 126,
              height: 34,
              borderRadius: 8,
              border: `1px solid ${color.lineStrong}`,
              marginTop: 20,
            }}
          />
          {showPins ? (
            <>
              <Pin
                label="h1 too long"
                cat="seo"
                revealAt={reaches(0.2)}
                seed={0}
                style={{ left: '38%', top: 18 }}
              />
              <Pin
                label="tap target < 44px"
                cat="ux"
                revealAt={reaches(0.3)}
                seed={1}
                style={{ left: 160, bottom: 24 }}
              />
            </>
          ) : null}
        </div>

        {/* Card row */}
        <div
          style={{
            position: 'relative',
            flex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 22,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${color.hairline}`,
                borderRadius: 10,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  flex: 1.4,
                  background: `repeating-linear-gradient(45deg, ${color.ink800} 0 7px, ${color.ink700} 7px 14px)`,
                }}
              />
              <div style={{ flex: 1, padding: '14px 16px', display: 'grid', gap: 9, alignContent: 'center' }}>
                <div style={bar('82%', 9, color.lineDefault)} />
                <div style={bar('56%', 9, color.hairline)} />
              </div>
            </div>
          ))}
          {showPins ? (
            <Pin
              label="missing alt text"
              cat="accessibility"
              revealAt={reaches(0.55)}
              seed={2}
              style={{ left: '10%', top: '22%' }}
            />
          ) : null}
        </div>

        {/* Form row — what the accessibility failures are actually about */}
        <div style={{ position: 'relative', flexShrink: 0, display: 'flex', gap: 18, alignItems: 'center' }}>
          <div style={{ flex: 1, height: 54, border: `1px solid ${color.hairline}`, borderRadius: 8 }} />
          <div style={{ width: 136, height: 54, borderRadius: 8, background: color.lineDefault }} />
          {showPins ? (
            <Pin
              label="input has no label"
              cat="accessibility"
              revealAt={reaches(0.82)}
              seed={3}
              style={{ left: 40, top: -14 }}
            />
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            flex: 0.8,
            flexShrink: 0,
            borderTop: `1px solid ${color.hairline}`,
            paddingTop: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            alignContent: 'start',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <div style={bar('60%', 9, color.lineDefault)} />
              <div style={bar('80%', 7, color.hairline)} />
              <div style={bar('70%', 7, color.hairline)} />
            </div>
          ))}
        </div>

        {/* Scan line */}
        {scanning ? (
          <>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${scanY}%`,
                height: 2,
                background: color.ochre400,
                boxShadow: `0 0 28px 5px ${color.ochre400}88`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: `${scanY}%`,
                background: 'linear-gradient(to bottom, transparent, rgba(224,177,90,0.08))',
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
