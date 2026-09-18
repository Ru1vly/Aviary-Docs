'use client';

import React, { useEffect, useState } from 'react';

interface DocsClientWrapperProps {
  children: React.ReactNode;
}

const COPY_ICON_SVG = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>';
const CHECK_ICON_SVG = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';

export default function DocsClientWrapper({ children }: DocsClientWrapperProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Post-hydration hash scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const rawId = decodeURIComponent(window.location.hash.slice(1));
        const el = document.getElementById(rawId) || (window.CSS && CSS.escape ? document.querySelector(`#${CSS.escape(rawId)}`) : null);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error('Failed to scroll to hash anchor:', err);
      }
    }
  }, [children]);

  useEffect(() => {
    // 1. Copy to clipboard handler using event delegation
    const handleCopyClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest('[data-copy-text]') as HTMLElement | null;
      if (!button) return;

      const text = button.getAttribute('data-copy-text');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const span = button.querySelector('span');
        const svg = button.querySelector('svg');

        if (span) span.innerText = 'Copied!';
        if (svg) svg.innerHTML = CHECK_ICON_SVG;
        button.classList.add('bg-[#8FBE7C]/20', 'text-[#8FBE7C]');

        const existingTimeout = button.getAttribute('data-copy-timeout');
        if (existingTimeout) {
          clearTimeout(Number(existingTimeout));
        }

        const timeoutId = window.setTimeout(() => {
          if (span) span.innerText = 'Copy';
          if (svg) svg.innerHTML = COPY_ICON_SVG;
          button.classList.remove('bg-[#8FBE7C]/20', 'text-[#8FBE7C]');
          button.removeAttribute('data-copy-timeout');
        }, 2000);

        button.setAttribute('data-copy-timeout', String(timeoutId));
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    document.addEventListener('click', handleCopyClick);

    // 2. Scroll Spy logic for active heading highlighting
    const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'));

    const updateActiveHeading = () => {
      if (window.scrollY < 50) {
        setActiveId('');
        return;
      }

      const scrollPos = window.scrollY + 120;
      let currentActive = '';

      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPos >= top) {
          currentActive = el.id;
        } else {
          break;
        }
      }

      setActiveId(currentActive);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = () => {
      updateActiveHeading();
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    headingElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', updateActiveHeading, { passive: true });

    // Initial check on mount
    updateActiveHeading();

    // Custom class for styling lists and tables inside markdown content
    const styleMarkdownLists = () => {
      const checkboxes = document.querySelectorAll('.prose input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.className = 'w-4 h-4 rounded mr-2 inline-block accent-[#E0B15A]';
      });
    };

    styleMarkdownLists();

    return () => {
      document.removeEventListener('click', handleCopyClick);
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveHeading);
    };
  }, [children]);

  // Expose active ID by updating TOC links; removes .active from all when !activeId
  useEffect(() => {
    const tocLinks = document.querySelectorAll('aside a[href^="#"]');
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (activeId && href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [activeId]);

  return <div className="docs-content-wrapper">{children}</div>;
}
