import React from 'react';
import { useCurrentFrame } from 'remotion';
import { color, font } from '../../theme';
import { anim, ease } from '../../motion';

/**
 * An agent calling the MCP server over stdio: tool call in, structured result
 * back.
 *
 * Shaped like a chat exchange rather than a config file, because the point of
 * the MCP surface is that something *else* drives the audit.
 */
export const McpExchange: React.FC<{
  width?: number;
  startFrame?: number;
}> = ({ width = 984, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  const callAt = startFrame + 6;
  const thinkAt = callAt + 20;
  const resultAt = thinkAt + 26;

  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* The three tools the server exposes */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          opacity: anim(frame, [startFrame, startFrame + 12], [0, 1], ease.softOut),
        }}
      >
        {['seo_audit', 'seo_score', 'seo_check_category'].map((tool, i) => (
          <span
            key={tool}
            style={{
              fontFamily: font.code,
              fontSize: 26,
              color: color.ochre400,
              border: `1px solid ${color.ochre400}44`,
              borderRadius: 999,
              padding: '9px 22px',
              translate: `0 ${anim(frame, [startFrame + i * 4, startFrame + i * 4 + 18], [14, 0], ease.expoOut)}px`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Tool call */}
      <div
        style={{
          border: `1px solid ${color.lineDefault}`,
          borderRadius: 14,
          background: color.ink900,
          padding: '26px 30px',
          opacity: anim(frame, [callAt, callAt + 12], [0, 1], ease.softOut),
          translate: `0 ${anim(frame, [callAt, callAt + 18], [16, 0], ease.expoOut)}px`,
        }}
      >
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 19,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: color.slateBlue400,
            marginBottom: 14,
          }}
        >
          Agent → tool call
        </div>
        <div style={{ fontFamily: font.code, fontSize: 30, color: color.bone200, whiteSpace: 'pre' }}>
          {`{ "name": "seo_audit",\n  "arguments": { "url": "https://example.com" } }`}
        </div>
      </div>

      {/* Working indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingLeft: 6,
          fontFamily: font.code,
          fontSize: 27,
          color: color.bone500,
          opacity:
            anim(frame, [thinkAt, thinkAt + 8], [0, 1], ease.softOut) *
            anim(frame, [resultAt - 8, resultAt], [1, 0], ease.softOut),
        }}
      >
        <span style={{ color: color.ochre400 }}>
          {['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'][frame % 10]}
        </span>
        browser launched · running 235 checks
      </div>

      {/* Result */}
      <div
        style={{
          border: `1px solid ${color.ochre400}44`,
          borderRadius: 14,
          background: color.ink900,
          padding: '26px 30px',
          opacity: anim(frame, [resultAt, resultAt + 12], [0, 1], ease.softOut),
          translate: `0 ${anim(frame, [resultAt, resultAt + 20], [16, 0], ease.expoOut)}px`,
        }}
      >
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 19,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: color.ochre400,
            marginBottom: 14,
          }}
        >
          Tool → result
        </div>
        <div style={{ fontFamily: font.code, fontSize: 30, color: color.bone200, whiteSpace: 'pre' }}>
          {`{ "score": 91, "grade": "A",\n  "passed": 214, "failed": 21, "total": 235 }`}
        </div>
      </div>
    </div>
  );
};
