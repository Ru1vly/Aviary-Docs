# Aviary

An end-to-end SEO testing toolkit for websites using browser automation. Built with TypeScript and Playwright for comprehensive SEO analysis.

> [!IMPORTANT]
> This toolkit performs static and dynamic audits on fully rendered web pages. Because it executes checks within a real browser instance, it accurately evaluates JavaScript-rendered metadata, dynamic layouts, and web performance metrics.

---

## Prerequisites

- **Node.js**: `>= 20.0.0` (required by modern runtime dependencies and the MCP server)
- **Browsers**: Chromium (automatically downloaded on first run if missing, with fallback to system Google Chrome)

---

## Features

The library executes 235 individual checks across 28 categories. Below is an overview of the core checker modules:

| Category | Description | Key Checks |
|---|---|---|
| Meta Tags | Validates standard page descriptors | Title presence/length, description presence/length, Open Graph tags configuration, canonical link validation |
| Headings | Audits heading structure and semantics | H1 presence and uniqueness, heading hierarchy levels, heading length optimization |
| Images | Evaluates image attributes and layouts | Alt text presence, source validity, count, dimension optimization |
| Performance | Measures basic site load times | Page load duration, DOM Content Loaded event timing, First Contentful Paint |
| Technical SEO | Verifies server configuration and response status | Response status codes, page sizes, compression headers, duplicate content detection |
| Heatmap & UX | Models visual hierarchy and attention zones | Predictive click maps, scroll depth levels, above-the-fold content scoring, CTA visibility |
| Accessibility | Inspects basic accessibility markers | ARIA landmarks, form input labeling, keyboard navigation order, skip links |
| Core Web Vitals | Real browser performance metrics via `web-vitals` | Real LCP, CLS, FCP, TTFB measurements, plus Total Blocking Time (TBT) lab proxy |
| URL Factors | Audits the page address format | URL length, character validity, directory depth, readability rules |
| Spam Detection | Guards against search engine red flags | Hidden text, excessive keyword repetitions, link densities, iframe abuses |

---

## Installation

Install the package into your project:

```bash
# Using npm
npm install @ru1vly/aviary

# Using pnpm
pnpm add @ru1vly/aviary
```

To install globally as a command-line tool:

```bash
npm install -g @ru1vly/aviary
# or with pnpm
pnpm add -g @ru1vly/aviary
```

Or run directly without installing:

```bash
npx @ru1vly/aviary -u https://example.com
```

---

## Quick start

Analyze any URL directly from your shell.

Running the command with no arguments launches the full-screen interactive Terminal User Interface (TUI) Dashboard:

```bash
# Launch interactive TUI Dashboard
aviary
```

To run checks directly in stdout mode (e.g. for scripts, CI pipelines, or AI agents), you must pass the target URL using the `-u` or `--url` flag:

```bash
# Run direct audit
aviary -u https://example.com

# Save detailed JSON report to a file
aviary -u https://example.com --output report.json

# Save a visual HTML report to a file
aviary -u https://example.com --html report.html

# Run checks with verbose outputs (lists failure details)
aviary -u https://example.com --verbose

# Run with a mobile viewport simulation
aviary -u https://example.com --viewport 375x667
```

### Programmatic API

Import the `SEOChecker` class to run checks programmatically within your Node.js application:

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

---

## Model Context Protocol (MCP) Server

Aviary includes a built-in Model Context Protocol (MCP) server that exposes real-browser SEO auditing tools directly to AI coding agents (Claude Desktop, Cursor, Windsurf, Antigravity, etc.).

The server communicates via standard I/O (`stdio`) and provides three registered tools:

| Tool | Parameters | Description |
|---|---|---|
| `seo_audit` | `url`, `preset?` (`basic`\|`advanced`\|`strict`), `categories?` | Full SEO audit returning structured results across all 28 categories. |
| `seo_score` | `url` | Quick audit returning overall score (0-100), letter grade (`A`-`F`), and pass/fail counts. |
| `seo_check_category` | `url`, `category` | Targeted audit executing checks for a single specified category. |

### Running the MCP Server

```bash
# Via binary entry point
aviary-mcp

# Or via npx
npx @ru1vly/aviary aviary-mcp
```

### Agent Configuration (`claude_desktop_config.json` / MCP Settings)

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

## Command line options

The command-line interface supports the following parameters:

| Option | Shortcut | Type | Description |
|---|---|---|---|
| `--url` | `-u` | string | Target website URL to analyze (required for CLI audit mode) |
| `--output` | `-o` | string | File path to write the JSON results payload |
| `--html` | | string | File path to write the visual HTML report page |
| `--json` | | boolean | Output raw JSON string directly to standard output |
| `--config` | `-c` | string | Path to a custom JSON or YAML configuration file |
| `--preset` | `-p` | string | Configuration preset name (`basic`, `advanced`, `strict`) |
| `--verbose` | `-v` | boolean | Output check details object for failed entries |
| `--headed` | | boolean | Run the browser simulator in headed mode (visible) |
| `--viewport` | | string | Set simulator window size (e.g. `1920x1080` or `375x667`) |
| `--init-config`| | boolean | Create a default configuration template file in the CWD |

