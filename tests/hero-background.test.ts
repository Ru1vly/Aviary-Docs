import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("HeroBackground component and hero integration", () => {
  const componentPath = path.join(process.cwd(), "components", "HeroBackground.tsx");
  const homePagePath = path.join(process.cwd(), "app", "page.tsx");
  const globalsCssPath = path.join(process.cwd(), "app", "globals.css");

  it("exports HeroBackground component with proper 'use client' directive", () => {
    expect(fs.existsSync(componentPath)).toBe(true);
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("'use client'");
    expect(content).toContain("export default function HeroBackground");
  });

  it("configures non-blocking pointer-events for background canvas and container", () => {
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("pointerEvents: 'none'");
    expect(content).toContain("zIndex: 0");
    expect(content).toContain("aria-hidden=\"true\"");
  });

  it("handles DPR scaling, prefers-reduced-motion, and IntersectionObserver", () => {
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("Math.min(window.devicePixelRatio || 1, 2)");
    expect(content).toContain("prefers-reduced-motion: reduce");
    expect(content).toContain("IntersectionObserver");
    expect(content).toContain("cancelAnimationFrame");
  });

  it("embeds interactive mouse and touch pointer event handlers", () => {
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("pointermove");
    expect(content).toContain("pointerdown");
    expect(content).toContain("mouseleave");
  });

  it("integrates HeroBackground within home-hero section in app/page.tsx", () => {
    const homeContent = fs.readFileSync(homePagePath, "utf-8");
    expect(homeContent).toContain("import HeroBackground from '@/components/HeroBackground'");
    expect(homeContent).toContain("<HeroBackground />");
  });

  it("ensures .home-hero and .hero-copy maintain stacking contexts in app/globals.css", () => {
    const cssContent = fs.readFileSync(globalsCssPath, "utf-8");
    expect(cssContent).toMatch(/\.home-hero\s*\{[^}]*position:\s*relative/);
    expect(cssContent).toMatch(/\.home-hero\s*\{[^}]*overflow:\s*hidden/);
    expect(cssContent).toMatch(/\.hero-copy\s*\{[^}]*position:\s*relative/);
    expect(cssContent).toMatch(/\.hero-copy\s*\{[^}]*z-index:\s*1/);
  });

  it("includes dual-layer SVG static pattern for zero-flash SSR and static exports", () => {
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("<pattern id=\"hero-dot-matrix\"");
    expect(content).toContain("<radialGradient id=\"hero-mask-grad\"");
    expect(content).toContain("mask=\"url(#hero-dot-mask)\"");
  });

  it("implements click/tap shockwave pulse and responsive grid spacing", () => {
    const content = fs.readFileSync(componentPath, "utf-8");
    expect(content).toContain("clickPulse");
    expect(content).toContain("width < 768 ? 20 : 24");
    expect(content).toContain("ResizeObserver");
  });
});
