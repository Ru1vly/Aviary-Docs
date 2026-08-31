'use client';

import React, { useEffect, useState } from 'react';

interface DocsClientWrapperProps {
  children: React.ReactNode;
}

export default function DocsClientWrapper({ children }: DocsClientWrapperProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 1. Copy to clipboard handler using event delegation
    const handleCopyClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest('[data-copy-text]');
      if (!button) return;

      const text = button.getAttribute('data-copy-text');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const span = button.querySelector('span');
        const originalText = span ? span.innerText : 'Copy';
        
        if (span) span.innerText = 'Copied!';
        button.classList.add('bg-[#8FBE7C]/20', 'text-[#8FBE7C]');

        setTimeout(() => {
          if (span) span.innerText = originalText;
          button.classList.remove('bg-[#8FBE7C]/20', 'text-[#8FBE7C]');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    document.addEventListener('click', handleCopyClick);

    // 2. Scroll Spy logic for active heading highlighting
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    headingElements.forEach((el) => observer.observe(el));

    // Fallback scroll listener for smooth hash clicks or manual scrolling
    const handleScroll = () => {
      if (window.scrollY === 0) {
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
      
      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check on mount
    handleScroll();

    // Custom class for styling lists and tables inside markdown content
    const styleMarkdownLists = () => {
      // Style checklist checkboxes specifically
      const checkboxes = document.querySelectorAll('.prose input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.className = 'w-4 h-4 rounded mr-2 inline-block accent-[#E0B15A]';
      });
    };

    styleMarkdownLists();

    return () => {
      document.removeEventListener('click', handleCopyClick);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [children]);

  // Expose active ID by writing to the custom event or modifying elements dynamically
  useEffect(() => {
    if (!activeId) return;
    
    // Find all links in the right sidebar "On this page" and highlight active
    const tocLinks = document.querySelectorAll('aside a[href^="#"]');
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [activeId]);

  return <div className="docs-content-wrapper">{children}</div>;
}