---

## Environment variables (12-Factor config)

All CLI options can be configured via environment variables for 12-factor deployment and CI pipelines:

| Variable | Type / Values | Description |
|---|---|---|
| `AVIARY_URL` | string | Target URL (overridden by `-u` / `--url`) |
| `AVIARY_HEADLESS` | `"true"` \| `"false"` | Run browser headless (overridden by `--headed`) |
| `AVIARY_TIMEOUT` | number (ms) | Page load timeout in milliseconds (default: `30000`) |
| `AVIARY_VIEWPORT` | `"WxH"` | Simulator viewport size (overridden by `--viewport`) |
| `AVIARY_PRESET` | `"basic"` \| `"advanced"` \| `"strict"` | Active rule preset (overridden by `--preset`) |
| `AVIARY_OUTPUT` | string (path) | Destination path for JSON report (overridden by `--output`) |
| `AVIARY_HTML_OUTPUT` | string (path) | Destination path for HTML report (overridden by `--html`) |
| `AVIARY_LOG_LEVEL` | `"debug"` \| `"info"` \| `"warn"` \| `"error"` | Log verbosity (default: `info`) |
| `AVIARY_METRICS_PORT`| number | Prometheus `/metrics` HTTP server port (default: `9090`) |

### Prometheus Metrics

Aviary automatically starts a lightweight background Prometheus metrics server on port `9090` (or `AVIARY_METRICS_PORT`). Scrape `http://localhost:9090/metrics` to monitor execution histograms (`llm_inference_time_ms`) and default Node.js runtime metrics.

---

## Configuration

You can customize which audits to run and modify their rules via custom config files or presets.

> [!NOTE]
> Presets restrict or expand the check list:
> - **basic**: Fast, essential checks (ideal for rapid CI checks)
> - **advanced**: Comprehensive analysis covering heatmap simulations (default)
> - **strict**: Full checks with stricter scoring rules

Most checks compare against a built-in numeric threshold (minimum word count, title length bounds, image count ceilings, and so on). Any of these can be overridden per rule via an `options` object, without forking the checker:

```json
{
  "rules": {
    "content": {
      "word-count-adequate": {
        "enabled": true,
        "options": { "minWords": 500, "excellentWords": 1500 }
      }
    }
  }
}
```

An option you don't set keeps its built-in default — there's no need to repeat every threshold to override one.

To write an HTML report programmatically:

```typescript
import { SEOChecker, generateHtmlReport } from '@ru1vly/aviary';

async function exportReport() {
  const checker = new SEOChecker({ url: 'https://example.com' });
  const report = await checker.check();
  
  // Write the report to disk
  generateHtmlReport(report, './reports/seo-analysis.html');
}
```

---

## Native architecture & terminal UI

Aviary combines a high-fidelity TypeScript + Playwright browser crawler with high-performance Rust components:

1. **Interactive TUI Dashboard**: Built with Ratatui and Crossterm in `tui/`. Running `aviary` with no arguments boots into a responsive terminal dashboard with real-time audit navigation, score meters, and issue inspectors.
2. **Fast Static Engine (`aviary-fast`)**: Native Rust parser built with `reqwest`, `scraper`, and `tokio` for microsecond-level raw HTTP checks.
3. **Platform Prebuilt Binaries**: Shipped via optional dependencies for zero-compilation startup across Linux, macOS, and Windows.

---

## Project structure

```
aviary/
├── src/                   # Source code (TypeScript auditing engine)
│   ├── checkers/          # 28 SEO checker modules
│   ├── config/            # Loader, presets, and configuration types
│   ├── errors/            # Logger, error handlers, and retry mechanism
│   ├── mcp/               # Model Context Protocol (MCP) server
│   ├── types/             # Common TypeScript interfaces
│   ├── index.ts           # Core library entry point
│   ├── cli.ts             # CLI command runner
│   └── reporter.ts        # HTML report template compiler
├── tui/                   # Rust interactive terminal dashboard (Ratatui)
├── engine/                # Rust fast static engine (aviary-fast)
├── examples/              # Code samples and config file templates
├── tests/                 # Unit, integration, and E2E tests
└── dist/                  # Compiled JavaScript distribution
```

---

## Development setup

To build and test the tool locally:

```bash
# Clone the repository
git clone https://github.com/Ru1vly/Aviary.git
cd Aviary

# Install project dependencies
pnpm install

# Download required browser binaries
pnpm exec playwright install chromium

# Compile TypeScript code to distribution folder
pnpm run build

# Run unit and integration tests
pnpm run test
```

---

## License

This project is licensed under the MIT License.
