'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Interactive full-screen dot-matrix wave background for the hero section.
 * Synthesizes:
 * 1. Reference 0: High-contrast precision dot-grid matrix on obsidian background
 * 2. Reference 1: Halftone dot sizing and luminescence modulation (larger, brighter dots on wave crests and under cursor)
 * 3. Reference 2: Undulating 3D topographic wave mesh with perspective contour curvature
 * 
 * Features:
 * - Dual-layer architecture: SSR-rendered SVG dot matrix for instantaneous paint + dynamic HTML5 canvas
 * - Multi-frequency 3D sine-wave elevation with perspective vertical projection
 * - Fluid pointer tracking (mouse & touch) with repulsion, 3D uplift, and ochre luminescence
 * - Click/tap ripple shockwave
 * - High-DPI / Retina scale calibration
 * - Accessibility: prefers-reduced-motion support
 * - Performance: IntersectionObserver auto-pauses animation when scrolled out of view
 */
const emptySubscribe = () => () => {};

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let time = 0;

    // Mouse & interaction tracking
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: 240,
      active: false,
      clickPulse: 0,
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle canvas dimensions with Retina DPR scaling and ResizeObserver
    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : null;
      width = Math.ceil(rect?.width || window.innerWidth || 1440);
      height = Math.ceil(rect?.height || window.innerHeight || 800);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', handleResize);

    // Pointer move handlers (supports mouse and touch)
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
      mouse.clickPulse = 1.0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // IntersectionObserver to pause rendering when hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    // Animation frame loop
    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position lerping
      if (mouse.active && mouse.x === -9999) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      }

      // Decay click pulse ripple
      if (mouse.clickPulse > 0.005) {
        mouse.clickPulse *= 0.94;
      } else {
        mouse.clickPulse = 0;
      }

      if (!prefersReducedMotion) {
        time += 0.013;
      }

      // Responsive grid pitch: tighter for high density like Reference 0 & 2
      const spacing = width < 768 ? 20 : 24;
      const cols = Math.ceil(width / spacing) + 4;
      const rows = Math.ceil(height / spacing) + 4;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);
      const effectiveRadius = mouse.radius * (1 + mouse.clickPulse * 0.6);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * spacing;
          const by = offsetY + r * spacing;

          // 3D undulating wave elevation (Reference 2 style)
          // Multi-frequency diagonal & orthogonal wave interference
          const wave1 = Math.sin(c * 0.15 + r * 0.12 + time * 1.3);
          const wave2 = Math.cos(c * 0.08 - r * 0.16 + time * 0.95);
          const wave3 = Math.sin((c + r) * 0.06 + time * 0.6);
          let z = (wave1 * 0.52 + wave2 * 0.38 + wave3 * 0.25) * 32;

          // Mouse interaction: repulsion, 3D uplift, and halftone luminescence
          let px = bx;
          let py = by;
          let mouseInfluence = 0;

          if (mouse.active && mouse.x !== -9999) {
            const dx = bx - mouse.x;
            const dy = by - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < effectiveRadius) {
              const norm = 1 - dist / effectiveRadius;
              mouseInfluence = norm * norm; // Quadratic falloff

              const angle = Math.atan2(dy, dx);
              const push = mouseInfluence * (14 + mouse.clickPulse * 28);
              px += Math.cos(angle) * push;
              py += Math.sin(angle) * push;
              z += mouseInfluence * (36 + mouse.clickPulse * 48);
            }
          }

          // 3D perspective projection offset: elevates hills and lowers valleys
          // Creating the iconic contour curves seen in Reference 2
          const renderY = py - z * 0.65;
          const renderX = px;

          // Radial vignette falloff towards canvas borders
          const distFromCenter = Math.sqrt((bx - cx) * (bx - cx) + (by - cy) * (by - cy));
          const edgeFalloff = Math.max(0, 1 - Math.pow(distFromCenter / (maxDist * 0.96), 2.4));

          // Soft bottom blend towards the stats section
          const bottomFade = Math.max(0, Math.min(1, (height - renderY) / 70));

          const totalFade = edgeFalloff * bottomFade;
          if (totalFade <= 0.01) continue;

          // Halftone radius scaling (Reference 1 & 2):
          // Elevated or hovered points grow larger (up to 3.2px); recessed dots shrink to 1.1px
          const normalizedZ = Math.max(0, Math.min(1, (z + 28) / 56)); // [0, 1]
          const baseRadius = width < 768 ? 1.0 : 1.35;
          const radius = Math.max(0.7, (baseRadius + normalizedZ * 1.1 + mouseInfluence * 1.8) * totalFade);

          // Alpha modulation: high contrast crispness
          const baseAlpha = 0.22 + normalizedZ * 0.38;
          const alpha = Math.min(0.95, (baseAlpha + mouseInfluence * 0.45) * totalFade);

          ctx.beginPath();
          ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);

          if (mouseInfluence > 0.16) {
            // Warm ochre highlight matching brand accents
            ctx.fillStyle = `rgba(224, 177, 90, ${alpha.toFixed(3)})`;
          } else {
            // High-contrast clean silver-white dot matching Reference 0 & 2
            ctx.fillStyle = `rgba(225, 222, 214, ${alpha.toFixed(3)})`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Draw initial frame immediately
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hero-texture-background"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* SSR Static Dot-Grid Pattern Layer (instant first paint matching Reference 0) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: isMounted ? 0.25 : 0.85,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id="hero-dot-matrix" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.15" fill="rgba(225, 222, 214, 0.42)" />
          </pattern>
          <radialGradient id="hero-mask-grad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-dot-mask">
            <rect width="100%" height="100%" fill="url(#hero-mask-grad)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-matrix)" mask="url(#hero-dot-mask)" />
      </svg>

      {/* Dynamic 3D Wave & Interactive Mouse Canvas Layer (Reference 1 & 2) */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
    </div>
  );
}
