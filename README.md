<div align="center">

```
     ___     _____    _    ______   __
    / \ \   / /_ _|  / \  |  _ \ \ / /
   / _ \ \ / / | |  / _ \ | |_) \ V /
  / ___ \ V /  | | / ___ \|  _ < | |
 /_/   \_\_/  |___/_/   \_\_| \_\|_|
```

**site & documentation for Aviary — automated, real-browser website auditing**

`SEO` · `PERFORMANCE` · `ACCESSIBILITY` · `SECURITY` · `UX`

</div>

---

## About

This repository is the marketing site and documentation for **Aviary**, a
Playwright-driven auditing engine that opens a page in a real browser and
runs 235 checks across 28 categories — SEO, performance, accessibility,
security, and UX — against what visitors actually load, not raw server HTML.

The engine itself (CLI, TypeScript API, terminal dashboard, MCP server)
lives in a separate repository, published to npm as `aviary`:
https://github.com/Ru1vly/Aviary

This repo only builds the site that explains and documents it — a Next.js
App Router application with two routes:

```
/           landing page — hero, coverage grid, workflow, sample reports
/docs       rendered documentation, sourced from content/*.md
```

## Stack

| Layer      | Choice                                    |
|------------|--------------------------------------------|
| Framework  | Next.js 15 (App Router), React 19          |
| Styling    | Tailwind CSS v4, CSS custom properties      |
| Type-check | TypeScript, strict mode                     |
| Markdown   | `marked`, rendered server-side into `/docs` |
| Type       | `@tailwindcss/typography`                   |
| Icons      | `lucide-react`                              |
| Fonts      | Lancelot (display), Geist Mono, Ubuntu Mono |

## Running locally

**Prerequisites:** Node.js

```
npm install
npm run dev
```

The site is available at `http://localhost:3000`.

```
npm run build     production build
npm run start     serve the production build
npm run lint      eslint
npm run clean     remove the .next build cache
```

## Project layout

```
app/
  page.tsx              landing page
  docs/page.tsx          docs shell — sidebar, TOC, markdown renderer
  layout.tsx             fonts, root metadata
  globals.css            design tokens (colors, type, spacing, motion)
components/
  aviary/                 Button, Tag, Tabs, ScoreDial, IssueRow, Wordmark,
                          VerdictBadge, ParticleField
  DocsClientWrapper.tsx   client-side scroll-spy + copy-to-clipboard for docs
content/
  quickstart.md
  accuracy-limitations.md
  roadmap.md
lib/
  markdown.ts             marked renderer overrides (headings, code, tables,
                          GFM alert blocks)
```

## Editing the docs

Documentation pages are plain Markdown files in `content/`, registered in
`app/docs/page.tsx`'s `DOCS_PAGES` list. Add a new page by dropping a
`.md` file in `content/` and adding an entry with an `id`, `title`,
`description`, `fileName`, and sidebar icon.

GitHub-flavored alert blocks are supported:

```
> [!NOTE]
> Rendered as a styled callout, not a plain blockquote.
```

## Design tokens

Everything visual — surfaces, text, verdict colors, spacing, radii,
easing curves — is defined once as CSS custom properties in
`app/globals.css` and consumed by inline styles throughout. There is no
separate theme file to keep in sync.

