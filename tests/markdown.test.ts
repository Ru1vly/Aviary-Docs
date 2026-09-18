import { describe, it, expect } from "vitest";
import {
  slugifyHeading,
  isSafeUrl,
  sanitizeDangerousHtml,
  parseMarkdownToHtml,
  extractHeadings,
  deduplicateSlug,
} from "../lib/markdown";

describe("markdown utilities", () => {
  describe("slugifyHeading", () => {
    it("converts titles to lowercase slug", () => {
      expect(slugifyHeading("Quick Start")).toBe("quick-start");
      expect(slugifyHeading("Overview of Features")).toBe("overview-of-features");
    });

    it("removes special characters and extra punctuation", () => {
      expect(slugifyHeading("Code & Architecture (v1.0!)")).toBe("code-architecture-v10");
      expect(slugifyHeading("What is Aviary?")).toBe("what-is-aviary");
    });

    it("handles multiple consecutive spaces and underscores", () => {
      expect(slugifyHeading("foo   bar___baz")).toBe("foo-bar-baz");
    });

    it("trims leading and trailing hyphens", () => {
      expect(slugifyHeading("-Section-Title-")).toBe("section-title");
    });

    it("handles headings starting with numbers", () => {
      expect(slugifyHeading("1. Contributing by Coding")).toBe("1-contributing-by-coding");
    });
  });

  describe("isSafeUrl", () => {
    it("allows safe http, https, and mailto schemes", () => {
      expect(isSafeUrl("https://aviary-docs.vercel.app")).toBe(true);
      expect(isSafeUrl("http://example.com")).toBe(true);
      expect(isSafeUrl("mailto:support@example.com")).toBe(true);
    });

    it("allows safe relative paths and fragment anchors", () => {
      expect(isSafeUrl("/docs")).toBe(true);
      expect(isSafeUrl("./quickstart.md")).toBe(true);
      expect(isSafeUrl("#installation")).toBe(true);
      expect(isSafeUrl("?tab=settings")).toBe(true);
    });

    it("blocks dangerous protocols like javascript, vbscript, and data", () => {
      expect(isSafeUrl("javascript:alert(1)")).toBe(false);
      expect(isSafeUrl("JAVASCRIPT:alert(1)")).toBe(false);
      expect(isSafeUrl("vbscript:msgbox(1)")).toBe(false);
      expect(isSafeUrl("data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==")).toBe(false);
    });

    it("handles empty and whitespace strings", () => {
      expect(isSafeUrl("")).toBe(false);
      expect(isSafeUrl("   ")).toBe(false);
    });
  });

  describe("sanitizeDangerousHtml", () => {
    it("strips <script> tags and their contents", () => {
      const malicious = "<p>Safe</p><script>alert(\"xss\")</script><p>Text</p>";
      expect(sanitizeDangerousHtml(malicious)).toBe("<p>Safe</p><p>Text</p>");
    });

    it("strips inline on* event handler attributes like onerror, onclick, onload", () => {
      const maliciousImg = "<img src=\"x\" onerror=\"alert(1)\">";
      expect(sanitizeDangerousHtml(maliciousImg)).not.toContain("onerror");
      expect(sanitizeDangerousHtml(maliciousImg)).toBe("<img src=\"x\">");

      const maliciousButton = "<button onclick=\"runPayload()\">Click</button>";
      expect(sanitizeDangerousHtml(maliciousButton)).not.toContain("onclick");
    });

    it("neutralizes javascript: in href and src attributes", () => {
      const maliciousLink = "<a href=\"javascript:alert(1)\">Click</a>";
      expect(sanitizeDangerousHtml(maliciousLink)).not.toContain("javascript:");
      expect(sanitizeDangerousHtml(maliciousLink)).toContain("href=\"#\"");

      const unquotedLink = "<a href=javascript:alert(1)>Click</a>";
      expect(sanitizeDangerousHtml(unquotedLink)).not.toContain("javascript:");
      expect(sanitizeDangerousHtml(unquotedLink)).toContain("href=\"#\"");

      const svgDataLink = "<a href=\"data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9YWxlcnQoMSk+\">Click</a>";
      expect(sanitizeDangerousHtml(svgDataLink)).not.toContain("data:image/svg");
      expect(sanitizeDangerousHtml(svgDataLink)).toContain("href=\"#\"");

      const entityLink = "<a href=\"&#106;avascript:alert(1)\">Click</a>";
      expect(sanitizeDangerousHtml(entityLink)).not.toContain("&#106;avascript:");
      expect(sanitizeDangerousHtml(entityLink)).toContain("href=\"#\"");
    });

    it("strips dangerous embedded elements: iframe, style, object, embed", () => {
      const iframe = "<iframe src=\"https://attacker.com\"></iframe>";
      expect(sanitizeDangerousHtml(iframe)).toBe("");

      const styleTag = "<style>body { display: none; }</style>";
      expect(sanitizeDangerousHtml(styleTag)).toBe("");
    });
  });

  describe("parseMarkdownToHtml", () => {
    it("renders basic markdown headings, lists, and code blocks", () => {
      const md = "## Installation\n\n- Step 1\n- Step 2";
      const html = parseMarkdownToHtml(md);
      expect(html).toContain("<h2 id=\"installation\"");
      expect(html).toContain("Step 1");
      expect(html).toContain("Step 2");
    });

    it("strips dangerous scripts embedded in raw markdown", () => {
      const md = "Hello <script>alert(\"xss\")</script> World";
      const html = parseMarkdownToHtml(md);
      expect(html).not.toContain("<script>");
      expect(html).not.toContain("alert");
      expect(html).toContain("Hello  World");
    });

    it("converts markdown doc links to /docs?doc= URLs", () => {
      const prevEnv = {
        GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
        BASE_PATH: process.env.BASE_PATH,
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
      };
      try {
        delete process.env.GITHUB_ACTIONS;
        delete process.env.BASE_PATH;
        delete process.env.NEXT_PUBLIC_BASE_PATH;

        const md = "[Quick Start](quickstart.md) and [Contributing](contributing.md#code)";
        const html = parseMarkdownToHtml(md);
        expect(html).toContain("href=\"/docs?doc=quickstart\"");
        expect(html).toContain("href=\"/docs?doc=contributing#code\"");
      } finally {
        if (prevEnv.GITHUB_ACTIONS !== undefined) process.env.GITHUB_ACTIONS = prevEnv.GITHUB_ACTIONS;
        else delete process.env.GITHUB_ACTIONS;
        if (prevEnv.BASE_PATH !== undefined) process.env.BASE_PATH = prevEnv.BASE_PATH;
        else delete process.env.BASE_PATH;
        if (prevEnv.NEXT_PUBLIC_BASE_PATH !== undefined) process.env.NEXT_PUBLIC_BASE_PATH = prevEnv.NEXT_PUBLIC_BASE_PATH;
        else delete process.env.NEXT_PUBLIC_BASE_PATH;
      }
    });

    it("prepends basePath when NEXT_PUBLIC_BASE_PATH is configured", () => {
      const prevEnv = {
        GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
        BASE_PATH: process.env.BASE_PATH,
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
      };
      try {
        delete process.env.GITHUB_ACTIONS;
        delete process.env.BASE_PATH;
        process.env.NEXT_PUBLIC_BASE_PATH = "/Aviary-Docs";
        const md = "[Quick Start](quickstart.md)";
        const html = parseMarkdownToHtml(md);
        expect(html).toContain("href=\"/Aviary-Docs/docs?doc=quickstart\"");
      } finally {
        if (prevEnv.GITHUB_ACTIONS !== undefined) process.env.GITHUB_ACTIONS = prevEnv.GITHUB_ACTIONS;
        else delete process.env.GITHUB_ACTIONS;
        if (prevEnv.BASE_PATH !== undefined) process.env.BASE_PATH = prevEnv.BASE_PATH;
        else delete process.env.BASE_PATH;
        if (prevEnv.NEXT_PUBLIC_BASE_PATH !== undefined) process.env.NEXT_PUBLIC_BASE_PATH = prevEnv.NEXT_PUBLIC_BASE_PATH;
        else delete process.env.NEXT_PUBLIC_BASE_PATH;
      }
    });

    it("prepends customBasePath when passed as argument to parseMarkdownToHtml", () => {
      const md = "[Quick Start](quickstart.md)";
      const html = parseMarkdownToHtml(md, "/Custom-Path");
      expect(html).toContain("href=\"/Custom-Path/docs?doc=quickstart\"");
    });

    it("adds accessible keyboard focus styling to heading anchors", () => {
      const md = "## My Heading";
      const html = parseMarkdownToHtml(md);
      expect(html).toContain("focus:opacity-100");
      expect(html).toContain("focus:outline-none");
      expect(html).toContain("focus:ring-1");
      expect(html).toContain("focus:ring-[#E0B15A]");
    });

    it("deduplicates identical heading IDs with sequential numerical suffixes", () => {
      const md = "## Overview\n\nContent 1\n\n## Overview\n\nContent 2\n\n## Overview\n\nContent 3";
      const html = parseMarkdownToHtml(md);
      expect(html).toContain("<h2 id=\"overview\"");
      expect(html).toContain("<h2 id=\"overview-1\"");
      expect(html).toContain("<h2 id=\"overview-2\"");
    });
  });

  describe("deduplicateSlug", () => {
    it("returns base slug on first occurrence and appends sequential counts thereafter", () => {
      const slugCounts = new Map<string, number>();
      expect(deduplicateSlug("section", slugCounts)).toBe("section");
      expect(deduplicateSlug("section", slugCounts)).toBe("section-1");
      expect(deduplicateSlug("section", slugCounts)).toBe("section-2");
      expect(deduplicateSlug("other", slugCounts)).toBe("other");
    });
  });

  describe("extractHeadings", () => {
    it("extracts h2 and h3 headings and ignores h1 and h4+", () => {
      const md = "# Doc Title\n\n## Section 1\n\n### Sub 1.1\n\n#### Detail\n\n## Section 2";
      const headings = extractHeadings(md);
      expect(headings).toHaveLength(3);
      expect(headings[0]).toEqual({ level: 2, title: "Section 1", id: "section-1" });
      expect(headings[1]).toEqual({ level: 3, title: "Sub 1.1", id: "sub-11" });
      expect(headings[2]).toEqual({ level: 2, title: "Section 2", id: "section-2" });
    });

    it("ignores comments and symbols inside code blocks", () => {
      const md = "## Real Heading\n\n```bash\n## Not a heading\n### Also not a heading\n```\n\n### Another Heading";
      const headings = extractHeadings(md);
      expect(headings).toHaveLength(2);
      expect(headings[0].title).toBe("Real Heading");
      expect(headings[1].title).toBe("Another Heading");
    });

    it("deduplicates heading slugs consistently with parseMarkdownToHtml", () => {
      const md = "## Options\n\nText\n\n## Options\n\nMore text";
      const headings = extractHeadings(md);
      const html = parseMarkdownToHtml(md);

      expect(headings[0].id).toBe("options");
      expect(headings[1].id).toBe("options-1");
      expect(html).toContain(`<h2 id="${headings[0].id}"`);
      expect(html).toContain(`<h2 id="${headings[1].id}"`);
    });

    it("cleans bold, backticks, and emojis from heading titles", () => {
      const md = "## **Bold Title** with `code` ✅ and ❌";
      const headings = extractHeadings(md);
      expect(headings[0].title).toBe("Bold Title with code  and");
    });
  });
});
