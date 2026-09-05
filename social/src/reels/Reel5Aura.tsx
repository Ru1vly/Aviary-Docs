import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';

import { Soundtrack } from '../components/Soundtrack';
import { TerminalWindow } from '../components/TerminalWindow';
import { Typewriter } from '../components/Typewriter';
import { RenderedViewport } from '../components/output/RenderedViewport';
import { CoverageGrid } from '../components/output/CoverageGrid';
import { ScoreDial } from '../components/output/ScoreDial';
import {
  FlashFrame,
  GenzBackground,
  GenzCenter,
  PunchText,
  Shake,
  Sticker,
} from '../components/genz/kit';
import { color, font, INSTALL_COMMAND } from '../theme';
import { anim, ease } from '../motion';
import { grid } from '../audio';
import { TOTAL_CATEGORIES, TOTAL_CHECKS } from '../data';
import { useBrandFonts } from '../useBrandFonts';

/**
 * Gen-Z cut #2 — "aura check".
 *
 * Scored to ACIDO III (Super Slowed) at 99 BPM. Slower than the REVENGE cut, so
 * this one leans on holds and a single continuous build (scan → grid → score)
 * rather than rapid-fire punch lines. Same 60fps for the same reason.
 */
const FPS = 60;
export const REEL5_FPS = FPS;
const G = grid(99, FPS); // ~36.4 frames/beat

const B = {
  hook: 0,
  command: 5,
  scan: 10,
  checks: 16,
  score: 21,
  verdict: 27,
  outro: 31,
  end: 37,
};

const at = (beat: number): number => G.beat(beat);
const span = (from: number, to: number): number => G.beat(to) - G.beat(from);

/* ------------------------------------------------------------------ scenes */

const SceneHook: React.FC = () => {
  const beat = G.perBeat;
  return (
    <GenzCenter gap={24}>
      <PunchText appearFrame={0} size={130} tone={color.ochre400} tilt={-2}>
        aura check
      </PunchText>
      <PunchText appearFrame={Math.round(beat * 1.4)} size={66} tone={color.bone300} weight={700}>
        your site. right now.
      </PunchText>
    </GenzCenter>
  );
};

const SceneCommand: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={32}>
      <div
        style={{
          opacity: anim(frame, [0, 3], [0, 1], ease.snap),
          scale: anim(frame, [0, Math.round(beat * 0.8)], [0.9, 1], ease.backOut),
        }}
      >
        <TerminalWindow url="yoursite.com" width={920}>
          <div style={{ minHeight: 52 }}>
            <span style={{ fontFamily: font.code, fontSize: 36, color: color.ochre400 }}>$ </span>
            <Typewriter
              text="aviary -u yoursite.com"
              startFrame={Math.round(beat * 0.5)}
              fontSize={36}
              charsPerSecond={22}
            />
          </div>
        </TerminalWindow>
      </div>
      <PunchText appearFrame={Math.round(beat * 2.6)} size={58} tone={color.bone400} weight={700}>
        no vibes. receipts.
      </PunchText>
    </GenzCenter>
  );
};

const SceneScan: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={28}>
      <PunchText appearFrame={0} size={60} tone={color.ochre400} weight={700}>
        it opens a real browser
      </PunchText>
      <div
        style={{
          opacity: anim(frame, [beat * 0.5, beat * 0.5 + 3], [0, 1], ease.snap),
          scale: anim(frame, [beat * 0.5, beat * 1.5], [0.93, 1], ease.expoOut),
        }}
      >
        <RenderedViewport
          width={920}
          height={760}
          scanFrame={Math.round(beat * 0.9)}
          scanDuration={Math.round(beat * 3.4)}
        />
      </div>
    </GenzCenter>
  );
};

const SceneChecks: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={26}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <PunchText appearFrame={0} size={120} tone={color.bone100}>
          {TOTAL_CHECKS}
        </PunchText>
        <PunchText appearFrame={Math.round(beat * 0.3)} size={54} tone={color.bone400} weight={700}>
          checks
        </PunchText>
      </div>
      <div
        style={{
          opacity: anim(frame, [beat * 0.8, beat * 0.8 + 3], [0, 1], ease.snap),
        }}
      >
        <CoverageGrid columns={4} startFrame={Math.round(beat * 0.9)} width={860} limit={16} />
      </div>
      <Sticker appearFrame={Math.round(beat * 3)} tone={color.ochre400} tilt={2} size={34}>
        {TOTAL_CATEGORIES} categories · every one scored
      </Sticker>
    </GenzCenter>
  );
};

