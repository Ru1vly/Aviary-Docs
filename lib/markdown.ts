import { marked, Tokens } from 'marked';

// Custom renderer object matching the new typescript types in marked v12+
const customRenderer = {
  blockquote(this: any, token: Tokens.Blockquote): string {
    const body = this.parser.parse(token.tokens);
    
    // GFM Alert pattern matching
    // It could be wrapped in <p> tag by marked
    const alertRegex = /^\s*<p>\s*\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION)\]\s*(?:<br\s*\/?>)?\s*([\s\S]*)<\/p>\s*$/i;
    const match = body.match(alertRegex);

    if (match) {
      const type = match[1].toUpperCase();
      const content = match[2];

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

      const style = styles[type];
      return `
        <div class="my-6 p-4 rounded border-l-2 ${style.border} ${style.bg} ${style.text}">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] font-medium mb-2">
            ${style.icon}
            <span>${style.title}</span>
          </div>
          <div class="text-sm leading-relaxed font-mono">${content}</div>
        </div>
      `;
    }

    return `<blockquote class="border-l-2 border-[color:var(--line-strong)] pl-4 italic my-6 text-[color:var(--text-muted)]">${body}</blockquote>`;
  },

  code(this: any, token: Tokens.Code): string {
    const escapedCode = token.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    return `
      <div class="code-block my-6 overflow-hidden rounded border border-[color:var(--line-hairline)] bg-[#070807] font-mono text-[13px] text-[color:var(--text-body)]">
        <div class="flex items-center justify-between bg-[color:var(--surface-sunken)] px-4 py-2 border-b border-[color:var(--line-hairline)]">
          <span class="text-[10px] text-[color:var(--text-faint)] tracking-[0.14em] uppercase">${token.lang || 'code'}</span>
          <button
            data-copy-text="${escapedCode}"
            class="flex items-center gap-1.5 rounded border border-[color:var(--line-strong)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <pre class="p-4 overflow-x-auto leading-relaxed font-mono"><code class="language-${token.lang || 'none'}">${escapedCode}</code></pre>
      </div>
    `;
  },

  heading(this: any, token: Tokens.Heading): string {
    const id = token.raw
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const headingHtml = this.parser.parseInline(token.tokens);

    return `
      <h${token.depth} id="${id}" class="scroll-mt-24 group relative">
        <a href="#${id}" class="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#E0B15A] font-normal pr-2">#</a>
        ${headingHtml}
      </h${token.depth}>
    `;
  }
};

marked.use({
  renderer: customRenderer,
  useNewRenderer: true,
  gfm: true,
  breaks: true
});

export function parseMarkdownToHtml(markdown: string): string {
  return marked.parse(markdown) as string;
}
