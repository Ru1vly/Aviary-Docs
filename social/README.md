# Aviary social assets

A standalone [Remotion](https://remotion.dev) project that renders Aviary's
social media reels and static posts. It shares no build with the Next.js site
next to it, but mirrors the same brand tokens (`src/theme.ts` ← `app/globals.css`)
and the same product facts (`src/data.ts` ← `app/page.tsx`), so the videos can't
drift from what the site claims.

```bash
npm install
npm run dev     # Remotion Studio
npm run lint    # eslint + tsc
```

## What's in here

### Reels — 1080×1920

| Composition | Length | Track | Style |
|---|---|---|---|
| `Reel1Hero` | 31.5s @ 30fps | 100 BPM | Full product walkthrough: command → browser scan → stdout → score → coverage → HTML report |
| `Reel2Surfaces` | 28.1s @ 30fps | 120 BPM | Six entry points, each with its real output |
| `Reel3Hook` | 23.3s @ 30fps | 90 BPM | The differentiator: raw source vs. rendered page |
| `Reel4Cooked` | 20.2s @ 60fps | 122 BPM | Gen-Z cut — "it was cooked" |
| `Reel5Aura` | 22.4s @ 60fps | 99 BPM | Gen-Z cut — "aura check" |

### Posts — 1080×1080

`Post1Stat`, `Post2Grid`, `Post3Install`, `Post4Surfaces`, `Post5Position`.

### Rendering

```bash
# One-off
npx remotion render Reel1Hero out/reel-1-hero.mp4
npx remotion still Post1Stat out/posts/Post1Stat.png

# Faster for several: bundle once, then render from the bundle
npx remotion bundle
npx remotion render build Reel4Cooked out/reel-4-cooked.mp4 --concurrency=4
npx remotion still build Reel1Hero /tmp/check.png --frame=430 --scale=0.4
```

Output goes to `out/` and is gitignored.

## How it's put together

### `src/motion.ts` — easing

A named curve library rather than ad-hoc bezier values, so motion is consistent
and each curve means something:

- `expoOut` / `quintOut` — content arriving. The default.
- `backOut` — overshoot-and-settle, for badges, counters, anything that "lands".
- `sharpIn` — accelerates away, for failures and score drops.
- `snap` — hard in and out, for beat-synced cuts.
- `smoothInOut` — camera pushes and the viewport scan line.
- `drift` — slow ambient motion (background parallax).

`anim(frame, [from, to], [a, b], curve)` wraps `interpolate` with clamped
extrapolation, which is what's wanted nearly everywhere.

### `src/audio.ts` — the beat grid

Every reel is built on a tempo. `grid(bpm, fps)` returns `beat(n)` / `bar(n)`
frame positions plus a `pulse()` decay for beat-reactive motion, and scene
lengths are expressed in bars — so cuts land on downbeats and changing a track's
BPM re-derives the whole edit instead of requiring frame numbers to be chased.

The audio files themselves are **not committed**; see
[`public/audio/README.md`](public/audio/README.md) for what to drop in and the
licensing situation. Reels render correctly (and silently) without them.

### `src/components/output/` — the product's actual output

The thing that makes these read as a product demo rather than a motion-graphics
exercise. Each component is a faithful mock of something Aviary really emits:

- `ScoreDial` — the 0–100 dial, arc and digits driven off one eased progress
- `CliReport` — `aviary -u <url>` stdout, printing line by line
- `RenderedViewport` — a wireframe of the page under test, with a scan line and
  issues pinned to the elements that caused them
- `CoverageGrid` — all 28 categories filling to their pass rates
- `HtmlReport` — the `--html` report page inside browser chrome
- `JsonPayload` — syntax-coloured `--output report.json`
- `CiCheckPanel` — a deploy-preview run where the tests pass and the audit fails
- `TuiDashboard` — the terminal dashboard, selection walking the category list
- `McpExchange` — an agent calling the MCP server and reading the result

### `src/components/genz/kit.tsx` — the Gen-Z cuts

`PunchText`, `Sticker`, `SlamNumber`, `FlashFrame`, `Shake` and
`GenzBackground`. These deliberately break the house style — no fades, no long
eases, everything lands hard on a beat and holds. The brand palette is kept; the
aggression is entirely in the timing.

Flash opacity is kept at or below ~0.3. Higher reads as a blown-out frame rather
than an impact, and stops being comfortable to watch.

## Caveats

**Lancelot (`--font-display`) mangles digits and some acronyms** at display size:
`100` can read as "roo", a lone capital `I` picks up a stray mark, and `HTML`
gets an odd ligature on the H. Set any number, bare acronym or short technical
label in `font.ui` (Geist Mono) or `font.code` (Ubuntu Mono) instead, and keep
Lancelot for natural-language words and the wordmark. The production site already
does this — see `components/aviary/ScoreDial.tsx`.

**Always eyeball a still before shipping a new headline.** Most of the layout
problems in these reels — text wrapping to an orphan word, panels leaving dead
space in a 9:16 frame — were only visible in a render, never in the source.

**CSS `background-image` is banned by the Remotion lint rule** (it can't tell
when the image has loaded, so it flickers). The film grain in `Background.tsx` is
an inline SVG pattern for this reason.
