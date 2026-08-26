'use client';

import Reveal from './Reveal';
import pricing from '@/content/pricing.json';

type Tier = { name: string; price: string | null; inclusions: string[] };

const tiers = pricing.tiers as Tier[];
const hasPrices =
  pricing.hasPrices && tiers.some((t) => t.price !== null && t.price !== '');

function scrollToBook(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
}

export default function PricingSection() {
  return (
    <section className="section">
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Straightforward Scope
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
          Every project, priced on the slab.
        </h2>
      </Reveal>
      <Reveal order={2}>
        <p
          style={{
            color: '#DDD8D2',
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            maxWidth: 520,
            marginBottom: '3rem',
          }}
        >
          Condition, square footage, and finish drive the number — so we quote
          in person, on your concrete, and the quote is free.
        </p>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} order={i}>
            <div
              style={{
                background: '#0d0d0d',
                borderRadius: 16,
                border: '1px solid rgba(201,123,74,0.18)',
                padding: '2rem 1.8rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 500,
                  fontSize: '1.35rem',
                  color: '#F2EFEA',
                  marginBottom: '0.4rem',
                }}
              >
                {tier.name}
              </h3>
              <p
                style={{
                  color: hasPrices && tier.price ? '#C97B4A' : '#8B8B8B',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {hasPrices && tier.price ? `From ${tier.price}` : 'Quoted on-site'}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  marginBottom: '2rem',
                  flex: 1,
                }}
              >
                {tier.inclusions.map((inc) => (
                  <li
                    key={inc}
                    style={{
                      color: '#DDD8D2',
                      fontWeight: 300,
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      paddingLeft: '1.1rem',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.52em',
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#C97B4A',
                      }}
                    />
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                onClick={scrollToBook}
                className="btn-outline"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  border: '1px solid #C97B4A',
                  color: '#F2EFEA',
                  textDecoration: 'none',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '0.8rem 1.6rem',
                  borderRadius: 40,
                }}
              >
                {hasPrices ? 'Get Exact Quote' : 'Free On-Site Quote'}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
