import React from 'react';
import { AbsoluteFill } from 'remotion';
import { color, font } from '../theme';
import { useBrandFonts } from '../useBrandFonts';

export const OgImage: React.FC = () => {
  useBrandFonts();

  return (
    <AbsoluteFill
      style={{
        width: 1200,
        height: 630,
        backgroundColor: color.ink950,
        color: color.bone100,
        fontFamily: font.ui,
        padding: '44px 52px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224, 177, 90, 0.12) 0%, rgba(12, 13, 12, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143, 190, 124, 0.08) 0%, rgba(12, 13, 12, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(230, 227, 218, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(230, 227, 218, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content: 2-column layout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, height: '100%' }}>
        {/* Left Column: Branding & Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 620, gap: 18 }}>
          {/* Brand Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Logo Mark */}
            <svg width="42" height="42" viewBox="0 0 512 512">
              <rect width="512" height="512" rx="112" fill="#121413" />
              <rect x="24" y="24" width="464" height="464" rx="96" fill="none" stroke="#E0B15A" strokeOpacity="0.4" strokeWidth="8" />
              <path d="M256 96 L384 396 L324 396 L290 310 L222 310 L188 396 L128 396 Z" fill="#F4F2EC" />
              <polygon points="256,176 280,250 232,250" fill="#121413" />
              <circle cx="256" cy="226" r="16" fill="#E0B15A" />
              <path d="M200 348 L312 348" stroke="#E0B15A" strokeWidth="12" strokeLinecap="round" />
            </svg>

            <span style={{ fontFamily: font.display, fontSize: 38, fontWeight: 400, color: color.bone100, letterSpacing: 1 }}>
              Aviary
            </span>

            <span
              style={{
                fontFamily: font.code,
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                backgroundColor: 'rgba(224, 177, 90, 0.12)',
                color: color.ochre400,
                border: '1px solid rgba(224, 177, 90, 0.3)',
                padding: '3px 10px',
                borderRadius: 4,
              }}
            >
              Open Source · FOSS
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: font.display,
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 1.1,
              color: color.bone100,
              margin: 0,
            }}
          >
            Automated real-browser website auditing
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: font.ui,
              fontSize: 17,
              lineHeight: 1.5,
              color: color.bone400,
              margin: 0,
            }}
          >
            See your site the way real browsers do. <strong style={{ color: color.ochre400 }}>235 checks</strong> across 28 categories evaluating DOM hydration, layout shifts, SEO, and accessibility.
          </p>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['SEO', 'Core Web Vitals', 'Accessibility', 'Security', 'UX'].map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: font.ui,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  padding: '4px 10px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(230, 227, 218, 0.06)',
                  border: `1px solid ${color.hairline}`,
                  color: color.bone300,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Shell Command Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#070807',
              border: '1px solid rgba(230, 227, 218, 0.18)',
              borderRadius: 8,
              padding: '12px 18px',
              fontFamily: font.code,
              fontSize: 17,
              color: color.bone200,
              marginTop: 4,
            }}
          >
            <span style={{ color: color.ochre400, userSelect: 'none' }}>$</span>
            <span>npx @ru1vly/aviary -u https://example.com</span>
          </div>
        </div>

        {/* Right Column: Live Audit Score Card */}
        <div
          style={{
            width: 440,
            backgroundColor: '#0E100F',
            border: '1px solid rgba(230, 227, 218, 0.16)',
            borderRadius: 12,
            padding: '22px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Card Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${color.hairline}`, paddingBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color.pass }} />
              <span style={{ fontFamily: font.code, fontSize: 13, color: color.bone400, textTransform: 'uppercase', letterSpacing: 1 }}>
                Live Browser Audit
              </span>
            </div>
            <span style={{ fontFamily: font.code, fontSize: 13, color: color.bone500 }}>
              Chromium 130
            </span>
          </div>

          {/* Big Score Display */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: font.code, fontSize: 42, fontWeight: 700, color: color.pass, lineHeight: 1 }}>
                98<span style={{ fontSize: 20, color: color.bone500 }}>/100</span>
              </div>
              <div style={{ fontFamily: font.ui, fontSize: 13, color: color.bone400, marginTop: 4 }}>
                232 of 235 checks passed
              </div>
            </div>

            <div
              style={{
                fontFamily: font.code,
                fontSize: 12,
                color: color.pass,
                backgroundColor: 'rgba(143, 190, 124, 0.12)',
                border: '1px solid rgba(143, 190, 124, 0.3)',
                padding: '6px 12px',
                borderRadius: 6,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Grade A+
            </div>
          </div>

          {/* Check List Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, fontFamily: font.code }}>
            {[
              { label: 'Technical SEO & Metadata', result: '38/38 passed', pass: true },
              { label: 'Core Web Vitals (LCP 0.8s)', result: 'Optimal', pass: true },
              { label: 'Accessibility (WCAG 2.1 AA)', result: '52/52 passed', pass: true },
              { label: 'Security & CSP Headers', result: '24/24 passed', pass: true },
              { label: 'Client Hydration & Layout', result: 'Zero shift', pass: true },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 10px',
                  backgroundColor: 'rgba(230, 227, 218, 0.03)',
                  borderRadius: 4,
                  border: `1px solid ${color.hairline}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: item.pass ? color.pass : color.fail, fontWeight: 700 }}>✓</span>
                  <span style={{ color: color.bone200 }}>{item.label}</span>
                </div>
                <span style={{ color: color.pass, fontSize: 12 }}>{item.result}</span>
              </div>
            ))}
          </div>

          {/* Footer inside card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: color.bone500, fontFamily: font.ui }}>
            <span>CLI · TUI · MCP Server · SDK</span>
            <span>Zero Cloud Footprint</span>
          </div>
        </div>
      </div>

      {/* Card Outer Border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(230, 227, 218, 0.12)',
          borderRadius: 0,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
