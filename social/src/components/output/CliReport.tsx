import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, stagger } from '../../motion';

type Tone = 'primary' | 'body' | 'muted' | 'pass' | 'warn' | 'fail' | 'ochre';

const TONE: Record<Tone, string> = {
  primary: color.bone100,
  body: color.bone200,
  muted: color.bone500,
  pass: color.pass,
  warn: color.warn,
  fail: color.fail,
  ochre: color.ochre400,
};

export type CliLine = { text: string; tone?: Tone; indent?: number };

/**
 * `aviary -u <url>` stdout, printed line by line.
 *
 * Lines don't fade in — a terminal doesn't fade, it prints. Each line snaps to
 * full opacity and the block scrolls up under a fixed viewport height, which
 * reads as a shell filling rather than a list animating.
 */
export const CliReport: React.FC<{
  lines: CliLine[];
  startFrame?: number;
  framesPerLine?: number;
  fontSize?: number;
  /** Fixed height so earlier lines scroll out of view instead of resizing the box. */
  maxLines?: number;
}> = ({ lines, startFrame = 0, framesPerLine = 7, fontSize = 26, maxLines }) => {
  const frame = useCurrentFrame();
  const lineHeight = Math.round(fontSize * 1.5);

  const printed = lines.filter((_, i) => frame >= stagger(i, framesPerLine, startFrame)).length;
  const overflow = maxLines ? Math.max(0, printed - maxLines) : 0;

  // Scroll is eased so the shell glides rather than jumping a full line.
  const scroll = anim(
    frame,
    [
      stagger(overflow + (maxLines ?? 0) - 1, framesPerLine, startFrame),
      stagger(overflow + (maxLines ?? 0), framesPerLine, startFrame),
    ],
    [Math.max(0, overflow - 1) * lineHeight, overflow * lineHeight],
    ease.standard,
  );

  return (
    <div
      style={{
        height: maxLines ? maxLines * lineHeight : undefined,
        overflow: 'hidden',
      }}
    >
      <div style={{ translate: `0 ${-scroll}px` }}>
        {lines.map((line, i) => {
          const at = stagger(i, framesPerLine, startFrame);
          if (frame < at) return null;
          return (
            <div
              key={`${line.text}-${i}`}
              style={{
                height: lineHeight,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: (line.indent ?? 0) * fontSize,
                fontFamily: font.code,
                fontSize,
                lineHeight: 1,
                color: TONE[line.tone ?? 'body'],
                whiteSpace: 'pre',
                // A one-frame highlight as each line lands, like a cursor pass.
                opacity: anim(frame, [at, at + 2], [0.35, 1], ease.snap),
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** The stdout block the site shows for a default run. */
export const AUDIT_STDOUT: CliLine[] = [
  { text: 'Launching chromium 1920×1080 · preset advanced', tone: 'muted' },
  { text: 'Navigated to https://example.com', tone: 'muted' },
  { text: '', tone: 'muted' },
  { text: 'Score: 91/100', tone: 'pass' },
  { text: 'Total checks: 235', tone: 'muted' },
  { text: '  Passed: 214', tone: 'pass' },
  { text: '  Failed: 21', tone: 'fail' },
  { text: '', tone: 'muted' },
  { text: 'Meta Tags:', tone: 'body' },
  { text: '  pass  Title is optimal (54 characters)', tone: 'muted' },
  { text: '  fail  Canonical URL is missing', tone: 'fail' },
  { text: 'Accessibility:', tone: 'body' },
  { text: '  fail  7 form inputs missing labels', tone: 'fail' },
  { text: '  warn  No skip navigation link found', tone: 'warn' },
];
