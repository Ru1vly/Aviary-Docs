import { describe, it, expect } from "vitest";

interface DocItem {
  id: string;
  title: string;
  description: string;
  htmlContent: string;
  headings: { level: number; title: string; id: string }[];
}

const MOCK_DOCS: Record<string, DocItem> = {
  quickstart: {
    id: "quickstart",
    title: "Quick start",
    description: "Install it, run your first audit, and wire it into your own code.",
    htmlContent: "<h1>Quick start</h1>",
    headings: [{ level: 2, title: "Install", id: "install" }],
  },
  "accuracy-limitations": {
    id: "accuracy-limitations",
    title: "Accuracy limitations",
    description: "Where checks can get it wrong, and why.",
    htmlContent: "<h1>Accuracy limitations</h1>",
    headings: [],
  },
  contributing: {
    id: "contributing",
    title: "Contributing & Support",
    description: "Guidelines for code contributions and support.",
    htmlContent: "<h1>Contributing & Support</h1>",
    headings: [],
  },
  roadmap: {
    id: "roadmap",
    title: "Roadmap",
    description: "Future roadmap and production readiness.",
    htmlContent: "<h1>Roadmap</h1>",
    headings: [],
  },
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    description: "Our privacy commitments.",
    htmlContent: "<h1>Privacy Policy</h1>",
    headings: [],
  },
  terms: {
    id: "terms",
    title: "Terms of Service",
    description: "Terms governing use.",
    htmlContent: "<h1>Terms of Service</h1>",
    headings: [],
  },
  cookies: {
    id: "cookies",
    title: "Cookie Policy",
    description: "Cookie information.",
    htmlContent: "<h1>Cookie Policy</h1>",
    headings: [],
  },
};

function resolveDoc(
  docs: Record<string, DocItem>,
  currentDocParam: string | null | undefined,
  initialDocId = "quickstart"
): DocItem {
  const activeDocId =
    currentDocParam && Object.hasOwn(docs, currentDocParam)
      ? currentDocParam
      : initialDocId;
  return (
    (Object.hasOwn(docs, activeDocId) ? docs[activeDocId] : undefined) ||
    docs["quickstart"] || {
      id: "quickstart",
      title: "Documentation",
      description: "",
      htmlContent: "",
      headings: [],
    }
  );
}

describe("docs routing and prototype safety", () => {
  describe("prototype safety with Object.hasOwn", () => {
    it("returns false for built-in Object prototype property keys", () => {
      expect(Object.hasOwn(MOCK_DOCS, "constructor")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "toString")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "valueOf")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "__proto__")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "hasOwnProperty")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "isPrototypeOf")).toBe(false);
    });

    it("distinguishes Object.hasOwn from naive in operator", () => {
      // "in" returns true for inherited prototype properties, which caused the bug
      expect("constructor" in MOCK_DOCS).toBe(true);
      expect("toString" in MOCK_DOCS).toBe(true);
      expect("valueOf" in MOCK_DOCS).toBe(true);

      // Object.hasOwn correctly prevents treating inherited methods as doc items
      expect(Object.hasOwn(MOCK_DOCS, "constructor")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "toString")).toBe(false);
      expect(Object.hasOwn(MOCK_DOCS, "valueOf")).toBe(false);
    });
  });

  describe("valid doc lookups", () => {
    it("successfully looks up all registered doc IDs", () => {
      const docKeys = [
        "quickstart",
        "accuracy-limitations",
        "contributing",
        "roadmap",
        "privacy",
        "terms",
        "cookies",
      ];

      for (const key of docKeys) {
        expect(Object.hasOwn(MOCK_DOCS, key)).toBe(true);
        const resolved = resolveDoc(MOCK_DOCS, key);
        expect(resolved.id).toBe(key);
      }
    });

    it("resolves specific doc item properties correctly", () => {
      const doc = resolveDoc(MOCK_DOCS, "contributing");
      expect(doc.title).toBe("Contributing & Support");
      expect(doc.htmlContent).toContain("Contributing & Support");
    });
  });

  describe("fallback and edge cases", () => {
    it("falls back to initialDocId or quickstart for prototype pollution attempts", () => {
      const maliciousKeys = ["constructor", "toString", "valueOf", "__proto__", "isPrototypeOf"];
      for (const key of maliciousKeys) {
        const resolved = resolveDoc(MOCK_DOCS, key);
        expect(resolved.id).toBe("quickstart");
        expect(resolved.title).toBe("Quick start");
      }
    });

    it("falls back to quickstart for nonexistent doc keys", () => {
      const resolved = resolveDoc(MOCK_DOCS, "does-not-exist");
      expect(resolved.id).toBe("quickstart");
    });

    it("handles null, undefined, or empty query parameter gracefully", () => {
      expect(resolveDoc(MOCK_DOCS, null).id).toBe("quickstart");
      expect(resolveDoc(MOCK_DOCS, undefined).id).toBe("quickstart");
      expect(resolveDoc(MOCK_DOCS, "").id).toBe("quickstart");
    });

    it("respects custom initialDocId when provided", () => {
      const resolved = resolveDoc(MOCK_DOCS, null, "contributing");
      expect(resolved.id).toBe("contributing");

      const invalidFallback = resolveDoc(MOCK_DOCS, "constructor", "contributing");
      expect(invalidFallback.id).toBe("contributing");
    });

    it("correctly identifies unknown doc query parameters for UI notice rendering", () => {
      const isUnknown = (param: string | null | undefined) =>
        Boolean(param && !Object.hasOwn(MOCK_DOCS, param));

      expect(isUnknown(null)).toBe(false);
      expect(isUnknown("")).toBe(false);
      expect(isUnknown("quickstart")).toBe(false);
      expect(isUnknown("contributing")).toBe(false);
      expect(isUnknown("nonexistent")).toBe(true);
      expect(isUnknown("constructor")).toBe(true);
      expect(isUnknown("__proto__")).toBe(true);
    });
  });
});
