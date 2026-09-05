import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';

import { Background } from '../components/Background';
import { TerminalWindow } from '../components/TerminalWindow';
import { Outro } from '../components/Outro';
import { Soundtrack } from '../components/Soundtrack';
import { Center, Eyebrow, ReelChrome } from '../components/SceneFrame';
import { CliReport, type CliLine } from '../components/output/CliReport';
import { CiCheckPanel } from '../components/output/CiCheckPanel';
import { HtmlReport } from '../components/output/HtmlReport';
import { McpExchange } from '../components/output/McpExchange';
import { TuiDashboard } from '../components/output/TuiDashboard';
import { color, font } from '../theme';
import { anim, ease } from '../motion';
import { grid } from '../audio';
import { useBrandFonts } from '../useBrandFonts';

const FPS = 30;
const G = grid(120, FPS); // 15 frames/beat, 60 frames/bar

const PER_SURFACE = G.bars(2); // 120 frames — one surface per two bars
const INTRO = G.bars(1);
const OUTRO = G.bars(2);
const TRANSITION = G.beats(0.5); // 8 frames

const CLI_LINES: CliLine[] = [
  { text: '$ aviary -u https://example.com', tone: 'primary' },
  { text: '', tone: 'muted' },
  { text: 'Score: 91/100', tone: 'pass' },
  { text: 'Total checks: 235', tone: 'muted' },
  { text: '  Passed: 214', tone: 'pass' },
  { text: '  Failed: 21', tone: 'fail' },
  { text: '', tone: 'muted' },
  { text: 'Meta Tags:', tone: 'body' },
  { text: '  fail  Canonical URL is missing', tone: 'fail' },
];

const TS_LINES: CliLine[] = [
  { text: "import { SEOChecker } from 'aviary';", tone: 'ochre' },
  { text: '', tone: 'muted' },
  { text: 'const checker = new SEOChecker({', tone: 'body' },
  { text: "  url: 'https://example.com',", tone: 'body' },
  { text: '  headless: true,', tone: 'body' },
  { text: '});', tone: 'body' },
  { text: '', tone: 'muted' },
  { text: 'const report = await checker.check();', tone: 'body' },
  { text: '', tone: 'muted' },
  { text: 'report.score;          // 91', tone: 'muted' },
  { text: 'report.summary.failed; // 21', tone: 'muted' },
];

/** Shared frame around each surface: index, name, one line of why, the output. */
const Surface: React.FC<{
  index: number;
  total: number;
  name: string;
  body: string;
  children: React.ReactNode;
}> = ({ index, total, name, body, children }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background glow="top" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: 984 }}>
          <Eyebrow appearFrame={0} size={26}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </Eyebrow>
          <span
            style={{
              fontFamily: font.ui,
              fontWeight: 700,
              fontSize: 84,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: color.bone100,
              textAlign: 'center',
              opacity: anim(frame, [2, 18], [0, 1], ease.softOut),
              // Each surface title lands with a small overshoot on the downbeat.
              scale: anim(frame, [2, 26], [0.9, 1], ease.backOut),
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: font.ui,
              fontSize: 33,
              color: color.bone400,
              textAlign: 'center',
              maxWidth: 900,
              lineHeight: 1.45,
              opacity: anim(frame, [10, 26], [0, 1], ease.softOut),
              translate: `0 ${anim(frame, [10, 32], [12, 0], ease.expoOut)}px`,
            }}
          >
            {body}
          </span>
          <div
            style={{
              marginTop: 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              opacity: anim(frame, [16, 30], [0, 1], ease.softOut),
              translate: `0 ${anim(frame, [16, 40], [26, 0], ease.expoOut)}px`,
            }}
          >
            {children}
          </div>
        </div>
      </Center>
    </AbsoluteFill>
  );
};

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background glow="center" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <span
            style={{
              fontFamily: font.display,
              fontSize: 118,
              lineHeight: 1.15,
              color: color.bone100,
              textAlign: 'center',
              maxWidth: 960,
              opacity: anim(frame, [2, 20], [0, 1], ease.softOut),
              scale: anim(frame, [2, 34], [0.92, 1], ease.expoOut),
            }}
          >
            One engine.
          </span>
          <span
            style={{
              fontFamily: font.ui,
              fontWeight: 700,
              fontSize: 78,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: color.ochre400,
              opacity: anim(frame, [18, 34], [0, 1], ease.softOut),
              translate: `0 ${anim(frame, [18, 44], [20, 0], ease.backOut)}px`,
            }}
          >
            Six ways in
          </span>
        </div>
      </Center>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => (
  <AbsoluteFill>
    <Background glow="center" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <Eyebrow appearFrame={0}>Same checker modules, every surface</Eyebrow>
        <Outro appearFrame={8} />
      </div>
    </Center>
  </AbsoluteFill>
);

const SURFACES: { name: string; body: string; render: () => React.ReactNode }[] = [
  {
    name: 'CLI',
    body: 'Run audits anywhere — locally, over SSH, inside a container.',
    render: () => (
      <TerminalWindow url="https://example.com" width={984}>
        <CliReport lines={CLI_LINES} startFrame={20} framesPerLine={7} fontSize={33} maxLines={9} />
      </TerminalWindow>
    ),
  },
  {
    name: 'TypeScript',
    body: 'The same engine as a library — read the typed report in your own tooling.',
    render: () => (
      <TerminalWindow url="audit.ts" width={984} chrome="editor">
        <CliReport lines={TS_LINES} startFrame={20} framesPerLine={6} fontSize={31} maxLines={11} />
      </TerminalWindow>
    ),
  },
  {
    name: 'Dashboard',
    body: 'A full-screen terminal UI — categories left, checks right, filters below.',
    render: () => <TuiDashboard width={984} height={560} startFrame={18} selectEvery={16} />,
  },
  {
    name: 'CI',
    body: 'Fail the build when quality regresses on a deploy preview.',
    render: () => <CiCheckPanel width={984} startFrame={18} />,
  },
  {
    name: 'HTML report',
    body: 'A self-contained page you can share — no service, no account.',
    render: () => <HtmlReport width={984} startFrame={18} />,
  },
  {
    name: 'MCP',
    body: 'Three tools over stdio, so an agent can audit a URL and read the result.',
    render: () => <McpExchange width={984} startFrame={18} />,
  },
];

export const Reel2Surfaces: React.FC = () => {
  useBrandFonts();

  return (
    <AbsoluteFill style={{ background: color.ink950 }}>
      <Soundtrack track="surfaces" />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO} name="Intro">
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        {SURFACES.flatMap((s, i) => [
          <TransitionSeries.Sequence key={s.name} durationInFrames={PER_SURFACE} name={s.name}>
            <Surface index={i} total={SURFACES.length} name={s.name} body={s.body}>
              {s.render()}
            </Surface>
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition
            key={`${s.name}-t`}
            timing={linearTiming({ durationInFrames: TRANSITION })}
            presentation={
              // Alternate the direction so five similar scenes don't feel like
              // one long slide in a single direction.
              i % 2 === 0
                ? slide({ direction: 'from-right' })
                : slide({ direction: 'from-left' })
            }
          />,
        ])}

        <TransitionSeries.Sequence durationInFrames={OUTRO} name="Outro">
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <ReelChrome caption="one engine · six surfaces" />
    </AbsoluteFill>
  );
};

export const REEL2_DURATION =
  INTRO + PER_SURFACE * SURFACES.length + OUTRO - TRANSITION * (SURFACES.length + 1);
