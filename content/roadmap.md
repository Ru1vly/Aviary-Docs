# Roadmap

This page summarizes current capabilities and proposed adoption priorities as of October 7, 2026. Proposals are open for feedback; they are not release commitments. See [releases](https://github.com/Ru1vly/Aviary/releases) and the [changelog](https://github.com/Ru1vly/Aviary/blob/main/CHANGELOG.md) for shipped changes.

## Available today

- Rendered-page audits using Playwright Chromium, with optional native Rust tools.
- Bounded multi-page audits, sitemap discovery, and static same-origin link discovery.
- JSON and HTML reports, plus Markdown, CSV, PDF, JUnit, and SARIF exports.
- Baseline comparisons, explicit CI gates, watch mode, and audit history.
- GEO crawler-policy and page-signal checks, plus analysis of supplied AI-answer observations, crawler logs, and Google/Bing exports.
- Node.js SDK, MCP server, and loopback REST API.

Read the [quick start](/docs/) to try a workflow and the [accuracy limitations](/docs/accuracy-limitations/) to understand what the results verify.

## Proposed priorities

| Priority | Desired outcome | Status |
| --- | --- | --- |
| First-audit onboarding | New users can create a report, understand a finding, and review a fix | Documentation improvements in progress |
| Useful examples | Developers can adopt a repeatable CI workflow and inspect representative reports | CI example available; more examples proposed |
| Finding clarity | Users can distinguish actionable issues from intentional site behavior | Feedback wanted |
| Documentation consistency | Website guides match the CLI, SDK, and repository setup | Website content refresh in progress |

## Help choose what comes next

[Open an issue](https://github.com/Ru1vly/Aviary/issues) describing what you were trying to do, where the current workflow falls short, and an example of the desired result. Existing integrations and repeated user needs will inform priorities.

Aviary is MIT licensed. Default local audits have no built-in usage telemetry and do not upload reports to maintainers. Sponsorship supports maintenance; it does not purchase roadmap priority. See [data handling](/docs/privacy/) and [support](/support/).
