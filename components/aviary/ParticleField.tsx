'use client';

import { CSSProperties, useEffect, useRef } from 'react';

interface Dot {
  u: number; // 0..1 horizontal seed
  v: number; // 0..1 vertical seed (0 = far/top, 1 = near/bottom)
  depth: number; // 0..1 per-dot depth jitter, near dots are bigger/brighter/move more
  seed: number;
}

export default function ParticleField({
  height = 320,
  density = 1,
  drift = true,
  fade = 'bottom',
  interactive = true,
  style,
}: {
  height?: number | string;
  density?: number;
  drift?: boolean;
  fade?: 'bottom' | 'top' | 'none';
  interactive?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const enableDrift = drift && !reduceMotion;
    const enableInteractive = interactive && !reduceMotion;

    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    const onResize = () => size();
    window.addEventListener('resize', onResize);

    // Fixed field of dots — regenerated only on mount, not per frame.
    const cols = Math.round(72 * density);
    const rows = Math.round(30 * density);
    const dots: Dot[] = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        dots.push({
          u: (i + (Math.random() - 0.5) * 0.6) / cols,
          v: (j + (Math.random() - 0.5) * 0.6) / rows,
          depth: Math.random(),
          seed: Math.random() * Math.PI * 2,
        });
      }
    }

    const pointer = { tx: 0, ty: 0, x: 0, y: 0, active: 0, targetActive: 0 };

    // Listen on the window, not the canvas: the field sits behind the hero
    // content (pointer-events: none on its wrapper) so it never blocks clicks,
    // but it still tracks the cursor wherever it moves.
    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.tx = Math.max(-1.6, Math.min(1.6, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pointer.ty = Math.max(-1.6, Math.min(1.6, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      pointer.targetActive = 1;
    }
    function onPointerLeave() {
      pointer.targetActive = 0;
    }
    if (enableInteractive) {
      window.addEventListener('pointermove', onPointerMove);
      document.documentElement.addEventListener('mouseleave', onPointerLeave);
    }

    function frame() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.clearRect(0, 0, w, h);

      // Ease the pointer so the tilt feels weighted, not snappy.
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.active += (pointer.targetActive - pointer.active) * 0.08;

      for (const d of dots) {
        // Near dots (depth close to 1) sit "closer to camera": bigger, brighter,
        // drift faster, and shift further under the parallax tilt.
        const near = d.depth;
        const wave = Math.sin(d.u * 7 + t * (0.5 + near * 0.8)) * 0.035 + Math.sin(d.u * 3.1 - t * 0.35) * 0.05;
        const vy = d.v * d.v; // bunches dots toward the top, opening up toward the bottom

        // Parallax: the whole plane tilts opposite the pointer, near dots move most.
        const parallaxX = -pointer.x * (0.05 + near * 0.09) * pointer.active;
        const parallaxY = -pointer.y * (0.035 + near * 0.06) * pointer.active;

        const y = (vy + wave + parallaxY) * h;
        const x = (d.u + Math.sin(d.v * 9 + t * 0.4) * 0.006 + parallaxX) * w;

        if (x < -3 || x > w + 3 || y < -3 || y > h + 3) continue;

        // Proximity glint: dots near the cursor read slightly brighter, like catching light.
        let glint = 0;
        if (pointer.active > 0.01) {
          const px = (pointer.x * 0.5 + 0.5) * w;
          const py = (pointer.y * 0.5 + 0.5) * h;
          const dist = Math.hypot(x - px, y - py);
          glint = Math.max(0, 1 - dist / 140) * pointer.active * 0.5;
        }

        const base = Math.max(0, (1 - vy) * 0.5 * (0.35 + 0.65 * Math.abs(Math.sin(d.u * 13 + d.v * 21))));
        const a = Math.min(1, base * (0.55 + near * 0.7) + glint);
        if (a <= 0.01) continue;

        const size = 0.6 + near * 1.1 + glint * 0.8;
        ctx!.fillStyle = 'rgba(244,242,236,' + a.toFixed(3) + ')';
        ctx!.fillRect(x, y, size, size);
      }

      if (enableDrift) t += 0.0025;
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (enableInteractive) {
        window.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      }
    };
  }, [density, drift, interactive]);

  const mask =
    fade === 'none' ? undefined : fade === 'top' ? 'linear-gradient(to top,#000 40%,transparent)' : 'linear-gradient(to bottom,#000 45%,transparent)';

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height, overflow: 'hidden', ...style }}>
      <canvas
        ref={ref}
        style={{ width: '100%', height: '100%', display: 'block', WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
}
