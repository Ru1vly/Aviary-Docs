import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { wipe } from '@remotion/transitions/wipe';

import { Background } from '../components/Background';
import { TerminalWindow } from '../components/TerminalWindow';
import { CheckRow } from '../components/CheckRow';
import { Outro } from '../components/Outro';
import { Soundtrack } from '../components/Soundtrack';
import { Center, Eyebrow, ReelChrome } from '../components/SceneFrame';
import { CliReport, type CliLine } from '../components/output/CliReport';
import { RenderedViewport } from '../components/output/RenderedViewport';
import { color, font } from '../theme';
import { anim, ease, stagger } from '../motion';
import { grid } from '../audio';
import { ISSUES } from '../data';
import { useBrandFonts } from '../useBrandFonts';

const FPS = 30;
const G = grid(90, FPS); // 20 frames/beat, 80 frames/bar

const SCENES = {
  claim: G.bars(1.5),
  source: G.bars(2),
  rendered: G.bars(2),
  found: G.bars(1.75),
  outro: G.bars(2),
};
const TRANSITION = G.beats(0.5); // 10 frames

/** What a source-only crawler actually receives from a JS-rendered app. */
const RAW_SOURCE: CliLine[] = [
  { text: '<!doctype html>', tone: 'muted' },
  { text: '<html lang="en">', tone: 'muted' },
  { text: '  <head>', tone: 'muted' },
  { text: '    <title>Loading…</title>', tone: 'warn' },
  { text: '    <script src="/app.js" defer></script>', tone: 'muted' },
  { text: '  </head>', tone: 'muted' },
  { text: '  <body>', tone: 'muted' },
  { text: '    <div id="root"></div>', tone: 'fail' },
  { text: '  </body>', tone: 'muted' },
  { text: '</html>', tone: 'muted' },
];

const BigLine: React.FC<{
  children: React.ReactNode;
  tone?: string;
  appearFrame?: number;
  size?: number;
}> = ({ children, tone = color.bone100, appearFrame = 0, size = 96 }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        fontFamily: font.display,
        fontSize: size,
        lineHeight: 1.2,
        color: tone,
        textAlign: 'center',
        maxWidth: 960,
        opacity: anim(frame, [appearFrame, appearFrame + 18], [0, 1], ease.softOut),
        translate: `0 ${anim(frame, [appearFrame, appearFrame + 30], [24, 0], ease.expoOut)}px`,
      }}
    >
      {children}
    </span>
  );
};

const SceneClaim: React.FC = () => (
  <AbsoluteFill>
    <Background glow="center" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <BigLine appearFrame={2}>Most SEO tools read your raw source code.</BigLine>
        <BigLine appearFrame={46} tone={color.vermilion400} size={86}>
          They never open a browser.
        </BigLine>
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneSource: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background glow="top" tint="217,105,76" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, width: 984 }}>
          <Eyebrow appearFrame={0} tone={color.vermilion400} size={32}>
            What a source-only crawler sees
          </Eyebrow>
          <TerminalWindow url="view-source:example.com" width={984} chrome="editor">
            <CliReport lines={RAW_SOURCE} startFrame={8} framesPerLine={5} fontSize={34} />
          </TerminalWindow>
          <span
            style={{
              fontFamily: font.code,
              fontSize: 38,
              color: color.vermilion400,
              textAlign: 'center',
              opacity: anim(frame, [76, 92], [0, 1], ease.softOut),
              scale: anim(frame, [76, 100], [0.92, 1], ease.backOut),
            }}
          >
            An empty div. Nothing to audit.
          </span>
        </div>
      </Center>
    </AbsoluteFill>
  );
};

const SceneRendered: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background glow="top" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
          <span
            style={{
              fontFamily: font.display,
              fontSize: 104,
              color: color.ochre400,
              opacity: anim(frame, [0, 16], [0, 1], ease.softOut),
              scale: anim(frame, [0, 28], [0.86, 1], ease.backOut),
            }}
          >
            Aviary does.
          </span>
          <RenderedViewport width={984} height={860} scanFrame={22} scanDuration={86} />
        </div>
      </Center>
    </AbsoluteFill>
  );
};

const SceneFound: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44, width: 984 }}>
        <Eyebrow appearFrame={0} tone={color.ochre400} size={32}>
          Only visible after JavaScript runs
        </Eyebrow>
        <div style={{ width: '100%' }}>
          {ISSUES.slice(0, 4).map((issue, i) => (
            <CheckRow
              key={issue.message}
              verdict={issue.verdict}
              label={issue.message}
              selector={issue.selector}
              appearFrame={stagger(i, 16, 10)}
              fontSize={38}
            />
          ))}
        </div>
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill>
    <Background glow="center" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <Eyebrow appearFrame={0} size={30}>Check the page your users are loading</Eyebrow>
        <Outro appearFrame={8} />
      </div>
    </Center>
  </AbsoluteFill>
);

export const Reel3Hook: React.FC = () => {
  useBrandFonts();

  return (
    <AbsoluteFill style={{ background: color.ink950 }}>
      <Soundtrack track="hook" />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.claim} name="Claim">
          <SceneClaim />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.source} name="Raw source">
          <SceneSource />
        </TransitionSeries.Sequence>
        {/* A hard wipe here, not a fade — this is the pivot the whole reel turns on. */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={wipe({ direction: 'from-left' })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.rendered} name="Rendered">
          <SceneRendered />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.found} name="Found">
          <SceneFound />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.outro} name="Outro">
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <ReelChrome caption="audits the page after it renders" />
    </AbsoluteFill>
  );
};

export const REEL3_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * 4;
