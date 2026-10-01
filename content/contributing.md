# Contributing & Supporting Aviary

Aviary is an open-source, community-driven SEO and website auditing toolkit. It executes real Chromium browser sessions to evaluate JavaScript-rendered DOMs, Core Web Vitals, accessibility, and technical SEO exactly as search engine crawlers and users experience them.

Maintaining 242 checks across 29 categories—and verifying them against ever-evolving browser standards—demands ongoing maintenance, development, and community collaboration. Whether you write code, sponsor the project, or share reports with fellow engineers, your support keeps Aviary fast, accurate, and free.

> [!IMPORTANT]
> Aviary is free and open-source software licensed under the [MIT License](https://github.com/Ru1vly/Aviary/blob/main/LICENSE). All contributions submitted to the project will be distributed under the same terms.

---

## 1. Contributing by Coding

Code contributions keep Aviary resilient, performant, and up-to-date with modern web specifications. We welcome pull requests from developers of all skill levels.

### 1.1 Finding and Fixing Bugs

Browser-based auditing interacts with unpredictable real-world web pages. Common bug areas include:
- **Navigation race conditions:** Dynamic client-side hydration completing after checkers fire.
- **Resource leaks:** Lingering Playwright browser contexts or unclosed CDP sessions under high concurrency.
- **Parser edge cases:** Malformed JSON-LD, invalid microdata nesting, or non-standard meta tag layouts.

If you discover an issue:
1. Search existing issues on [GitHub Issues](https://github.com/Ru1vly/Aviary/issues) to verify it has not already been reported.
2. If new, open an issue with a minimal reproduction URL, terminal output or JSON report snippet, and your Node.js/OS version.
3. Submit a PR referencing the issue.

### 1.2 Writing New Browser Audit Checks

Aviary checks are modular rules organized by category (e.g. `meta`, `performance`, `accessibility`, `security`). To propose a new check:

1. Identify the relevant category directory inside `packages/core/src/checks/`.
2. Define your check adhering to the `CheckRule` interface:
   - Unique identifier (e.g. `meta-theme-color-valid`)
   - Severity level (`error`, `warning`, `info`)
   - Descriptive title and clear remediation advice
   - Fast, non-destructive browser evaluation logic using `page.evaluate()` or CDP session inspects
3. Avoid heavy network roundtrips inside check bodies—inspect data captured during initial page load whenever possible.
4. Add unit tests and fixture pages under `tests/checks/`.

```typescript
import { CheckRule, AuditContext, CheckResult } from '@ru1vly/aviary';

export const metaThemeColorCheck: CheckRule = {
  id: 'meta-theme-color-valid',
  category: 'meta',
  title: 'Theme Color Meta Tag',
  severity: 'warning',
  description: 'Ensures the theme-color meta tag is specified with a valid hexadecimal or CSS color.',
  async run(context: AuditContext): Promise<CheckResult> {
    const themeColor = await context.page.$eval(
      'meta[name="theme-color"]',
      (el) => el.getAttribute('content')
    ).catch(() => null);

    if (!themeColor) {
      return {
        passed: false,
        message: 'No meta[name="theme-color"] tag found.',
        remediation: 'Add <meta name="theme-color" content="#0C0D0C"> to match your brand palette.',
      };
    }

    return {
      passed: true,
      message: `Valid theme color configured: ${themeColor}`,
    };
  },
};
```

### 1.3 Improving TypeScript Definitions & Schemas

We prioritize 100% strict type safety across the entire repository:
- Enhance schema validation for JSON-LD and Schema.org types.
- Ensure all public CLI and Node.js SDK options have exhaustive JSDoc annotations and autocomplete definitions.
- Refine report schema types (`AuditReport`, `CategoryScore`, `IssueItem`) to facilitate third-party tooling integration.

### 1.4 Submitting Pull Requests

1. **Fork the repository** at [github.com/Ru1vly/Aviary](https://github.com/Ru1vly/Aviary).
2. **Create a topic branch:**
   ```bash
   git checkout -b fix/heading-hierarchy-recursion
   ```
3. **Install dependencies and verify the build:**
   ```bash
   npm install
   npm test
   npm run lint
   ```
4. **Commit with descriptive conventional messages:**
   ```bash
   git commit -m "fix(checks): correctly handle skipped heading levels in shadow DOM"
   ```
5. **Open a PR** against `main` on GitHub. Maintainers review PRs promptly and assist with any test failures.

### 1.5 Enhancing Documentation

Documentation is just as vital as code. You can contribute by:
- Improving explanations of technical SEO checks in `content/quickstart.md`.
- Documenting newly discovered edge cases in `content/accuracy-limitations.md`.
- Adding code snippets showing integration with CI systems (GitHub Actions, GitLab CI, Jenkins).

---

## 2. Contributing Financially

Aviary is independent, open-source, and free forever. Sponsorship sustains ongoing maintenance and development — new checks, bug fixes, docs, and keeping 242 checks aligned with evolving web standards. See the full tiers, platforms, sponsors wall, and FAQ on the [support page](/support).

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

## 3. Contributing via Content & Outreach

Non-code contributions expand Aviary's reach and provide essential empirical data to improve check accuracy.

### 3.1 Star the Repository

Giving the repository a star on [GitHub](https://github.com/Ru1vly/Aviary) takes two seconds and helps other developers discover the toolkit:
- Increases Aviary's visibility in GitHub Trending and search rankings.
- Signals reliability to new developers and prospective contributors.

### 3.2 Share Reports & Audit Scores

Sharing real audit outputs helps educate the broader web development community on modern SEO best practices:
- Share screenshots of your terminal audit scores or HTML summary cards on your preferred platforms (e.g. X / Twitter, LinkedIn, DEV Community).
- No tagging or hashtag required, and reshares are not guaranteed.

### 3.3 Write Articles & Tutorials

Publishing technical walkthroughs accelerates adoption:
- Write articles on DEV Community, Hashnode, Medium, or personal tech blogs explaining how you integrated `@ru1vly/aviary` into your deployment pipeline.

### 3.4 Report False Positives

Automated heuristics sometimes flag legitimate patterns as errors. Reporting these edge cases helps us tune our thresholds:
- If a check flags something on your site that you believe is valid, file an issue titled `False Positive: [Check Name] on [pattern]`.
- Provide the sanitized HTML snippet or public URL demonstrating the scenario.
- Explain why the markup is technically sound according to HTML5, ARIA, or search engine guidelines.

---

## 4. Local Development Workflow

To work on Aviary locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/Ru1vly/Aviary.git
cd Aviary

# 2. Install dependencies
npm install

# 3. Build all packages
npm run build

# 4. Run the test suite
npm test

# 5. Run typecheck & linter
npm run typecheck
npm run lint
```

> [!NOTE]
> When testing browser checks locally, Chromium will be downloaded automatically by Playwright if it is not already installed on your system.

---

## Questions & Community

Have questions about contributing or want to discuss an architectural change before writing code?
- Open a discussion on [GitHub Discussions](https://github.com/Ru1vly/Aviary/discussions).
- Open an issue on [GitHub Issues](https://github.com/Ru1vly/Aviary/issues).
- Check the [Roadmap](/docs?doc=roadmap) to see planned features and upcoming milestones.
