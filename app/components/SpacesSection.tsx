'use client';

import Reveal from './Reveal';
import spaces from '@/content/spaces.json';

type Space = { name: string; file: string; blurb: string };

const list = spaces as Space[];

// Gallery of the kinds of spaces we coat. Hidden entirely until real
// imagery exists in public/spaces/ (populated by scripts/ingest-assets.mjs).
export default function SpacesSection() {
  if (list.length === 0) return null;

  return (
    <section className="section">
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Beyond the Garage
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
          Any concrete. One standard.
        </h2>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {list.map((s, i) => (
          <Reveal key={s.file} order={i % 3}>
            <figure
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(13,160,212,0.18)',
                background: '#0d0d0d',
                aspectRatio: '4 / 3',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/spaces/${s.file}`}
                alt={`${s.name} — ${s.blurb}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <figcaption
                style={{
                  position: 'absolute',
                  inset: 'auto 0 0 0',
                  padding: '2.2rem 1.4rem 1.2rem',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                }}
              >
                <p
                  style={{
                    color: '#F2EFEA',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    color: '#DDD8D2',
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  {s.blurb}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
