'use client';

import Reveal from './Reveal';

const proofs: { icon: React.ReactNode; name: string }[] = [
  {
    name: '100% Solids Epoxy',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
        <rect x="4" y="14" width="16" height="4" rx="1" />
        <rect x="4" y="8" width="16" height="3" rx="1" />
        <path d="M4 5h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Polyaspartic Topcoat',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
        <path d="M3 17c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
        <path d="M3 12c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Full-Broadcast Flake',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
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
    name: 'Hot-Tire & Chemical Proof',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    name: 'Never Yellows',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'One-Day Install',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0DA0D4" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function SystemSection() {
  return (
    <section className="section" style={{ paddingBottom: '5rem' }}>
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
            marginBottom: '1.2rem',
          }}
        >
          Paint is a coat. This is a system.
        </h2>
      </Reveal>
      <Reveal order={2}>
        <p
          style={{
            color: '#DDD8D2',
            fontWeight: 300,
            fontSize: '0.98rem',
            lineHeight: 1.65,
            maxWidth: 560,
            marginBottom: '2.2rem',
          }}
        >
          Diamond-ground concrete, moisture-blocking primer, 100% solids
          epoxy, full flake broadcast, UV-stable clear top — the five layers
          you just watched come apart.
        </p>
      </Reveal>
      <Reveal order={3}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {proofs.map((p) => (
            <span
              key={p.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                border: '1px solid rgba(13,160,212,0.25)',
                background: 'rgba(13,13,13,0.72)',
                borderRadius: 40,
                padding: '0.55rem 1.1rem',
                color: '#F2EFEA',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {p.icon}
              {p.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
