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
    <section className="section" style={{ maxWidth: 900, paddingTop: '5rem' }}>
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Systems &amp; Pricing
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
            marginBottom: '2.2rem',
          }}
        >
          Every project, priced on the slab.
        </h2>
      </Reveal>

      <Reveal order={2}>
        <div
          style={{
            background: 'rgba(13,13,13,0.78)',
            border: '1px solid rgba(13,160,212,0.18)',
            borderRadius: 16,
            padding: '0.6rem 1.5rem',
          }}
        >
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '0.35rem 1.25rem',
                padding: '1.05rem 0',
                borderBottom:
                  i < tiers.length - 1
                    ? '1px solid rgba(255,255,255,0.07)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  color: '#F2EFEA',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  minWidth: 170,
                }}
              >
                {tier.name}
              </span>
              <span
                style={{
                  color: '#8B8B8B',
                  fontWeight: 300,
                  fontSize: '0.85rem',
                  flex: '1 1 220px',
                }}
              >
                {tier.inclusions[0]}
              </span>
              <span
                style={{
                  color: hasPrices && tier.price ? '#0DA0D4' : '#8B8B8B',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                }}
              >
                {hasPrices && tier.price ? `est. ${tier.price}` : 'Quoted on-site'}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal order={3}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem 1.6rem',
            marginTop: '1.6rem',
          }}
        >
          <a
            href="#book"
            onClick={scrollToBook}
            className="btn-outline"
            style={{
              display: 'inline-block',
              border: '1px solid #0DA0D4',
              color: '#F2EFEA',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '0.85rem 2rem',
              borderRadius: 40,
            }}
          >
            Get Exact Quote
          </a>
          <p
            style={{
              color: '#8B8B8B',
              fontWeight: 300,
              fontSize: '0.82rem',
              maxWidth: 420,
              lineHeight: 1.5,
            }}
          >
            Estimated ranges — square footage and slab condition set the
            final number, in person and free.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
