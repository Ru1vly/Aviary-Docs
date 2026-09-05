/**
 * Soundtrack registry.
 *
 * Audio files are NOT committed to this repo — see `public/audio/README.md`.
 * Every composition still lays its cuts on the beat grid described here, so a
 * reel is correctly synced the moment the matching file is dropped in
 * `public/audio/`, and renders silently (but correctly timed) when it isn't.
 */

export type Track = {
  /** File to place at `public/audio/<file>`. */
  file: string;
  title: string;
  artist: string;
  /** Tempo the composition's beat grid is built on. */
  bpm: number;
  /** Seconds to trim off the top so the reel starts on a downbeat / the drop. */
  startSeconds: number;
  volume: number;
  /** Where to get it, and under what terms. */
  source: string;
  note: string;
};

export const TRACKS = {
  /** Reel 1 — product walkthrough. Wants restraint, not energy. */
  hero: {
    file: 'hero.mp3',
    title: 'Minimal tech / ambient pulse',
    artist: 'royalty-free — see note',
    bpm: 100,
    startSeconds: 0,
    volume: 0.55,
    source: 'https://uppbeat.io/browse/genre/ambient (or pixabay.com/music)',
    note: 'Search "minimal tech ambient 100bpm". Pick something with a steady pulse and no vocal — the reel is dense with text.',
  },
  /** Reel 2 — five surfaces, one per bar. Needs forward motion. */
  surfaces: {
    file: 'surfaces.mp3',
    title: 'Driving minimal electronic',
    artist: 'royalty-free — see note',
    bpm: 120,
    startSeconds: 0,
    volume: 0.55,
    source: 'https://uppbeat.io/browse/genre/electronic (or pixabay.com/music)',
    note: 'Search "minimal techno 120bpm no vocals". Each surface card lands on a bar, so a track with a clear 4-bar loop reads best.',
  },
  /** Reel 3 — the differentiation hook. Tense, cinematic, slow. */
  hook: {
    file: 'hook.mp3',
    title: 'Tense cinematic build',
    artist: 'royalty-free — see note',
    bpm: 90,
    startSeconds: 0,
    volume: 0.6,
    source: 'https://uppbeat.io/browse/genre/cinematic (or freemusicarchive.org)',
    note: 'Search "dark cinematic build 90bpm". The reel builds to a single reveal, so a track that swells works better than a loop.',
  },
  /** Reel 4 — Gen-Z cut. Aggressive slowed phonk. */
  revenge: {
    file: 'revenge.mp3',
    title: 'REVENGE (Super Slowed)',
    artist: '1HXSX, wnorg17',
    bpm: 122,
    startSeconds: 0,
    volume: 0.85,
    source: 'https://music.youtube.com/watch?v=mbSp4gsKaU0',
    note: 'Licensed catalogue track — add it in-app on TikTok/Reels, or drop your own copy here for a local preview render.',
  },
  /** Reel 5 — Gen-Z cut. Slower, moodier, more space between hits. */
  acido: {
    file: 'acido.mp3',
    title: 'ACIDO III (Super Slowed)',
    artist: 'UdieNnx',
    bpm: 99,
    startSeconds: 0,
    volume: 0.85,
    source: 'https://music.youtube.com/watch?v=qGlwgPb8E7I',
    note: 'Licensed catalogue track — add it in-app on TikTok/Reels, or drop your own copy here for a local preview render.',
  },
} as const satisfies Record<string, Track>;

export type TrackId = keyof typeof TRACKS;

/** Frames per beat at a given tempo. Fractional — round only at the last step. */
export const framesPerBeat = (bpm: number, fps: number): number => (60 / bpm) * fps;

/** Frames per bar (4/4). */
export const framesPerBar = (bpm: number, fps: number): number => framesPerBeat(bpm, fps) * 4;

/**
 * Build a beat grid for a track. `beat(n)` / `bar(n)` return frame numbers to
 * place cuts and hits on, which is what makes an edit feel scored rather than
 * merely soundtracked.
 */
export const grid = (bpm: number, fps: number) => {
  const perBeat = framesPerBeat(bpm, fps);
  return {
    bpm,
    perBeat,
    perBar: perBeat * 4,
    /** Frame of the n-th beat (0-indexed). */
    beat: (n: number): number => Math.round(n * perBeat),
    /** Frame of the n-th bar (0-indexed). */
    bar: (n: number): number => Math.round(n * perBeat * 4),
    /** Duration in frames spanning `n` beats. */
    beats: (n: number): number => Math.round(n * perBeat),
    /** Duration in frames spanning `n` bars. */
    bars: (n: number): number => Math.round(n * perBeat * 4),
    /**
     * 1→0 decay pulse that fires on every beat. Multiply into a scale or a
     * glow to make an element breathe with the track.
     */
    pulse: (frame: number, decayBeats = 0.55): number => {
      const sinceBeat = (frame % perBeat) / perBeat;
      return Math.max(0, 1 - sinceBeat / decayBeats);
    },
  };
};

export type Grid = ReturnType<typeof grid>;
