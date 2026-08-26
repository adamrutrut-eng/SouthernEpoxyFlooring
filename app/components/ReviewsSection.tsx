'use client';

import Reveal from './Reveal';
import reviews from '@/content/reviews.json';

type Review = { name: string; city: string; text: string };

const list = reviews as Review[];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="#C97B4A" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  // No real reviews on file -> no section. Never invent testimonials.
  if (list.length === 0) return null;

  return (
    <section className="section">
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          What Homeowners Say
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
          Floors that speak for themselves.
        </h2>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {list.map((r, i) => (
          <Reveal key={`${r.name}-${i}`} order={i % 3}>
            <figure
              style={{
                background: '#0d0d0d',
                borderRadius: 16,
                borderTop: '1px solid rgba(201,123,74,0.18)',
                padding: '1.8rem 1.6rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stars />
              <blockquote
                style={{
                  color: '#DDD8D2',
                  fontWeight: 300,
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: '1.4rem',
                  color: '#F2EFEA',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                {r.name}
                {r.city ? (
                  <span style={{ color: '#8B8B8B', fontWeight: 300 }}>
                    {' '}
                    &middot; {r.city}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
