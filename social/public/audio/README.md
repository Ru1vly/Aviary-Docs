# Soundtrack

Audio files are **not committed**. Each reel renders silently without them and
still cuts on the right beats — the beat grid lives in `src/audio.ts`, not in
the file.

Drop a file here with the exact name below and it is picked up automatically on
the next render (`src/components/Soundtrack.tsx` checks `getStaticFiles()` and
mounts the track only if it exists).

| File | Composition | BPM | What to use |
|---|---|---|---|
| `hero.mp3` | `Reel1Hero` | 100 | Minimal tech / ambient pulse, no vocal |
| `surfaces.mp3` | `Reel2Surfaces` | 120 | Driving minimal electronic, clear 4-bar loop |
| `hook.mp3` | `Reel3Hook` | 90 | Dark cinematic build |
| `revenge.mp3` | `Reel4Cooked` | 122 | REVENGE (Super Slowed) — 1HXSX, wnorg17 |
| `acido.mp3` | `Reel5Aura` | 99 | ACIDO III (Super Slowed) — UdieNnx |

## Licensing

**The three brand reels** need a track you hold a licence for. Good sources:

- [Uppbeat](https://uppbeat.io) — free tier with attribution, paid tier without
- [Pixabay Music](https://pixabay.com/music/) — no attribution required
- [Free Music Archive](https://freemusicarchive.org) — check the per-track licence

Search terms that match each reel's tempo and mood are in the `note` field of
`TRACKS` in `src/audio.ts`.

**The two Gen-Z cuts** are scored to specific commercial catalogue tracks:

- [REVENGE (Super Slowed) — 1HXSX, wnorg17](https://music.youtube.com/watch?v=mbSp4gsKaU0)
- [ACIDO III (Super Slowed) — UdieNnx](https://music.youtube.com/watch?v=qGlwgPb8E7I)

These are **not** downloaded or bundled here, and you should not rip them from
YouTube to ship a rendered MP4. The normal route for this kind of edit is to
upload the silent render and add the track from TikTok's or Instagram's own
licensed audio library in-app — both catalogues carry these — which is also what
gets you the "original audio" discovery boost.

If you want to hear the sync locally while editing, use your own copy of the
file for a preview render and keep it out of anything you publish.

## Changing the tempo

If you swap a track for one at a different tempo, update the `bpm` in
`src/audio.ts` and every cut, flash and hit re-derives from the new grid — no
frame numbers to chase.

Use `startSeconds` to skip an intro so bar 1 of the reel lands on the drop.
