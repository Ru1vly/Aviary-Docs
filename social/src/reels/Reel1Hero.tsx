import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

import { Background } from '../components/Background';
import { TerminalWindow } from '../components/TerminalWindow';
import { Typewriter } from '../components/Typewriter';
import { Outro } from '../components/Outro';
import { Soundtrack } from '../components/Soundtrack';
import { Center, Eyebrow, ReelChrome } from '../components/SceneFrame';
import { CliReport, AUDIT_STDOUT } from '../components/output/CliReport';
import { RenderedViewport } from '../components/output/RenderedViewport';
import { ScoreDial } from '../components/output/ScoreDial';
import { CoverageGrid } from '../components/output/CoverageGrid';
import { HtmlReport } from '../components/output/HtmlReport';
import { color, font } from '../theme';
import { anim, ease } from '../motion';
import { grid } from '../audio';
import { SAMPLE_FAILED, SAMPLE_PASSED, TOTAL_CATEGORIES, TOTAL_CHECKS } from '../data';
import { useBrandFonts } from '../useBrandFonts';

const FPS = 30;
const G = grid(100, FPS); // 18 frames/beat, 72 frames/bar

/** Scene lengths in bars, so every cut lands on a downbeat. */
const SCENES = {
  command: G.bars(1.5),
  scan: G.bars(2),
  stdout: G.bars(2),
  score: G.bars(1.5),
  coverage: G.bars(1.5),
  report: G.bars(2),
  headline: G.bars(1.5),
  outro: G.bars(2),
};

const TRANSITION = G.beats(0.5); // 9 frames — short enough to read as a cut

const SceneCommand: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 52 }}>
        <Eyebrow appearFrame={4} size={32}>
          One command
        </Eyebrow>
        <TerminalWindow url="https://example.com" width={984}>
          <div style={{ minHeight: 60 }}>
            <span style={{ fontFamily: font.code, fontSize: 42, color: color.ochre400 }}>$ </span>
            <Typewriter text="aviary -u https://example.com" startFrame={14} fontSize={42} />
          </div>
        </TerminalWindow>
        <Eyebrow appearFrame={54} size={28} tone={color.bone400}>
          {TOTAL_CHECKS} checks · {TOTAL_CATEGORIES} categories · one browser
        </Eyebrow>
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneScan: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
        <Eyebrow appearFrame={2} tone={color.ochre400} size={32}>
          A real browser opens the page
        </Eyebrow>
        <RenderedViewport width={984} height={900} scanFrame={12} scanDuration={80} />
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneStdout: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
        <Eyebrow appearFrame={2} size={32}>
          Human-readable, straight to stderr
        </Eyebrow>
        <TerminalWindow url="https://example.com" width={984}>
          <CliReport lines={AUDIT_STDOUT} startFrame={8} framesPerLine={8} fontSize={36} maxLines={13} />
        </TerminalWindow>
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneScore: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background glow="center" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56 }}>
          <ScoreDial score={91} size={580} thickness={18} appearFrame={6} durationFrames={54} label="Score" />
          <div
            style={{
              display: 'flex',
              gap: 16,
              opacity: anim(frame, [46, 62], [0, 1], ease.softOut),
              translate: `0 ${anim(frame, [46, 68], [16, 0], ease.expoOut)}px`,
            }}
          >
            {[
              { label: `${SAMPLE_PASSED} passed`, c: color.pass },
              { label: `${SAMPLE_FAILED} failed`, c: color.fail },
              { label: `${TOTAL_CHECKS} total`, c: color.bone400 },
            ].map((t) => (
              <span
                key={t.label}
                style={{
                  fontFamily: font.code,
                  fontSize: 34,
                  color: t.c,
                  border: `1px solid ${t.c}44`,
                  borderRadius: 999,
                  padding: '11px 26px',
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </Center>
    </AbsoluteFill>
  );
};

const SceneCoverage: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <Eyebrow appearFrame={2} size={32}>
          All {TOTAL_CATEGORIES} categories, scored
        </Eyebrow>
        <CoverageGrid columns={4} startFrame={8} width={984} />
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneReport: React.FC = () => (
  <AbsoluteFill>
    <Background glow="top" />
    <Center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
        <Eyebrow appearFrame={2} size={32}>
          <span style={{ fontFamily: font.code, textTransform: 'none', letterSpacing: 0 }}>
            aviary -u example.com --html report.html
          </span>
        </Eyebrow>
        <HtmlReport width={984} startFrame={6} />
      </div>
    </Center>
  </AbsoluteFill>
);

const SceneHeadline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background glow="center" />
      <Center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, maxWidth: 960 }}>
          <span
            style={{
              fontFamily: font.display,
              fontSize: 96,
              lineHeight: 1.18,
              color: color.bone100,
              textAlign: 'center',
              opacity: anim(frame, [2, 20], [0, 1], ease.softOut),
              translate: `0 ${anim(frame, [2, 30], [22, 0], ease.expoOut)}px`,
            }}
          >
            Checked after your JavaScript runs.
          </span>
          <span
            style={{
              fontFamily: font.display,
              fontSize: 96,
              lineHeight: 1.18,
              color: color.ochre400,
              textAlign: 'center',
              opacity: anim(frame, [24, 42], [0, 1], ease.softOut),
              // The second line overshoots slightly — it's the punchline.
              scale: anim(frame, [24, 50], [0.9, 1], ease.backOut),
            }}
          >
            Not before.
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
      <Outro appearFrame={4} />
    </Center>
  </AbsoluteFill>
);

export const Reel1Hero: React.FC = () => {
  useBrandFonts();

  return (
    <AbsoluteFill style={{ background: color.ink950 }}>
      <Soundtrack track="hero" />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.command} name="Command">
          <SceneCommand />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.scan} name="Browser scan">
          <SceneScan />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={slide({ direction: 'from-bottom' })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.stdout} name="CLI output">
          <SceneStdout />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.score} name="Score">
          <SceneScore />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={wipe({ direction: 'from-bottom' })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.coverage} name="Coverage">
          <SceneCoverage />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={slide({ direction: 'from-right' })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.report} name="HTML report">
          <SceneReport />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.headline} name="Headline">
          <SceneHeadline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: TRANSITION })}
          presentation={fade()}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.outro} name="Outro">
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <ReelChrome caption={`${TOTAL_CHECKS} checks · ${TOTAL_CATEGORIES} categories`} />
    </AbsoluteFill>
  );
};

export const REEL1_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * 7;
