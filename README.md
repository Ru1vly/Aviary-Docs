<div align="center">

```
     ___     _____    _    ______   __
    / \ \   / /_ _|  / \  |  _ \ \ / /
   / _ \ \ / / | |  / _ \ | |_) \ V /
  / ___ \ V /  | | / ___ \|  _ < | |
 /_/   \_\_/  |___/_/   \_\_| \_\|_|
```

**Site & documentation for Aviary — automated, real-browser website auditing**

`SEO` · `PERFORMANCE` · `ACCESSIBILITY` · `SECURITY` · `UX`

<p align="center">
  <a href="https://www.npmjs.com/package/@ru1vly/aviary"><img src="https://img.shields.io/npm/v/@ru1vly/aviary.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://github.com/Ru1vly/Aviary-Docs/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/Ru1vly/Aviary-Docs/deploy.yml?branch=main&label=deploy%20%28pages%29&style=flat-square" alt="Deploy status" /></a>
  <a href="https://github.com/Ru1vly/Aviary/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/Ru1vly/Aviary/ci.yml?branch=main&label=engine%20ci&style=flat-square" alt="Engine CI status" /></a>
  <a href="https://github.com/Ru1vly/Aviary/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square" alt="License" /></a>
  <a href="https://ru1vly.github.io/Aviary-Docs/"><img src="https://img.shields.io/badge/docs-live-blue.svg?style=flat-square" alt="Documentation" /></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg?style=flat-square" alt="Node" /></a>
</p>

</div>

---

## Ecosystem & Repositories

