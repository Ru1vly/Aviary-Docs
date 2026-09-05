import React from 'react';
import { color, font } from '../theme';

/**
 * The window every code/terminal frame sits in.
 *
 * `chrome` swaps the header between a browser URL bar and an editor filename
 * tab. It matters more than it looks: without it, a TypeScript snippet and a
 * shell session read as the same surface, which is the exact opposite of what
 * the "five ways in" reel is trying to say.
 */
export const TerminalWindow: React.FC<{
  url: string;
  children: React.ReactNode;
  width?: number;
  chrome?: 'browser' | 'editor';
}> = ({ url, children, width = 900, chrome = 'browser' }) => {
  return (
    <div
      style={{
        width,
        borderRadius: 20,
        border: `1px solid ${color.hairline}`,
        background: color.ink900,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 24px',
          borderBottom: `1px solid ${color.hairline}`,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={dot(color.vermilion400)} />
          <span style={dot(color.ochre400)} />
          <span style={dot(color.lichen400)} />
        </div>

        {chrome === 'browser' ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: color.ink1000,
              border: `1px solid ${color.lineDefault}`,
              borderRadius: 8,
              padding: '8px 16px',
              fontFamily: font.code,
              fontSize: 20,
              color: color.bone400,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: color.lichen400 }} />
            {url}
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                background: color.ink1000,
                borderTop: `2px solid ${color.ochre400}`,
                borderRight: `1px solid ${color.lineDefault}`,
                borderLeft: `1px solid ${color.lineDefault}`,
                borderRadius: '6px 6px 0 0',
                padding: '10px 20px',
                marginBottom: -18,
                fontFamily: font.code,
                fontSize: 20,
                color: color.bone200,
              }}
            >
              {url}
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: 28 }}>{children}</div>
    </div>
  );
};

const dot = (background: string): React.CSSProperties => ({
  width: 13,
  height: 13,
  borderRadius: '50%',
  background,
  display: 'inline-block',
});
