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
| Headings | Audits heading structure and semantics | H1 presence and uniqueness, heading hierarchy levels (H1-H6), heading length optimization |
| Images | Evaluates image attributes and layouts | Alt text presence, source validity, image count, dimension optimization |
| Performance | Measures basic site load times | Page load duration, DOM Content Loaded event timing, First Contentful Paint |
| Technical SEO | Verifies server configuration and response status | Response status codes, page sizes, compression headers, duplicate content detection |
| Heatmap & UX | Models visual hierarchy and attention zones | Predictive click maps, scroll depth levels, above-the-fold content scoring, CTA visibility |
| Accessibility | Inspects basic accessibility markers | ARIA landmarks, form input labeling, keyboard navigation order, skip links |
| Core Web Vitals | Real browser performance metrics via `web-vitals` | Real LCP, CLS, FCP, TTFB measurements, plus Total Blocking Time (TBT) lab proxy |
| URL Factors | Audits the page address format | URL length, character validity, directory depth, readability rules |
| Spam Detection | Guards against search engine red flags | Hidden text, excessive keyword repetitions, link densities, iframe abuses |

<details>
<summary><strong>View all 28 supported categories</strong></summary>

1. **Meta Tags** (`metaTags`)
2. **Headings** (`headings`)
3. **Images** (`images`)
4. **Performance** (`performance`)
5. **Robots.txt** (`robotsTxt`)
6. **Sitemap** (`sitemap`)
7. **Security** (`security`)
8. **Structured Data** (`structuredData`)
9. **Social Media** (`socialMedia`)
10. **Content** (`content`)
11. **Links** (`links`)
12. **UI Elements** (`uiElements`)
13. **Technical SEO** (`technical`)
14. **Accessibility** (`accessibility`)
15. **URL Factors** (`urlFactors`)
16. **Spam Detection** (`spamDetection`)
17. **Page Quality** (`pageQuality`)
18. **Advanced Images** (`advancedImages`)
19. **Multimedia** (`multimedia`)
20. **Core Web Vitals** (`coreWebVitals`)
21. **Analytics & Tracking** (`analytics`)
22. **Mobile UX** (`mobileUX`)
23. **Schema Validation** (`schemaValidation`)
24. **Resource Optimization** (`resourceOptimization`)
25. **Legal & Compliance** (`legalCompliance`)
26. **E-commerce** (`ecommerce`)
27. **Internationalization** (`internationalization`)
28. **Heatmap & UX** (`heatmap`)

</details>

---

## Installation

Install the package into your project:

```bash
# Using npm
npm install @ru1vly/aviary
# or short alias:
npm i @ru1vly/aviary

# Using pnpm
pnpm add @ru1vly/aviary

# Using yarn
yarn add @ru1vly/aviary

# Using bun
bun add @ru1vly/aviary
```

To install globally as a command-line tool:

```bash
# Using npm
npm install -g @ru1vly/aviary
# or short alias:
npm i -g @ru1vly/aviary

# Using pnpm
pnpm add -g @ru1vly/aviary
```

Or run directly without installing via `npx`:

```bash
# Run direct audit
npx @ru1vly/aviary -u https://example.com

# Launch interactive TUI Dashboard directly
npx @ru1vly/aviary
```

---

## Quick Start

Analyze any URL directly from your shell.

Running the command with no arguments launches the full-screen interactive Terminal User Interface (TUI) Dashboard:

```bash
# Launch interactive TUI Dashboard
aviary
```

To run checks directly in CLI stdout mode (for scripts, CI pipelines, or AI agents), pass the target URL using the `-u` or `--url` flag:

> [!NOTE]
> Positional URL arguments (e.g. `aviary https://example.com`) are no longer supported. Always specify the URL with `-u` or `--url`. Running `aviary` with no arguments boots into the interactive TUI.