const SceneScore: React.FC = () => {
  const beat = G.perBeat;
  return (
    <GenzCenter gap={34}>
      <PunchText appearFrame={0} size={52} tone={color.bone500} weight={700}>
        final aura:
      </PunchText>
      <ScoreDial
        score={91}
        size={520}
        thickness={18}
        appearFrame={Math.round(beat * 0.4)}
        durationFrames={Math.round(beat * 3.2)}
      />
    </GenzCenter>
  );
};

const SceneVerdict: React.FC = () => {
  const beat = G.perBeat;
  return (
    <GenzCenter gap={22}>
      <PunchText appearFrame={0} size={150} tone={color.ink1000} highlight={color.pass} tilt={-2}>
        91
      </PunchText>
      <PunchText appearFrame={Math.round(beat * 1.1)} size={74} tone={color.bone100}>
        that&apos;s not mid.
      </PunchText>
      <PunchText appearFrame={Math.round(beat * 2)} size={44} tone={color.bone500} weight={700}>
        and it told you the 21 that failed
      </PunchText>
    </GenzCenter>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={34}>
      <span
        style={{
          fontFamily: font.display,
          fontSize: 150,
          lineHeight: 1,
          color: color.bone100,
          opacity: anim(frame, [0, 3], [0, 1], ease.snap),
          scale: anim(frame, [0, Math.round(beat)], [0.72, 1], ease.backOut),
        }}
      >
        Aviary
      </span>
      <PunchText appearFrame={Math.round(beat * 0.9)} size={40} tone={color.ochre400} weight={700}>
        run the aura check on your own site
      </PunchText>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: `2px solid ${color.lineStrong}`,
          borderRadius: 14,
          padding: '20px 34px',
          background: color.ink1000,
          opacity: anim(frame, [beat * 1.8, beat * 1.8 + 3], [0, 1], ease.snap),
          scale: anim(frame, [beat * 1.8, beat * 2.8], [0.85, 1], ease.backOut),
        }}
      >
        <span style={{ fontFamily: font.code, fontSize: 36, color: color.ochre400 }}>$</span>
        <span style={{ fontFamily: font.code, fontSize: 36, color: color.bone100 }}>
          {INSTALL_COMMAND}
        </span>
      </div>
    </GenzCenter>
  );
};

/* -------------------------------------------------------------------- reel */

export const Reel5Aura: React.FC = () => {
  useBrandFonts();

  const scenes: [keyof typeof B, keyof typeof B, React.FC][] = [
    ['hook', 'command', SceneHook],
    ['command', 'scan', SceneCommand],
    ['scan', 'checks', SceneScan],
    ['checks', 'score', SceneChecks],
    ['score', 'verdict', SceneScore],
    ['verdict', 'outro', SceneVerdict],
    ['outro', 'end', SceneOutro],
  ];

  return (
    <AbsoluteFill style={{ background: color.ink1000 }}>
      <Soundtrack track="acido" fadeOutFrames={G.beats(2)} />

      {/* Gentler shake than the REVENGE cut — this track has more space in it. */}
      <Shake grid={G} amount={3.5} zoom={0.01}>
        <GenzBackground grid={G} />
        {scenes.map(([from, to, Scene]) => (
          <Sequence
            key={from}
            name={from}
            from={at(B[from])}
            durationInFrames={span(B[from], B[to])}
          >
            <Scene />
          </Sequence>
        ))}
      </Shake>

      {(Object.keys(B) as (keyof typeof B)[])
        .filter((k) => k !== 'hook' && k !== 'end')
        .map((k) => (
          <FlashFrame key={k} at={at(B[k])} frames={4} peak={0.16} />
        ))}
      {/* The score landing is the payoff — flash it green. */}
      <FlashFrame at={at(B.verdict)} frames={5} tone={color.pass} peak={0.26} />
    </AbsoluteFill>
  );
};

export const REEL5_DURATION = at(B.end);
