# Contributing to Aviary

Thanks for helping improve Aviary. This guide covers the local setup, the main parts of the repository, and what to include with a change.

## Start with a useful contribution

You can help without changing code:

- Follow [Getting started](https://github.com/Ru1vly/Aviary/blob/main/docs/GETTING_STARTED.md) and report unclear steps or installation problems.
- Share a sanitized reproduction of an incorrect or confusing finding.
- Improve a check explanation or add a practical example showing a finding and its fix.
- Correct documentation links, commands, or missing prerequisites.

Use the [bug report](https://github.com/Ru1vly/Aviary/issues/new?template=bug_report.md) or [workflow feedback](https://github.com/Ru1vly/Aviary/issues/new?template=workflow_feedback.md) template. For a larger feature, open an issue describing the workflow and desired outcome before implementing it so maintainers can discuss scope. Small documentation fixes can go directly to a pull request.

## 1. Contributing by Coding

### Set up the project

Aviary requires Node.js 22 for development (the package supports Node.js 20 or newer). The repository pins pnpm 10.34.6 in `package.json`. Use that version to keep installs aligned with CI and the lockfile. Install dependencies and the Playwright browser:

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
```

Some Linux environments also need Chromium's system libraries:

```sh
pnpm exec playwright install chromium --with-deps
```

## Run the relevant checks

Use the narrowest checks that cover your change, then run the full suite when practical:

```sh
pnpm run build:ts
pnpm run check:cli-docs
pnpm run lint
pnpm run format:check
pnpm run check:xlsx-bundle
pnpm run test:coverage --maxWorkers=2
```

The Vitest suites are under `tests/unit`, `tests/integration`, `tests/e2e`, and `tests/benchmarks`. Browser-backed tests need Playwright Chromium. The [accuracy and scope notes](https://github.com/Ru1vly/Aviary/blob/main/docs/./ACCURACY_LIMITATIONS.md) describe which measurements are lab data or heuristics.

The Rust static engine and terminal UI live in `engine/` and `tui/`. Use the Rust toolchain and the workspace's Cargo commands when changing those packages. Keep changes scoped to the relevant implementation rather than modifying generated `dist/`, `target/`, or platform binary files.

## Where code belongs

- `src/checkers/` contains the page-level SEO and accessibility checks. Shared DOM, text, URL, and sitemap helpers belong in `src/checkers/shared/` or another focused utility module.
- `src/index.ts` exposes the public audit API and runs bounded URL batches.
- `src/reporter.ts` renders JSON-backed HTML, PDF, JUnit, SARIF, Markdown, and CSV artifacts.
- `src/api/` contains the REST server and typed client. Keep endpoint behavior, `docs/openapi.yaml`, and `docs/API.md` in sync.
- `src/config/` owns configuration parsing and defaults; update `examples/CONFIG.md` when public settings change.
- `src/mcp/` implements the Model Context Protocol server.

Prefer small helpers with explicit bounds for network, file, and browser work. Preserve the existing public report shape unless a change requires a documented API adjustment.

## Prepare a change

Before opening a pull request:

1. Describe the user-visible behavior and the reason for the change.
2. Add or update focused tests for changed behavior, including boundary cases and error paths.
3. Update the README or the relevant guide when commands, options, outputs, or public APIs change.
4. Update the OpenAPI contract when a REST request, response, status code, or event changes.
5. Report the commands you ran and any checks you could not run.

Use local fixtures or deterministic mocks for tests where possible. Do not commit API keys, cookies, private audit reports, or site-specific credentials. For an audit that uses a real URL, make sure the site is one you are allowed to inspect.

## Pull requests and issues

Keep pull requests focused and include enough context to review the behavior. For a report or dashboard change, include a representative screenshot or sample output when it clarifies the result. For a bug report, include the Aviary version, Node.js version, command or API request, observed result, expected result, and a sanitized error message or report excerpt.

Be considerate in review discussions. Explain tradeoffs plainly, and keep user-facing wording consistent with the README and existing reports.

For candidate packaging, native validation and npm publication, use the single [release guide](https://github.com/Ru1vly/Aviary/blob/main/docs/RELEASING.md).

## 2. Contributing Financially

Aviary is independent, open-source, and free forever. Sponsorship sustains ongoing maintenance and development — new checks, bug fixes, docs, and keeping checks aligned with evolving web standards. See the full tiers, platforms, sponsors wall, and FAQ on the [support page](/support).

### 2.1 Sponsor Tiers

| Tier | Price | Via | Perk |
|---|---|---|---|
| **Coffee** | $5 one-time | [Buy Me a Coffee](https://buymeacoffee.com/ru1vly) | Name on the sponsors wall (opt-in) |
| **Sustainer** | $10 / month | [GitHub Sponsors](https://github.com/sponsors/Ru1vly) | Name + link on the sponsors wall (opt-in) |
| **Backer** | $49+ / month | [GitHub Sponsors](https://github.com/sponsors/Ru1vly) | Logo + link on the sponsors wall (opt-in) |

All perks are recognition-only: sponsorship unlocks no features, buys no priority triage or roadmap votes, and includes no support SLA. Everything ships MIT-licensed to everyone.

### 2.2 Claiming Your Wall Spot

1. Sponsor via GitHub Sponsors or Buy Me a Coffee.
2. Comment on [GitHub Discussions](https://github.com/Ru1vly/Aviary/discussions) with the name (plus link or logo for upper tiers) you want listed.
3. Entries are added manually, are strictly opt-in, and are removed on request or when sponsorship lapses.

> [!NOTE]
> Scoped consulting (e.g. CI setup reviews) is handled separately from sponsorship — ask via [GitHub Discussions](https://github.com/Ru1vly/Aviary/discussions). Sponsorship itself is not a support contract.

### 2.2 Sponsorship Channels

You can sponsor Aviary through any of the following platforms:

| Platform | Type | Best For | Link |
|---|---|---|---|
| **GitHub Sponsors** | Recurring or One-Time | Developers & Organizations | [github.com/sponsors/Ru1vly](https://github.com/sponsors/Ru1vly) |
| **Buy Me a Coffee** | Micro-donations & Quick Tips | Individual Engineers | [buymeacoffee.com/ru1vly](https://buymeacoffee.com/ru1vly) |

> [!TIP]
> Does your company rely on Aviary in CI to catch SEO regressions? Backing the project is a visible way to sustain the maintenance your pipeline depends on.

### 2.3 Sponsor Recognition

The sponsors wall is the only formal perk, and it is strictly opt-in:

- **Coffee:** name listed.
- **Sustainer:** name + link listed.
- **Backer:** logo + link listed.

No logo placement is automatic, no release shoutouts are guaranteed, and sponsorship confers no triage priority or roadmap influence. If additional perks are introduced later, they will be documented here first.

---


## Share your experience

Useful contributions include explaining a finding and its fix, writing a CI walkthrough, and reporting false positives with a sanitized reproduction. Share private audit reports only after removing sensitive information.
