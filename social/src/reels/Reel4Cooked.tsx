import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';

import { Soundtrack } from '../components/Soundtrack';
import { TerminalWindow } from '../components/TerminalWindow';
import { CliReport, type CliLine } from '../components/output/CliReport';
import { RenderedViewport } from '../components/output/RenderedViewport';
import {
  FlashFrame,
  GenzBackground,
  GenzCenter,
  PunchText,
  Shake,
  SlamNumber,
  Sticker,
} from '../components/genz/kit';
import { color, font, INSTALL_COMMAND } from '../theme';
import { anim, ease } from '../motion';
import { grid } from '../audio';
import { useBrandFonts } from '../useBrandFonts';

/**
 * Gen-Z cut #1 — "cooked".
 *
 * Scored to REVENGE (Super Slowed) at 122 BPM, rendered at 60fps because the
 * whole edit is fast scale changes and shake, which read as judder at 30.
 * Every cut sits on a beat: see `B` below for the beat map.
 */
const FPS = 60;
export const REEL4_FPS = FPS;
const G = grid(122, FPS); // ~29.5 frames/beat

/** Beat index each scene starts on. Change these, not raw frame numbers. */
const B = {
  pov: 0,
  browser: 6,
  source: 10,
  aviary: 15,
  crash: 20,
  issues: 25,
  verdict: 31,
  outro: 35,
  end: 41,
};

const at = (beat: number): number => G.beat(beat);
const span = (from: number, to: number): number => G.beat(to) - G.beat(from);

const RAW_SOURCE: CliLine[] = [
  { text: '<head>', tone: 'muted' },
  { text: '  <title>Loading…</title>', tone: 'warn' },
  { text: '</head>', tone: 'muted' },
  { text: '<body>', tone: 'muted' },
  { text: '  <div id="root"></div>', tone: 'fail' },
  { text: '</body>', tone: 'muted' },
];

const ISSUES = [
  { label: 'canonical', value: 'gone' },
  { label: '7 inputs', value: 'no label' },
  { label: 'og:image', value: 'never loaded' },
];

/* ------------------------------------------------------------------ scenes */

const ScenePov: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={26}>
      <PunchText appearFrame={0} size={62} tone={color.bone500} weight={700}>
        pov: your seo tool
      </PunchText>
      <PunchText appearFrame={Math.round(beat)} size={72} tone={color.bone100}>
        gave you a
      </PunchText>
      <div style={{ marginTop: 8 }}>
        <SlamNumber
          from={0}
          to={94}
          appearFrame={Math.round(beat * 2)}
          durationFrames={Math.round(beat * 0.9)}
          size={280}
          tone={color.pass}
          suffix="/100"
        />
      </div>
      <div
        style={{
          opacity: anim(frame, [beat * 3.6, beat * 3.6 + 3], [0, 1], ease.snap),
        }}
      >
        <Sticker appearFrame={Math.round(beat * 3.6)} tone={color.pass} tilt={-3} size={32}>
          looks fine to me
        </Sticker>
      </div>
    </GenzCenter>
  );
};

const SceneBrowser: React.FC = () => {
  const beat = G.perBeat;
  return (
    <GenzCenter gap={18}>
      <PunchText appearFrame={0} size={92}>
        it never
      </PunchText>
      <PunchText appearFrame={Math.round(beat * 0.75)} size={92}>
        opened a
      </PunchText>
      <PunchText
        appearFrame={Math.round(beat * 1.5)}
        size={104}
        tone={color.ink1000}
        highlight={color.vermilion400}
        tilt={-2}
      >
        browser
      </PunchText>
    </GenzCenter>
  );
};

const SceneSource: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={30}>
      <PunchText appearFrame={0} size={58} tone={color.bone400} weight={700}>
        it read this and dipped
      </PunchText>
      <div
        style={{
          opacity: anim(frame, [beat * 0.6, beat * 0.6 + 3], [0, 1], ease.snap),
          scale: anim(frame, [beat * 0.6, beat * 1.4], [0.9, 1], ease.backOut),
        }}
      >
        <TerminalWindow url="view-source" width={920} chrome="editor">
          <CliReport
            lines={RAW_SOURCE}
            startFrame={Math.round(beat * 0.8)}
            framesPerLine={7}
            fontSize={30}
          />
        </TerminalWindow>
      </div>
      <PunchText appearFrame={Math.round(beat * 3)} size={54} tone={color.vermilion400} weight={700}>
        that&apos;s the whole page.
      </PunchText>
    </GenzCenter>
  );
};

