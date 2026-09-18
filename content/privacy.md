# Privacy Policy

**Effective Date:** September 17, 2026

Aviary is an open-source, local-first website auditing engine and documentation platform. We build developer tooling designed for transparency, security, and minimal data collection.

> [!NOTE]
> Aviary operates with a strict zero-telemetry policy. We do not track you, collect personal data, or exfiltrate the contents of websites you audit.

---

## 1. Scope & Architecture

This Privacy Policy applies to:
- The **Aviary Open-Source Tooling**: The command-line interface (`@ru1vly/aviary`), programmatic Node.js library, and Model Context Protocol (MCP) server integration.
- The **Aviary Documentation Website**: Hosted at `https://aviary-docs.vercel.app` (and associated preview deployments).

## 2. Local-First Auditing (Zero Telemetry)

Aviary is engineered to run audits entirely within your own environment (local development machines, staging servers, or private CI/CD pipelines):
- **No Usage Telemetry**: The CLI and programmatic library do not collect, transmit, or phone home runtime diagnostics, invocation flags, system specifications, or usage metrics.
- **No Target Data Exfiltration**: When auditing a target URL, the embedded Playwright browser instance navigates directly to that URL. Audited page contents, rendered DOM nodes, network headers, console logs, and generated audit reports (`.json` or `.html`) remain entirely on your local machine. No audit results or target data are ever sent to Aviary maintainers or third parties.
- **Local Cache & Storage**: Any audit artifacts or temporary profiles created during browser execution are written exclusively to your local disk and managed according to your local configuration.
- **Browser Binary Downloads**: When installing Chromium via Playwright, binaries are downloaded directly from the official Microsoft Playwright CDN. Aviary does not intermediary-proxy or log these download requests.

## 3. Documentation Website & Infrastructure

When you browse our documentation website (`aviary-docs.vercel.app`):
- **Server Access Logs**: The documentation site is statically hosted via Vercel. Like virtually all web hosts, Vercel infrastructure processes standard, transient HTTP request logs (such as requesting IP address, user agent, requested resource, and timestamp) solely to serve web traffic, mitigate DDoS attacks, and maintain edge network security.
- **No Third-Party Trackers**: We do not load advertising pixels, behavior trackers, Google Analytics, or third-party marketing scripts.
- **Zero Local Storage & Cookies**: The documentation site does not use cookies, `localStorage`, `sessionStorage`, or IndexedDB. We do not store theme preferences, drawer states, or any persistent client data (see our [Cookie Policy](/docs?doc=cookies)).

## 4. Third-Party Services & Links

Our documentation and repository link to third-party services:
- **GitHub**: Our source code, issue tracking, discussions, and financial sponsorships are hosted on [GitHub](https://github.com/Ru1vly/Aviary). Any information you share publicly on GitHub (such as issue comments, profile details, or PR submissions) is governed by [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).
- **npm**: Package distribution is hosted on the [npm registry](https://www.npmjs.com/package/@ru1vly/aviary), subject to npm's terms and privacy policies.

We are not responsible for the privacy practices, content, or policies of external services.

## 5. Security & Vulnerability Disclosure

We welcome responsible security disclosures. If you discover a potential vulnerability in the Aviary CLI or documentation site, please do not disclose it in a public issue. Instead, report it through [GitHub Security Advisories](https://github.com/Ru1vly/Aviary/security/advisories) or contact the project maintainers via the [Aviary GitHub repository](https://github.com/Ru1vly/Aviary).

## 6. Updates to This Policy

We may update this Privacy Policy from time to time to reflect changes in our software or legal requirements. Updates are versioned directly in our public repository with an updated effective date.
