# Contributing & Supporting Aviary

Aviary is an open-source, community-driven SEO and website auditing toolkit. It executes real Chromium browser sessions to evaluate JavaScript-rendered DOMs, Core Web Vitals, accessibility, and technical SEO exactly as search engine crawlers and users experience them.

Maintaining 235 checks across 28 categories—and verifying them against ever-evolving browser standards—demands rigorous testing, server infrastructure, and community collaboration. Whether you write code, sponsor infrastructure costs, or share reports with fellow engineers, your support directly keeps Aviary fast, accurate, and free.

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

Aviary is 100% free software. Financial contributions allow maintainers to dedicate sustained time to feature development and cover recurring operational costs.

### 2.1 Where Funds Go

Your financial support directly covers:
- **Continuous Integration & Test Runners:** Running 235 automated browser checks on Chromium across Linux, macOS, and Windows runners for every pull request.
- **High-Concurrency Benchmark Infrastructure:** Cloud server instances used to stress-test parallel crawling and crawler memory consumption against massive multi-page domains.
- **Documentation & Domain Hosting:** Ensuring documentation and online reference materials remain reliably accessible with global edge acceleration.
- **Browser Testing Matrix:** Licenses and resources for cross-browser testing automation across multiple Chromium and WebKit release channels.

### 2.2 Sponsorship Channels

You can sponsor Aviary through any of the following platforms:

| Platform | Type | Best For | Link |
|---|---|---|---|
| **GitHub Sponsors** | Recurring or One-Time | Developers & Organizations | [github.com/sponsors/Ru1vly](https://github.com/sponsors/Ru1vly) |
| **Buy Me a Coffee** | Micro-donations & Quick Tips | Individual Engineers | [buymeacoffee.com/ru1vly](https://buymeacoffee.com/ru1vly) |

> [!TIP]
> Does your company rely on Aviary in continuous integration pipelines to catch SEO regressions? Consider asking your team to sponsor Aviary as part of your company's open-source sustainability budget.

### 2.3 Sponsor Recognition

Sponsors receive:
- Prominent listing in the `README.md` and docs website footer.
- Company logo placement for organizational tiers.
- Direct shoutouts in minor and major release announcements.
- Priority issue triaging and direct input on roadmap planning.

---

## 3. Contributing via Content & Outreach

Non-code contributions expand Aviary's reach and provide essential empirical data to improve check accuracy.

### 3.1 Star the Repository

Giving the repository a star on [GitHub](https://github.com/Ru1vly/Aviary) takes two seconds and helps other developers discover the toolkit:
- Increases Aviary's visibility in GitHub Trending and search rankings.
- Signals reliability to new developers and prospective contributors.

### 3.2 Share Reports & Audit Scores

Sharing real audit outputs helps educate the broader web development community on modern SEO best practices:
- Share screenshots of your terminal audit scores or HTML summary cards on **X / Twitter** and **LinkedIn**.
- Tag `@ru1vly` or use the `#AviarySEO` hashtag so we can reshare and highlight your optimization successes.
- Embed Aviary audit badges in your project repository to showcase your SEO health score.

### 3.3 Write Articles & Tutorials

Publishing technical walkthroughs accelerates adoption:
- Write articles on DEV Community, Hashnode, Medium, or personal tech blogs explaining how you integrated `@ru1vly/aviary` into your deployment pipeline.
- Create video tutorials demonstrating local debugging with Aviary's interactive terminal TUI.
- Submit guest posts comparing browser-evaluated checks against simple static HTTP scrapers.

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