```bash
# Run direct audit
aviary -u https://example.com

# Save detailed JSON report to a file
aviary -u https://example.com --output report.json
# or with shortcut:
aviary -u https://example.com -o report.json

# Save a visual HTML report to a file
aviary -u https://example.com --html report.html

# Output raw JSON string directly to stdout (clean stdout for CI / jq)
aviary -u https://example.com --json

# Run checks with verbose outputs (lists failure details)
aviary -u https://example.com --verbose
# or with shortcut:
aviary -u https://example.com -v

# Run with a mobile viewport simulation
aviary -u https://example.com --viewport 375x667

# Run with a specific configuration preset (basic, advanced, strict)
aviary -u https://example.com --preset basic
# or with shortcut:
aviary -u https://example.com -p basic

# Run in headed mode (visible browser window)
aviary -u https://example.com --headed

# Create a default configuration template (.aviary.json) in CWD
aviary --init-config
```

### Programmatic API

Import `SEOChecker` to run checks programmatically within your Node.js or TypeScript application:

```typescript
import { SEOChecker, generateHtmlReport, renderHtmlReport } from '@ru1vly/aviary';

async function runAudit() {
  const checker = new SEOChecker({
    url: 'https://example.com',
    headless: true,                          // Run browser headless (default: true)
    timeout: 30000,                          // Navigation timeout in ms (default: 30000)
    viewport: { width: 1920, height: 1080 }, // Viewport dimensions
    config: { preset: 'advanced' },          // Preset: 'basic' | 'advanced' | 'strict'
    // categories: ['metaTags', 'performance'], // Optional: audit specific categories only
  });

  const report = await checker.check();

  console.log(`Overall SEO Score: ${report.score !== null ? `${report.score}/100` : 'N/A'}`);
  console.log(`Passed: ${report.summary.passed}/${report.summary.total} checks`);

  // Inspect individual category results
  report.checks.metaTags.forEach((check) => {
    console.log(`  ${check.passed ? '✓' : '✗'} ${check.message}`);
  });

  // Save an HTML report to disk
  generateHtmlReport(report, './reports/seo-analysis.html');

  // Or retrieve the HTML string directly (e.g. to send via email or HTTP)
  const htmlString = renderHtmlReport(report);
}

runAudit();
```

---

## Model Context Protocol (MCP) Server

Aviary includes a built-in Model Context Protocol (MCP) server that exposes real-browser SEO auditing tools directly to AI coding agents (Claude Desktop, Cursor, Windsurf, Antigravity, etc.).

The server communicates via standard I/O (`stdio`) and provides three registered tools:

| Tool | Parameters | Description |
|---|---|---|
| `seo_audit` | `url` (string, required)<br>`preset?` (`basic` \| `advanced` \| `strict`)<br>`categories?` (string[]) | Full SEO audit returning structured results across all 28 categories. |
| `seo_score` | `url` (string, required) | Quick audit returning overall score (`0-100`), letter grade (`A`-`F`), and pass/fail counts. |
| `seo_check_category` | `url` (string, required)<br>`category` (enum, required) | Targeted audit executing checks for a single specified category (e.g. `metaTags`, `performance`). |

### Running the MCP Server

```bash
# Via binary entry point (when installed globally or locally in node_modules/.bin)
aviary-mcp

# Or via npx (use --package flag to target the aviary-mcp binary)
npx -y --package=@ru1vly/aviary aviary-mcp

# Or directly with node from your project
node ./node_modules/@ru1vly/aviary/dist/mcp/server.js
```

### Agent Configuration (`claude_desktop_config.json` / MCP Settings)

When configuring Claude Desktop, Cursor, or another MCP host, specify `--package=@ru1vly/aviary` so `npx` executes the `aviary-mcp` binary:

```json
{
  "mcpServers": {
    "aviary": {
      "command": "npx",
      "args": ["-y", "--package=@ru1vly/aviary", "aviary-mcp"]
    }
  }
}
```

If installed globally via `npm install -g @ru1vly/aviary`, you can invoke the binary directly:

```json
{
  "mcpServers": {
    "aviary": {
      "command": "aviary-mcp"
    }
  }
}
```

---

## Command Line Options

The command-line interface supports the following parameters:

