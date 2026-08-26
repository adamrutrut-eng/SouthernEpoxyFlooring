'use client';

import Reveal from './Reveal';
import business from '@/content/business.json';

const isTodo = (v: unknown) =>
  typeof v !== 'string' || v.length === 0 || v.toUpperCase().includes('TODO');

const cities = (business.serviceCities as string[]).filter((c) => !isTodo(c));
const serviceArea =
  cities.length > 0 ? `${cities.join(' · ')} — ${business.state}` : business.state;

const rows: [string, string][] = [
  [
    'Coating System',
    '100% solids epoxy base · full flake broadcast · polyaspartic topcoat',
  ],
  ['Total Thickness', '20–30 mils dry film (8–12× a typical garage paint)'],
  ['Surface Prep', 'Diamond grinding (CSP 2–3), crack & spall repair'],
  ['Walk-On Time', '4–6 hours'],
  ['Drive-On Time', '24 hours'],
  ['Abrasion Resistance', 'Polyaspartic wear surface built for daily vehicle traffic'],
  ['Slip-Resistance Additive', 'Available — clear anti-skid aggregate in the topcoat'],
  ['UV Stability', 'Aliphatic chemistry — non-yellowing, exterior-rated'],
  ...(isTodo(business.warrantyYears)
    ? []
    : ([['Warranty', `${business.warrantyYears}-year installation warranty`]] as [
        string,
        string,
      ][])),
  ['Service Area', serviceArea],
];

export default function SpecsSection() {
  return (
    <section className="section" style={{ maxWidth: 900 }}>
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          System Specifications
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
            marginBottom: '3rem',
          }}
        >
          The architecture of a permanent floor.
        </h2>
      </Reveal>
      <div>
        {rows.map(([label, value], i) => (
          <Reveal key={label} order={Math.min(i, 4)}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 240px) 1fr',
                gap: '1rem',
                padding: '1.05rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                style={{
                  color: '#C97B4A',
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  paddingTop: '0.15rem',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  color: '#DDD8D2',
                  fontWeight: 300,
                  fontSize: '0.95rem',
                  lineHeight: 1.55,
                }}
              >
                {value}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
