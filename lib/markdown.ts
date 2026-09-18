import { Marked, marked, type Tokens } from 'marked';

export interface HeadingItem {
  level: number;
  title: string;
  id: string;
}

export function deduplicateSlug(baseSlug: string, slugCounts: Map<string, number>): string {
  const count = slugCounts.get(baseSlug) || 0;
  slugCounts.set(baseSlug, count + 1);
  return count === 0 ? baseSlug : `${baseSlug}-${count}`;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const preSanitized = sanitizeDangerousHtml(markdown);
  const tokens = marked.lexer(preSanitized);
  const headings: HeadingItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const token of tokens) {
    if (token.type === 'heading' && (token.depth === 2 || token.depth === 3)) {
      const baseSlug = slugifyHeading(token.text);
      const id = deduplicateSlug(baseSlug, slugCounts);
      const title = token.text.replace(/\*\*|`|✅|❌/g, '').trim();
      headings.push({ level: token.depth, title, id });
    }
  }

  return headings;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  // Anchors and query params are safe
  if (trimmed.startsWith('#') || trimmed.startsWith('?')) {
    return true;
  }

  // Check scheme
  const firstColon = trimmed.indexOf(':');
  if (firstColon === -1) {
    return true; // Relative path without scheme
  }

  const firstSlash = trimmed.indexOf('/');
  const firstHash = trimmed.indexOf('#');
  const firstQuestion = trimmed.indexOf('?');

  // If a slash, hash, or question mark appears before colon, colon is within path/fragment/query
  if (firstSlash !== -1 && firstSlash < firstColon) return true;
  if (firstHash !== -1 && firstHash < firstColon) return true;
  if (firstQuestion !== -1 && firstQuestion < firstColon) return true;

  const scheme = trimmed.slice(0, firstColon).toLowerCase().replace(/[\s\x00-\x1f]/g, '');
  return scheme === 'http' || scheme === 'https' || scheme === 'mailto';
}

export function sanitizeDangerousHtml(html: string): string {
  if (!html) return '';

  let sanitized = html;

  // 1. Remove dangerous paired tags and their inner content: script, style, iframe, object, embed, applet
  const dangerousPairedTags = ['script', 'style', 'iframe', 'object', 'embed', 'applet'];
  for (const tag of dangerousPairedTags) {
    const regex = new RegExp('<' + tag + '[^>]*>[\\s\\S]*?<\\/' + tag + '>', 'gi');
    sanitized = sanitized.replace(regex, '');
    const strayRegex = new RegExp('<\\/?' + tag + '[^>]*>', 'gi');
    sanitized = sanitized.replace(strayRegex, '');
  }

  // 2. Remove dangerous standalone/void tags: meta, link, base
  sanitized = sanitized.replace(/<\/?(meta|link|base)[^>]*>/gi, '');

  // 3. Remove event handler attributes (on*) and dangerous URL schemes in attributes
  sanitized = sanitized.replace(/<([a-zA-Z0-9_-]+)([^>]*)>/gi, (match, tagName, attrs) => {
    // Remove all inline event handlers (quoted and unquoted)
    let cleanAttrs = attrs.replace(/\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

    // Sanitize URL-bearing attributes: href, src, action, formaction, data
    cleanAttrs = cleanAttrs.replace(/\s+(href|src|action|formaction|data)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi, (attrMatch: string, attrName: string, q1?: string, q2?: string, unquoted?: string) => {
      const rawVal = q1 ?? q2 ?? unquoted ?? '';
      // Decode HTML entities (numeric and common named) and remove control characters/whitespace
      const decoded = rawVal
        .replace(/&#x([0-9a-f]+);?/gi, (_: string, hex: string) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#([0-9]+);?/g, (_: string, dec: string) => String.fromCharCode(parseInt(dec, 10)))
        .replace(/&colon;/gi, ':')
        .replace(/[\s\x00-\x1f]/g, '');

      if (!isSafeUrl(decoded)) {
        return ` ${attrName}="#"`;
      }
      return attrMatch;
    });

    return '<' + tagName + cleanAttrs + '>';
  });

  return sanitized;
}

// Custom renderer factory matching the new typescript types in marked v12+
export function createCustomRenderer(slugCounts?: Map<string, number>, customBasePath?: string) {
  const localSlugCounts = slugCounts ?? new Map<string, number>();

  return {
    blockquote(this: any, token: Tokens.Blockquote): string {
      const body = this.parser.parse(token.tokens);
      
      // GFM Alert pattern matching
      // Handle alerts with single paragraph, multiple paragraphs, lists, or code blocks
      const alertRegex = /^\s*<p>\s*\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION)\]\s*(?:<br\s*\/?>)?\s*/i;
      const match = body.match(alertRegex);

      if (match) {
        const type = match[1].toUpperCase();
        let innerContent = body.slice(match[0].length);

        if (innerContent.startsWith('</p>')) {
          innerContent = innerContent.slice(4).trim();
        } else {
          innerContent = `<p>${innerContent}`;
        }

        const styles: Record<string, { border: string; bg: string; text: string; title: string; icon: string }> = {
          NOTE: {
            border: 'border-[#7FA8BD]',
            bg: 'bg-[#7FA8BD]/[0.08]',
            text: 'text-[#E6E3DA]',
            title: 'Note',
            icon: `<svg class="w-5 h-5 text-[#7FA8BD] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
          },
          TIP: {
            border: 'border-[#8FBE7C]',
            bg: 'bg-[#8FBE7C]/[0.08]',
            text: 'text-[#E6E3DA]',
            title: 'Tip',
            icon: `<svg class="w-5 h-5 text-[#8FBE7C] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`
          },
          IMPORTANT: {
            border: 'border-[#A98BB0]',
            bg: 'bg-[#A98BB0]/[0.08]',
            text: 'text-[#E6E3DA]',
            title: 'Important',
            icon: `<svg class="w-5 h-5 text-[#A98BB0] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
          },
          WARNING: {
            border: 'border-[#E0B15A]',
            bg: 'bg-[#E0B15A]/[0.08]',
            text: 'text-[#E6E3DA]',
            title: 'Warning',
            icon: `<svg class="w-5 h-5 text-[#E0B15A] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`
          },
          CAUTION: {
            border: 'border-[#D9694C]',
            bg: 'bg-[#D9694C]/[0.08]',
            text: 'text-[#E6E3DA]',
            title: 'Caution',
            icon: `<svg class="w-5 h-5 text-[#D9694C] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>`
          }
        };

        const style = styles[type] || styles.NOTE;
        return `
          <div class="my-6 p-4 rounded border-l-2 ${style.border} ${style.bg} ${style.text}">
            <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] font-medium mb-2">
              ${style.icon}
              <span>${style.title}</span>
            </div>
            <div class="text-sm leading-relaxed">${innerContent}</div>
          </div>
        `;
      }

      return `<blockquote class="border-l-2 border-[color:var(--line-strong)] pl-4 italic my-6 text-[color:var(--text-muted)]">${body}</blockquote>`;
    },

    code(this: any, token: Tokens.Code): string {
      const escapedCode = escapeHtml(token.text);
      const rawLang = token.lang ? token.lang.trim() : '';
      const safeLang = escapeHtml(rawLang.split(/\s+/)[0] || '');
      const displayLang = escapeHtml(rawLang || 'code');

      return `
        <div class="code-block my-6 overflow-hidden rounded border border-[color:var(--line-hairline)] bg-[#070807] font-mono text-[13px] text-[color:var(--text-body)]">
          <div class="flex items-center justify-between bg-[color:var(--surface-sunken)] px-4 py-2 border-b border-[color:var(--line-hairline)]">
            <span class="text-[10px] text-[color:var(--text-faint)] tracking-[0.14em] uppercase">${displayLang}</span>
            <button
              type="button"
              data-copy-text="${escapedCode}"
              aria-label="Copy code to clipboard"
              class="flex items-center gap-1.5 rounded border border-[color:var(--line-strong)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
              <span>Copy</span>
            </button>
          </div>
          <pre class="p-4 overflow-x-auto leading-relaxed font-mono"><code class="language-${safeLang || 'none'}">${escapedCode}</code></pre>
        </div>
      `;
    },

    heading(this: any, token: Tokens.Heading): string {
      const baseSlug = slugifyHeading(token.text);
      const id = deduplicateSlug(baseSlug, localSlugCounts);
      const headingHtml = this.parser.parseInline(token.tokens);

      return `
        <h${token.depth} id="${id}" class="scroll-mt-24 group relative">
          <a href="#${id}" class="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-[#E0B15A] transition-opacity text-[#E0B15A] font-normal pr-2" aria-label="Link to section">#</a>
          ${headingHtml}
        </h${token.depth}>
      `;
    },

    link(this: any, token: Tokens.Link): string {
      const rawHref = (token.href || '').trim();
      const text = this.parser ? this.parser.parseInline(token.tokens) : (token.text || '');
      const titleAttr = token.title ? ` title="${escapeHtml(token.title)}"` : '';

      if (!isSafeUrl(rawHref)) {
        return `<a href="#" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
      }

      const isExternal = /^https?:\/\//i.test(rawHref) || rawHref.startsWith('//');
      let finalHref = rawHref;

      if (!isExternal && !finalHref.startsWith('#') && !finalHref.startsWith('mailto:')) {
        const rawBasePath = customBasePath !== undefined ? customBasePath : (process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/Aviary-Docs' : ''));
        const basePath = rawBasePath.replace(/\/+$/, '');

        const mdMatch = finalHref.match(/^\.?\/?([a-zA-Z0-9_-]+)\.md(#.*)?$/);
        if (mdMatch) {
          const docName = mdMatch[1];
          const hash = mdMatch[2] || '';
          finalHref = `/docs?doc=${docName}${hash}`;
        }

        if (basePath && finalHref.startsWith('/') && !finalHref.startsWith('//')) {
          if (!finalHref.startsWith(basePath + '/') && finalHref !== basePath) {
            finalHref = `${basePath}${finalHref}`;
          }
        }
      }

      const escapedHref = escapeHtml(finalHref);
      if (isExternal) {
        return `<a href="${escapedHref}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
      }

      return `<a href="${escapedHref}"${titleAttr}>${text}</a>`;
    },

    html(this: any, token: Tokens.HTML | Tokens.Tag): string {
      const raw = typeof token === 'string' ? token : (token.raw || token.text || '');
      return sanitizeDangerousHtml(raw);
    }
  };
}

const defaultRenderer = createCustomRenderer();
marked.use({
  renderer: defaultRenderer,
  useNewRenderer: true,
  gfm: true,
  breaks: true
});

export function parseMarkdownToHtml(markdown: string, customBasePath?: string): string {
  const preSanitized = sanitizeDangerousHtml(markdown);
  const slugCounts = new Map<string, number>();
  const instance = new Marked({
    renderer: createCustomRenderer(slugCounts, customBasePath),
    useNewRenderer: true,
    gfm: true,
    breaks: true
  });
  const parsed = instance.parse(preSanitized) as string;
  return sanitizeDangerousHtml(parsed);
}
