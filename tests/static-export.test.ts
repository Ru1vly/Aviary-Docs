import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { describe, it, expect, beforeAll } from "vitest";

describe("static export output validation", () => {
  const outDir = path.join(process.cwd(), "out");
  const canonicalBaseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN
      ? "https://ru1vly.github.io/Aviary-Docs"
      : "https://www.aviary-rs.com")
  ).replace(/\/+$/, "");

  beforeAll(() => {
    // If out directory is not present, trigger build
    if (!fs.existsSync(outDir) || !fs.existsSync(path.join(outDir, "index.html"))) {
      execSync("npm run build", { stdio: "pipe", cwd: process.cwd() });
    }
  }, 60000);

  it("exports root index.html with HTML doctype and page structure", () => {
    const indexPath = path.join(outDir, "index.html");
    expect(fs.existsSync(indexPath), "out/index.html should exist").toBe(true);

    const html = fs.readFileSync(indexPath, "utf8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Aviary");
  });

  it("exports docs as docs/index.html directory structure due to trailingSlash: true", () => {
    // trailingSlash: true ensures docs/index.html exists instead of docs.html
    const docsDirIndex = path.join(outDir, "docs", "index.html");
    expect(
      fs.existsSync(docsDirIndex),
      "out/docs/index.html must exist to prevent 404s on static servers"
    ).toBe(true);

    const docsFlatFile = path.join(outDir, "docs.html");
    expect(
      fs.existsSync(docsFlatFile),
      "out/docs.html should not exist when trailingSlash is true"
    ).toBe(false);

    const html = fs.readFileSync(docsDirIndex, "utf8");
    expect(html).toContain("<!DOCTYPE html>");
  });

  it("generates sitemap.xml with pre-rendered documentation routes", () => {
    const sitemapPath = path.join(outDir, "sitemap.xml");
    expect(fs.existsSync(sitemapPath), "out/sitemap.xml should exist").toBe(true);

    const content = fs.readFileSync(sitemapPath, "utf8");
    expect(content).toContain("<urlset");
    expect(content).toContain("/docs/quickstart/");
    expect(content).toContain("/docs/accuracy-limitations/");
    expect(content).not.toContain("/docs?doc=");
  });

  it("exports each documentation page with its own initial HTML content", () => {
    const docs = [
      ["quickstart", "Quick start"],
      ["accuracy-limitations", "Accuracy limitations"],
      ["contributing", "Contributing &amp; Support"],
      ["roadmap", "Roadmap &amp; Production Readiness"],
      ["privacy", "Privacy Policy"],
      ["terms", "Terms of Service"],
      ["cookies", "Cookie Policy"],
    ];

    for (const [id, title] of docs) {
      const pagePath = path.join(outDir, "docs", id, "index.html");
      expect(fs.existsSync(pagePath), `out/docs/${id}/index.html should exist`).toBe(true);
      const html = fs.readFileSync(pagePath, "utf8");
      expect(html).toContain(`<h1`);
      expect(html).toContain(title);
      expect(html).toContain(`rel="canonical" href="${canonicalBaseUrl}/docs/${id}/"`);
    }
  });

  it("generates robots.txt with valid directives and sitemap reference", () => {
    const robotsPath = path.join(outDir, "robots.txt");
    expect(fs.existsSync(robotsPath), "out/robots.txt should exist").toBe(true);

    const content = fs.readFileSync(robotsPath, "utf8");
    expect(content.toLowerCase()).toContain("user-agent: *");
    expect(content).toContain("sitemap.xml");
  });

  it("generates valid manifest.webmanifest with expected properties", () => {
    const manifestPath = path.join(outDir, "manifest.webmanifest");
    expect(fs.existsSync(manifestPath), "out/manifest.webmanifest should exist").toBe(true);

    const content = fs.readFileSync(manifestPath, "utf8");
    const json = JSON.parse(content);
    expect(json.name).toBe("Aviary | Automated Website Auditing");
    expect(json.short_name).toBe("Aviary");
    expect(json.start_url).toBeDefined();
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBeGreaterThanOrEqual(1);
  });

  it("copies public static assets to export directory", () => {
    expect(fs.existsSync(path.join(outDir, "icon.svg"))).toBe(true);
    expect(fs.existsSync(path.join(outDir, "favicon.ico"))).toBe(true);
    expect(fs.existsSync(path.join(outDir, "apple-touch-icon.png"))).toBe(true);
    expect(fs.existsSync(path.join(outDir, ".nojekyll")), "out/.nojekyll should exist for GitHub Pages static hosting").toBe(true);
    expect(fs.existsSync(path.join(outDir, "og-image.png")), "out/og-image.png should exist for social card unfurling").toBe(true);
    expect(fs.existsSync(path.join(outDir, "og-square.png")), "out/og-square.png should exist for square social thumbnails").toBe(true);
  });
});