| Component | Description | Links |
|---|---|---|
| **Documentation Portal** | Official marketing landing page and full documentation site | [Live Site](https://ru1vly.github.io/Aviary-Docs/) · [GitHub Repo](https://github.com/Ru1vly/Aviary-Docs) |
| **Aviary Core Engine** | TypeScript + Playwright browser audit engine, Rust TUI & static parser | [GitHub Repo](https://github.com/Ru1vly/Aviary) · [Issues](https://github.com/Ru1vly/Aviary/issues) |
| **npm Package** | CLI binary (`aviary`), MCP server (`aviary-mcp`), and Node.js SDK | [npm Package](https://www.npmjs.com/package/@ru1vly/aviary) (`@ru1vly/aviary`) |
| **Sponsorship** | Open-source infrastructure and test runner sustainability | [GitHub Sponsors](https://github.com/sponsors/Ru1vly) · [Buy Me a Coffee](https://buymeacoffee.com/ru1vly) |

---

## About Aviary

**See your site the way browsers do.**

Aviary is a Playwright-driven auditing engine that opens a page in a real Chromium browser and executes **235 checks across 28 categories** — SEO, performance, accessibility, security, and UX — evaluating what visitors and search crawlers actually experience rather than raw server HTML.

### Product Facts

- **235 checks**: Exhaustive validation across technical SEO, Core Web Vitals, metadata, accessibility, and security.
- **28 categories**: Structured evaluations from heading hierarchies to predictive attention maps.
- **1 real browser**: Powered by Playwright Chromium for genuine client-side hydration and layout rendering.
- **Zero footprint**: No account required. No external dashboard. Your audit data remains 100% on your machine.

### Core Check Pillars

1. **01 Find what is missing**: Metadata, headings, alt text, labels, schema.org markup, security headers, and more.
2. **02 Measure what is slow**: Real Core Web Vitals (LCP, CLS, FCP, TTFB), network resource weights, rendering bottlenecks, and mobile responsiveness.
3. **03 Fix what matters**: Scored reports rank every issue by severity and point directly to the DOM element causing it.

---

## Installing & Running Aviary

Aviary can be executed directly with `npx`, installed globally as a command-line tool, or imported as a TypeScript library.

### 1. Direct Execution (No Install Required)

Run an immediate audit against any URL from your shell:

```bash
npx @ru1vly/aviary -u https://example.com
```

### 2. Global CLI Installation

```bash
# Using npm
npm install -g @ru1vly/aviary

# Using pnpm
pnpm add -g @ru1vly/aviary
```

### 3. Project Dependency Installation

```bash
# Using npm
npm install @ru1vly/aviary

# Using pnpm
pnpm add @ru1vly/aviary
```

### 4. CLI Usage Examples

```bash
# Launch interactive full-screen Terminal UI (TUI) Dashboard
aviary

# Run standard CLI audit against a target URL
aviary -u https://example.com

# Save detailed JSON report to disk
aviary -u https://example.com --output report.json

# Generate a visual standalone HTML report
aviary -u https://example.com --html report.html

# Run checks with verbose failure details
aviary -u https://example.com --verbose

# Run audit simulating a mobile viewport
aviary -u https://example.com --viewport 375x667
```

### 5. Programmatic API

```typescript
import { SEOChecker } from '@ru1vly/aviary';

async function runAudit() {
  const checker = new SEOChecker({
    url: 'https://example.com',
    headless: true,
  });

  const report = await checker.check();
  console.log(`Overall SEO Score: ${report.score}/100`);
  console.log(`Passed: ${report.summary.passed}/${report.summary.total} checks`);
}

runAudit();
```

### 6. Model Context Protocol (MCP) Server

Aviary includes a built-in stdio MCP server (`aviary-mcp`) allowing AI coding agents (Claude Desktop, Cursor, Codex, Antigravity) to audit live sites.

```json
{
  "mcpServers": {
    "aviary": {
      "command": "npx",
      "args": ["-y", "@ru1vly/aviary", "aviary-mcp"]
    }
  }
}
```

---

## Contributing & Sustainability

Aviary is an independent, 100% open-source auditing suite. Maintaining 235 browser checks across evolving web standards takes continuous testing, server resources, and active community maintenance. 

We welcome contributions across three key pathways:

### 1. Code & Architecture — Contributing by Coding (`PRs Welcome`)
- **Finding & Fixing Bugs**: Resolving navigation race conditions during hydration, Playwright CDP browser context leaks, and parser edge cases (malformed JSON-LD, microdata nesting).
- **Writing New Browser Audit Checks**: Creating modular rules under the `CheckRule` interface with clean remediation advice and non-destructive DOM queries.
- **Improving TypeScript Definitions & Schemas**: Enhancing strict typing across schemas, JSDoc annotations, and public API interfaces (`AuditReport`, `CategoryScore`, `IssueItem`).
- **Pull Request Workflow**:
  1. Fork [Ru1vly/Aviary](https://github.com/Ru1vly/Aviary).
  2. Create a feature branch (`git checkout -b feat/new-check`).
  3. Validate code (`npm install`, `npm test`, `npm run lint`).
  4. Commit with conventional commit messages.
  5. Open a Pull Request against `main`.

### 2. Infrastructure & Testing — Contributing Financially (`Infrastructure`)
- **Where Funds Go**:
  - Continuous Integration runners executing automated browser checks across Linux, macOS, and Windows.
  - High-concurrency benchmark infrastructure for stress-testing parallel crawling.
  - Global edge hosting for documentation and reference guides.
  - Cross-browser test matrices across Chromium and WebKit release channels.
- **Sponsorship Channels**:
  - [GitHub Sponsors](https://github.com/sponsors/Ru1vly) (Recurring or one-time)
  - [Buy Me a Coffee](https://buymeacoffee.com/ru1vly) (Individual micro-donations)

### 3. Ecosystem & Outreach — Content & Outreach (`Community`)
- **Star the Repositories**: Star [Ru1vly/Aviary](https://github.com/Ru1vly/Aviary) and [Ru1vly/Aviary-Docs](https://github.com/Ru1vly/Aviary-Docs) on GitHub to increase open-source visibility.
- **Share Audit Scores**: Share your terminal or HTML audit results on social platforms (X/Twitter, LinkedIn).
- **Write Tutorials & Report Findings**: Author guides on automated SEO pipelines or submit edge-case URLs to our [issue tracker](https://github.com/Ru1vly/Aviary/issues).

> For detailed guidelines, check out the in-depth [Contributing Guide](content/contributing.md) or visit `/docs?doc=contributing`.

---

## About This Repository (Aviary-Docs)

This repository houses the marketing landing page and documentation portal for Aviary. It is a Next.js App Router static/dynamic application:

- `/`: Landing page — hero, product proof, check groups, installation section, support pathways, and CTA.
- `/docs`: Rendered documentation portal sourced directly from markdown files in `content/*.md`.

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Type-check | TypeScript, strict mode |
| Markdown | `marked`, custom renderer with GFM alerts, client-side table of contents |
| Typography | `@tailwindcss/typography` |
| Icons | `lucide-react` |
| Fonts | Lancelot (display), Geist Mono, Ubuntu Mono |

### Running the Docs Site Locally

**Prerequisites:** Node.js `>= 20`

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The site will be available at `http://localhost:3000`.

```bash
npm run build     # Compile static production export into ./out
npm run start     # Serve production build
npm run lint      # Run ESLint validation
npm run clean     # Clear .next build cache
```

### Project Layout

```
Aviary-Docs/
├── app/
│   ├── page.tsx               # Production landing page
│   ├── docs/page.tsx           # Docs shell — sidebar, TOC, markdown renderer
│   ├── layout.tsx              # Root HTML structure, fonts, metadata
│   ├── globals.css             # Unified CSS custom properties & design tokens
│   └── sitemap.ts              # Search engine XML sitemap
├── components/
│   ├── aviary/                 # UI components (Button, Wordmark, etc.)
│   ├── DocsClientWrapper.tsx   # Client-side scroll-spy & clipboard actions
│   └── DocsView.tsx            # Documentation layout & viewer
├── content/
│   ├── quickstart.md           # Getting started, CLI reference, MCP guide
│   ├── accuracy-limitations.md # Browser automation edge cases & heuristics caveats
│   ├── contributing.md         # In-depth contribution and sponsorship guide
│   ├── roadmap.md              # Architectural roadmap and production readiness
│   ├── privacy.md              # Privacy policy
│   ├── terms.md                # Terms of service
│   └── cookies.md              # Cookie policy
└── lib/
    └── markdown.ts             # Custom marked AST parser (GFM callouts, anchors)
```

### Editing Documentation

Documentation articles are plain Markdown files in `content/` registered in `app/docs/page.tsx`'s `DOCS_FILES` registry. To add or modify a page:

1. Add or edit a markdown file in `content/` (e.g. `content/my-guide.md`).
2. Register the entry in `DOCS_FILES` with an `id`, `title`, `description`, and `fileName`.
3. GitHub-flavored callouts (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) are supported automatically.

### Design Tokens

All visual properties — backgrounds, text hierarchies, status colors, border radii, and easing curves — are declared as CSS custom properties in `app/globals.css`.

---

## License

This project and the Aviary core engine are open-source software licensed under the [MIT License](https://github.com/Ru1vly/Aviary/blob/main/LICENSE).
