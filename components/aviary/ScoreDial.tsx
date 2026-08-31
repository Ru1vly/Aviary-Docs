function bandColor(score: number) {
  if (score >= 90) return 'var(--verdict-pass)';
  if (score >= 50) return 'var(--verdict-warn)';
  return 'var(--verdict-fail)';
}

export default function ScoreDial({
  score = 0,
  label,
  size = 96,
  thickness = 3,
}: {
  score?: number;
  label?: string;
  size?: number;
  thickness?: number;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const color = bandColor(score);
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-hairline)" strokeWidth={thickness} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={c}
            strokeDashoffset={c * (1 - score / 100)}
            style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-standard)' }}
          />
        </svg>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-code)',
            fontSize: Math.round(size * 0.34),
            color,
          }}
        >
          {score}
        </span>
      </div>
      {label ? (
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      ) : null}
    </div>
  );
}
