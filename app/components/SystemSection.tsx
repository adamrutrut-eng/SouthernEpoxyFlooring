'use client';

import Reveal from './Reveal';

const layers = [
  {
    n: '01',
    name: 'Prepared Concrete',
    detail: 'Diamond-ground, crack-repaired, opened for a mechanical bond',
  },
  {
    n: '02',
    name: 'Moisture-Mitigating Primer',
    detail: 'Seals the slab and stops vapor pressure from lifting the system',
  },
  {
    n: '03',
    name: '100% Solids Epoxy Base',
    detail: 'The structural coat — zero solvents, full thickness, lasting grip',
  },
  {
    n: '04',
    name: 'Decorative Flake Broadcast',
    detail: 'Vinyl flake thrown to full rejection for color, depth, and texture',
  },
  {
    n: '05',
    name: 'Polyaspartic Clear Topcoat',
    detail: 'The UV-stable wear surface that takes the tires, sun, and spills',
  },
];

const features: { icon: React.ReactNode; name: string; copy: string }[] = [
  {
    name: '100% Solids Epoxy',
    copy: 'Nothing evaporates out of a 100% solids coat — every mil we apply is a mil that stays on your floor.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <rect x="4" y="14" width="16" height="4" rx="1" />
        <rect x="4" y="8" width="16" height="3" rx="1" />
        <path d="M4 5h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Polyaspartic Topcoat',
    copy: 'An aliphatic wear layer locks in the flake and shrugs off sun, road salt, and chemical spills.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <path d="M3 17c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
        <path d="M3 12c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
        <path d="M12 3v5m0 0-2.5-2.5M12 8l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Full-Broadcast Flake',
    copy: 'Flake broadcast to full rejection — uniform texture, hidden concrete, and built-in slip resistance.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <circle cx="7" cy="7" r="1.4" />
        <circle cx="16" cy="5.5" r="1.1" />
        <circle cx="11.5" cy="11.5" r="1.6" />
        <circle cx="19" cy="12" r="1.2" />
        <circle cx="5.5" cy="15" r="1.2" />
        <circle cx="13.5" cy="18" r="1.4" />
      </svg>
    ),
  },
  {
    name: 'Hot-Tire & Chemical Resistant',
    copy: 'It will not peel under hot tires or stain from oil, gas, and brake fluid the way garage paint does.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M12 5v2.5M12 16.5V19M5 12h2.5M16.5 12H19" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'UV-Stable, Never Yellows',
    copy: 'The aliphatic topcoat is UV-stable, so the finish stays glass-clear instead of ambering in sunlight.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'One-Day Installation',
    copy: 'Most residential floors are ground, coated, and flaked in a single day — back on it fast.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0DA0D4" strokeWidth="1.3">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function SystemSection() {
  return (
    <section className="section">
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Engineered in Five Layers
        </p>
      </Reveal>
      <Reveal order={1}>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 400,
            fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
            lineHeight: 1.12,
            color: '#F2EFEA',
            maxWidth: 640,
            marginBottom: '3.5rem',
          }}
        >
          Paint is a coat. This is a system.
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '5rem' }}>
        {layers.map((layer, i) => (
          <Reveal key={layer.n} order={i}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.5rem',
                border: '1px solid rgba(13,160,212,0.18)',
                borderRadius: 16,
                padding: '1.1rem 1.5rem',
                background: '#0d0d0d',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#0DA0D4',
                  fontSize: '0.9rem',
                  minWidth: 28,
                }}
              >
                {layer.n}
              </span>
              <span
                style={{
                  color: '#F2EFEA',
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                }}
              >
                {layer.name}
              </span>
              <span
                style={{
                  color: '#8B8B8B',
                  fontWeight: 300,
                  fontSize: '0.88rem',
                  flex: '1 1 260px',
                }}
              >
                {layer.detail}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {features.map((f, i) => (
          <Reveal key={f.name} order={i % 3}>
            <div
              style={{
                background: '#0d0d0d',
                borderRadius: 16,
                borderTop: '1px solid rgba(13,160,212,0.18)',
                padding: '1.8rem 1.6rem',
                height: '100%',
              }}
            >
              <div style={{ marginBottom: '1.1rem' }}>{f.icon}</div>
              <h3
                style={{
                  color: '#F2EFEA',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  marginBottom: '0.6rem',
                }}
              >
                {f.name}
              </h3>
              <p
                style={{
                  color: '#DDD8D2',
                  fontWeight: 300,
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                }}
              >
                {f.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
