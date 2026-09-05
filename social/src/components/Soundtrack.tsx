import React from 'react';
import { Audio } from '@remotion/media';
import { getStaticFiles, interpolate, useVideoConfig } from 'remotion';
import { TRACKS, type TrackId } from '../audio';

/**
 * Mounts a track from `public/audio/` — but only if the file is actually there.
 *
 * The audio files are deliberately not committed (licensed catalogue tracks for
 * the Gen-Z cuts, and a "pick one you have a licence for" placeholder for the
 * brand reels), so every composition has to render fine without them. Rendering
 * `<Audio>` against a missing file would fail the whole render, hence the
 * `getStaticFiles()` guard.
 */
export const Soundtrack: React.FC<{
  track: TrackId;
  /** Frames of fade-out at the end of the composition. */
  fadeOutFrames?: number;
  fadeInFrames?: number;
}> = ({ track, fadeOutFrames = 36, fadeInFrames = 8 }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const meta = TRACKS[track];

  const file = getStaticFiles().find((f) => f.name === `audio/${meta.file}`);
  if (!file) {
    return null;
  }

  return (
    <Audio
      src={file.src}
      trimBefore={Math.round(meta.startSeconds * fps)}
      volume={(f) =>
        meta.volume *
        interpolate(f, [0, fadeInFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }) *
        interpolate(f, [durationInFrames - fadeOutFrames, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />
  );
};
