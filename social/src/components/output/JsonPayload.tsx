import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease, stagger } from '../../motion';

/**
 * Syntax-coloured JSON, the way `--output report.json` writes it.
 *
 * Tokenising per line keeps this readable at reel size: keys in bone, string
 * values in ochre, numbers in green, `false` in red so a failing check is
 * visible without reading the message.
 */
const token = (raw: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      parts.push(
        <span key={key++} style={{ color: color.bone500 }}>
          {raw.slice(last, m.index)}
        </span>,
      );
    }
    const [text, isKey, isString, isNumber, isLiteral] = m;
    const c = isKey
      ? color.bone300
      : isString
        ? color.ochre400
        : isNumber
          ? color.lichen400
          : isLiteral === 'false'
            ? color.fail
            : color.slateBlue400;
    parts.push(
      <span key={key++} style={{ color: c }}>
        {text}
      </span>,
    );
    last = m.index + text.length;
  }
  if (last < raw.length) {
    parts.push(
      <span key={key++} style={{ color: color.bone500 }}>
        {raw.slice(last)}
      </span>,
    );
  }
  return parts;
};

export const JsonPayload: React.FC<{
  lines: string[];
  startFrame?: number;
  framesPerLine?: number;
  fontSize?: number;
}> = ({ lines, startFrame = 0, framesPerLine = 5, fontSize = 24 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ fontFamily: font.code, fontSize, lineHeight: 1.55 }}>
      {lines.map((line, i) => {
        const at = stagger(i, framesPerLine, startFrame);
        return (
          <div
            key={`${line}-${i}`}
            style={{
              whiteSpace: 'pre',
              minHeight: fontSize * 1.55,
              opacity: anim(frame, [at, at + 8], [0, 1], ease.softOut),
              translate: `${anim(frame, [at, at + 12], [-8, 0], ease.quintOut)}px 0`,
            }}
          >
            {token(line)}
          </div>
        );
      })}
    </div>
  );
};
