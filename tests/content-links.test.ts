import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import { slugifyHeading } from "../lib/markdown";

describe("content links and anchors integrity", () => {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  const docHeadingsMap = new Map<string, Set<string>>();

  // Populate heading map for each document
  for (const file of files) {
    const docName = file.replace(/\.md$/, "");
    const rawContent = fs.readFileSync(path.join(contentDir, file), "utf8");
    const headings = new Set<string>();

    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(rawContent)) !== null) {
      const headingText = match[2].trim();
      const slug = slugifyHeading(headingText);
      headings.add(slug);
    }
    docHeadingsMap.set(docName, headings);
  }

  it("finds all expected core documentation markdown files", () => {
    const expectedDocs = [
      "quickstart",
      "accuracy-limitations",
      "contributing",
      "roadmap",
      "privacy",
      "terms",
      "cookies",
    ];

    for (const doc of expectedDocs) {
      expect(docHeadingsMap.has(doc), `Expected content/${doc}.md to exist`).toBe(true);
    }
  });

  for (const file of files) {
    const docName = file.replace(/\.md$/, "");

    it(`verifies all internal links and anchors in ${file} resolve to valid targets`, () => {
      const rawContent = fs.readFileSync(path.join(contentDir, file), "utf8");
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      const brokenLinks: { linkText: string; href: string; reason: string }[] = [];

      while ((match = linkRegex.exec(rawContent)) !== null) {
        const linkText = match[1];
        const href = match[2].trim();

        // Skip external protocols
        if (
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("mailto:")
        ) {
          continue;
        }

        let targetDoc = docName;
        let anchor = "";

        if (href.startsWith("#")) {
          anchor = href.slice(1);
        } else {
          const [rawPath, rawAnchor] = href.split("#");
          anchor = rawAnchor || "";

          if (rawPath === "/docs" || rawPath === "/docs/") {
            targetDoc = "quickstart";
          } else if (rawPath.startsWith("/docs?doc=")) {
            targetDoc = rawPath.replace("/docs?doc=", "");
          } else if (rawPath.endsWith(".md")) {
            targetDoc = rawPath.replace(/^\.?\/?/, "").replace(/\.md$/, "");
          } else if (rawPath === "/" || rawPath === "") {
            targetDoc = "home";
          } else {
            targetDoc = rawPath;
          }
        }

        // Validate target document
        if (targetDoc !== "home") {
          if (!docHeadingsMap.has(targetDoc)) {
            brokenLinks.push({
              linkText,
              href,
              reason: `Target document "${targetDoc}" not found in content/`,
            });
            continue;
          }

          // Validate anchor if present
          if (anchor) {
            const headings = docHeadingsMap.get(targetDoc);
            if (!headings || !headings.has(anchor)) {
              brokenLinks.push({
                linkText,
                href,
                reason: `Anchor "#${anchor}" not found in document "${targetDoc}"`,
              });
            }
          }
        }
      }

      expect(
        brokenLinks,
        `Found broken links in ${file}: ${JSON.stringify(brokenLinks, null, 2)}`
      ).toEqual([]);
    });
  }
});