| Option | Shortcut | Type | Description |
|---|---|---|---|
| `--url` | `-u` | string | Target website URL to analyze (required for CLI audit mode) |
| `--output` | `-o` | string | File path to write the JSON results payload |
| `--html` | | string | File path to write the visual HTML report page |
| `--json` | | boolean | Output raw JSON string directly to standard output (clean stdout for CI / jq) |
| `--config` | `-c` | string | Path to a custom JSON or YAML configuration file |
| `--preset` | `-p` | string | Configuration preset name (`basic`, `advanced`, `strict`) |
| `--verbose` | `-v` | boolean | Output check details object for failed entries |
| `--headed` | | boolean | Run the browser simulator in headed mode (visible window) |
| `--viewport` | | string | Set simulator window size (e.g. `1920x1080` or `375x667`) |
| `--init-config`| | boolean | Create a default configuration template file (`.aviary.json`) in the CWD |
| `--help` | `-h` | boolean | Show CLI help message and options reference |

---

## Environment Variables (12-Factor Config)

All CLI options can be configured via environment variables for 12-factor deployment and container environments:

| Variable | Type / Values | Description |
|---|---|---|
| `AVIARY_URL` | string | Target URL (overridden by `-u` / `--url`) |
| `AVIARY_HEADLESS` | `"true"` \| `"false"` | Run browser headless (overridden by `--headed`) |
| `AVIARY_TIMEOUT` | number (ms) | Page load timeout in milliseconds (default: `30000`) |
| `AVIARY_VIEWPORT` | `"WxH"` | Simulator viewport size (e.g. `"1920x1080"`, overridden by `--viewport`) |
| `AVIARY_PRESET` | `"basic"` \| `"advanced"` \| `"strict"` | Active rule preset (overridden by `--preset`) |
| `AVIARY_OUTPUT` | string (path) | Destination path for JSON report (overridden by `--output`) |
| `AVIARY_HTML_OUTPUT` | string (path) | Destination path for HTML report (overridden by `--html`) |
| `AVIARY_LOG_LEVEL` | `"debug"` \| `"info"` \| `"warn"` \| `"error"` | Log verbosity (default: `info`) |
| `AVIARY_METRICS_PORT`| number | Prometheus `/metrics` HTTP server port (default: `9090`) |
| `AVIARY_LLM_PROVIDER`| `"ollama"` \| `"stub"` | LLM provider for semantic checks (default: `stub`) |
| `AVIARY_LLM_ENDPOINT`| string | LLM endpoint URL (default: `http://localhost:11434`) |
| `AVIARY_LLM_MODEL` | string | LLM model identifier (default: `llama3.2`) |
| `AVIARY_LLM_API_KEY` | string | LLM API key when required (never logged) |
| `AVIARY_SKIP_BROWSER_INSTALL` | `"true"` \| `"false"` | Skip automatic Playwright browser provisioning |

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

An option you don't set keeps its built-in default — there is no need to repeat every threshold to override one.

---

## Native Architecture & Terminal UI

Aviary combines a high-fidelity TypeScript + Playwright browser crawler with high-performance Rust components:

1. **Interactive TUI Dashboard**: Built with Ratatui and Crossterm in `tui/`. Running `aviary` with no arguments boots into a responsive terminal dashboard with real-time audit navigation, score meters, and issue inspectors.
2. **Fast Static Engine (`aviary-fast`)**: Native Rust parser built with `reqwest`, `scraper`, and `tokio` for microsecond-level raw HTTP checks.
3. **Platform Prebuilt Binaries**: Shipped via optional dependencies for zero-compilation startup across Linux, macOS, and Windows (`@ru1vly/aviary-linux-x64`, `@ru1vly/aviary-linux-arm64`, `@ru1vly/aviary-darwin-x64`, `@ru1vly/aviary-darwin-arm64`, `@ru1vly/aviary-win32-x64`).

---

## Project Structure

```text
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

## Development Setup

To build and test the tool locally:

```bash
# Clone the repository
git clone https://github.com/Ru1vly/Aviary.git
cd Aviary

# Install project dependencies
pnpm install

# Download required browser binaries
pnpm exec playwright install chromium

# Compile TypeScript code and Rust binaries to distribution folder
pnpm run build

# Run complete test suite (unit, integration, and E2E)
pnpm run test
```

You can also run specific test suites during development:

```bash
# Run unit tests
pnpm run test:unit

# Run CLI and MCP integration tests
pnpm run test:integration

# Run full browser end-to-end tests
pnpm run test:e2e
```

---

## License

This project is licensed under the MIT License.
