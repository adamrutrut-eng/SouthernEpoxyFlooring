'use client';

import Reveal from './Reveal';
import business from '@/content/business.json';

const isTodo = (v: unknown) =>
  typeof v !== 'string' || v.length === 0 || v.toUpperCase().includes('TODO');

const stats: [string, string][] = [
  ['4–6 hrs', 'walk-on time'],
  ['24 hrs', 'drive-on time'],
  ['20–30 mils', 'thick — 8–12× garage paint'],
  ['0 yellowing', 'UV-stable polyaspartic top'],
];

export default function SpecsSection() {
  return (
    <section className="section" style={{ maxWidth: 1000, paddingTop: '5rem', paddingBottom: '5rem' }}>
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '2rem' }}>
          The Numbers That Matter
        </p>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(210px, 100%), 1fr))',
          gap: '1rem',
        }}
      >
        {stats.map(([big, small], i) => (
          <Reveal key={big} order={i}>
            <div
              style={{
                background: 'rgba(13,13,13,0.72)',
                border: '1px solid rgba(13,160,212,0.18)',
                borderRadius: 16,
                padding: '1.6rem 1.5rem',
                height: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 400,
                  fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
                  color: '#F2EFEA',
                  lineHeight: 1.05,
                  marginBottom: '0.5rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {big}
              </p>
              <p
                style={{
                  color: '#0DA0D4',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {small}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal order={4}>
        <p
          style={{
            marginTop: '1.4rem',
            color: '#8B8B8B',
            fontWeight: 300,
            fontSize: '0.85rem',
            lineHeight: 1.6,
          }}
        >
          Diamond-ground prep on every job · anti-skid additive available ·
          serving {business.serviceArea}
          {isTodo(business.warrantyYears)
            ? ''
            : ` · ${business.warrantyYears}-year warranty`}
        </p>
      </Reveal>
    </section>
  );
}
