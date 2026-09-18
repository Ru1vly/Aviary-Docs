# Cookie Policy

**Effective Date:** September 17, 2026

Aviary is designed with developer privacy and data minimization as core tenets. This Cookie Policy explains how cookies and browser storage technologies are handled across the Aviary documentation website (`aviary-docs.vercel.app`) and the `@ru1vly/aviary` open-source toolkit.

> [!NOTE]
> The Aviary documentation website uses zero cookies and zero local storage. We do not use advertising beacons, session stores, or third-party analytics trackers.

---

## 1. Do We Use Cookies?

**No.** The Aviary documentation site does not create, read, or transmit HTTP cookies:
- No first-party session cookies.
- No third-party analytics cookies (such as Google Analytics or Segment).
- No advertising or behavioral tracking cookies.
- No profiling or marketing beacons.

Because we do not deploy cookies or user tracking mechanisms, you will not encounter cookie consent popups or tracking banners on this website.

## 2. Cookies and the Auditing Engine (CLI & Library)

When you run the Aviary CLI (`npx @ru1vly/aviary`) or use the Node.js library to audit web pages:
- **No Engine Cookies**: The Aviary engine does not store cookies on your system or transmit your local identity to target websites.
- **Isolated Target Browser Sessions**: To analyze a target web page, Aviary launches a fresh, isolated Chromium browser context using Playwright. Any cookies set by the audited target site during page execution remain strictly confined to that temporary browser context.
- **Session Discard**: Once the audit finishes and the browser context is closed, all session data and target cookies are automatically discarded. Aviary never extracts or saves target cookies into audit reports unless explicitly requested via raw header inspection flags.

## 3. Browser Local Storage & Client State

The Aviary documentation website uses **zero browser storage**:
- **Zero Local Storage (`localStorage`)**: We do not store theme preferences, navigation drawer state, or any other user settings in `localStorage`.
- **Zero Session Storage (`sessionStorage`)**: No session cache or transient data is persisted across tabs or page loads.
- **Zero IndexedDB / Web SQL**: No client-side database storage is initiated.

The documentation interface is completely stateless, rendered statically, and styled using CSS without writing to or reading from local browser storage mechanisms.

## 4. Verification and Browser Storage Inspection

Because Aviary Docs does not set cookies or local storage items, checking your browser developer tools (`F12` > **Application** or **Storage** > **Local Storage**) will show zero keys stored under `aviary-docs.vercel.app`.

## 5. Third-Party Links & Repositories

Our documentation links to third-party services such as [GitHub](https://github.com/Ru1vly/Aviary) and [npm](https://www.npmjs.com/package/@ru1vly/aviary). When you navigate to those third-party sites, they may set their own cookies according to their independent privacy and cookie policies.

## 6. Updates to This Policy

Any changes to this policy will be committed directly to our public repository and published here with an updated effective date.

## 7. Contact

If you have questions about our approach to cookies or browser storage, please open an issue on the [Aviary GitHub repository](https://github.com/Ru1vly/Aviary/issues).
