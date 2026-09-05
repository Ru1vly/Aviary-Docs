import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font } from '../theme';

export const Typewriter: React.FC<{
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  fontSize?: number;
  cursor?: boolean;
}> = ({ text, startFrame = 0, charsPerSecond = 26, fontSize = 30, cursor = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.floor((elapsed / fps) * charsPerSecond);
  const shown = text.slice(0, Math.min(charCount, text.length));
  const finished = shown.length >= text.length;
  const blink = Math.floor(frame / 15) % 2 === 0;

  return (
    <span style={{ fontFamily: font.code, fontSize, color: color.bone100 }}>
      {shown}
      {cursor && (!finished || blink) && (
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.5,
            height: fontSize * 0.9,
            marginLeft: 2,
            background: color.ochre400,
            transform: 'translateY(2px)',
            opacity: finished ? (blink ? 1 : 0) : 1,
          }}
        />
      )}
    </span>
  );
};

export const typingDurationFrames = (
  text: string,
  fps: number,
  charsPerSecond = 26,
): number => Math.ceil((text.length / charsPerSecond) * fps);