const SceneAviary: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={28}>
      <PunchText appearFrame={0} size={68} tone={color.ochre400}>
        aviary opens the page
      </PunchText>
      <div
        style={{
          opacity: anim(frame, [beat * 0.7, beat * 0.7 + 3], [0, 1], ease.snap),
          scale: anim(frame, [beat * 0.7, beat * 1.6], [0.92, 1], ease.backOut),
        }}
      >
        <RenderedViewport
          width={920}
          height={740}
          scanFrame={Math.round(beat)}
          scanDuration={Math.round(beat * 3)}
        />
      </div>
    </GenzCenter>
  );
};

const SceneCrash: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={20}>
      <PunchText appearFrame={0} size={54} tone={color.bone500} weight={700}>
        real score:
      </PunchText>
      <SlamNumber
        from={94}
        to={61}
        appearFrame={Math.round(beat * 0.5)}
        durationFrames={Math.round(beat * 2)}
        size={340}
        suffix="/100"
      />
      <div style={{ opacity: anim(frame, [beat * 3, beat * 3 + 3], [0, 1], ease.snap) }}>
        <Sticker appearFrame={Math.round(beat * 3)} tone={color.fail} tilt={2} size={34}>
          235 checks · 21 failed
        </Sticker>
      </div>
    </GenzCenter>
  );
};

const SceneIssues: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = G.perBeat;

  return (
    <GenzCenter gap={26}>
      <PunchText appearFrame={0} size={50} tone={color.bone500} weight={700}>
        the receipts:
      </PunchText>
      {ISSUES.map((issue, i) => {
        const a = Math.round(beat * (0.8 + i * 1.2));
        return (
          <div
            key={issue.label}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 22,
              opacity: anim(frame, [a, a + 2], [0, 1], ease.snap),
              // Alternating slide direction keeps three identical rows from
              // reading as a list animation.
              translate: `${anim(frame, [a, a + Math.round(beat * 0.5)], [i % 2 === 0 ? -60 : 60, 0], ease.backOut)}px 0`,
            }}
          >
            <span
              style={{
                fontFamily: font.code,
                fontWeight: 700,
                fontSize: 62,
                color: color.bone100,
              }}
            >
              {issue.label}
            </span>
            <span
              style={{
                fontFamily: font.ui,
                fontWeight: 900,
                fontSize: 62,
                color: color.fail,
              }}
            >
              {issue.value}
            </span>
          </div>
        );
      })}
    </GenzCenter>
  );
};

const SceneVerdict: React.FC = () => {
  const beat = G.perBeat;
  return (
    <GenzCenter gap={22}>
      <PunchText appearFrame={0} size={104} tone={color.ink1000} highlight={color.fail} tilt={-2}>
        it was cooked
      </PunchText>
      <PunchText appearFrame={Math.round(beat * 1.2)} size={66} tone={color.bone300} weight={700}>
        you just couldn&apos;t see it
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
          scale: anim(frame, [0, Math.round(beat)], [0.7, 1], ease.backOut),
        }}
      >
        Aviary
      </span>
      <PunchText appearFrame={Math.round(beat * 0.9)} size={38} tone={color.ochre400} weight={700}>
        it opens the browser. that&apos;s the point.
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

export const Reel4Cooked: React.FC = () => {
  useBrandFonts();

  const scenes: [keyof typeof B, keyof typeof B, React.FC][] = [
    ['pov', 'browser', ScenePov],
    ['browser', 'source', SceneBrowser],
    ['source', 'aviary', SceneSource],
    ['aviary', 'crash', SceneAviary],
    ['crash', 'issues', SceneCrash],
    ['issues', 'verdict', SceneIssues],
    ['verdict', 'outro', SceneVerdict],
    ['outro', 'end', SceneOutro],
  ];

  return (
    <AbsoluteFill style={{ background: color.ink1000 }}>
      <Soundtrack track="revenge" fadeOutFrames={G.beats(2)} />

      {/* The shake wraps everything below the flashes so the flash itself
          stays pinned to the frame edge rather than shaking with the content. */}
      <Shake grid={G} amount={5} zoom={0.014}>
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

      {/* A flash on every scene change, plus the two biggest hits. */}
      {(Object.keys(B) as (keyof typeof B)[])
        .filter((k) => k !== 'pov' && k !== 'end')
        .map((k) => (
          <FlashFrame key={k} at={at(B[k])} frames={3} peak={0.2} />
        ))}
      <FlashFrame at={at(B.crash) + G.beats(2.5)} frames={4} tone={color.fail} peak={0.3} />
      <FlashFrame at={at(B.verdict)} frames={4} tone={color.fail} peak={0.32} />
    </AbsoluteFill>
  );
};

export const REEL4_DURATION = at(B.end);
