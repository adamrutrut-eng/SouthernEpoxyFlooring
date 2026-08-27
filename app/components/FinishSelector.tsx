'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import finishes from '@/content/finishes.json';

type Finish = { name: string; file: string; blurb: string };

const list = finishes as Finish[];
const PLACEHOLDER = '/frames/frame_0001.jpg';

export default function FinishSelector() {
  const [active, setActive] = useState(0);
  const [placeholderOk, setPlaceholderOk] = useState(false);
  const hasFinishes = list.length > 0;

  // Probe the placeholder frame client-side so a 404 never flashes a
  // broken-image icon (SSR'd <img> errors can fire before hydration).
  useEffect(() => {
    if (hasFinishes) return;
    const img = new Image();
    img.onload = () => setPlaceholderOk(true);
    img.src = PLACEHOLDER;
  }, [hasFinishes]);

  return (
    <section className="section" style={{ maxWidth: 1100 }}>
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Choose Your Finish
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
          Same garage. Your floor.
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
            marginBottom: '2.5rem',
          }}
        >
          Same space, five looks — tap one on.
        </p>
      </Reveal>

      <Reveal order={3}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#0d0d0d',
            border: '1px solid rgba(13,160,212,0.18)',
          }}
        >
          {hasFinishes ? (
            list.map((f, i) => (
              // All variants stay mounted and stacked; opacity does the
              // crossfade so switching is instant once images are cached.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={f.file}
                src={`/finishes/${f.file}`}
                alt={`${f.name} flake epoxy finish`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === active ? 1 : 0,
                  transition: 'opacity 400ms ease',
                }}
              />
            ))
          ) : (
            <>
              {placeholderOk && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PLACEHOLDER}
                  alt="Full-broadcast flake epoxy floor"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <p
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '1.4rem',
                  transform: 'translateX(-50%)',
                  color: '#DDD8D2',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: 'rgba(5,5,5,0.65)',
                  padding: '0.55rem 1.1rem',
                  borderRadius: 40,
                  whiteSpace: 'nowrap',
                }}
              >
                More finishes coming soon
              </p>
            </>
          )}
        </div>
      </Reveal>

      {hasFinishes && (
        <>
          <Reveal order={4}>
            <div
              role="group"
              aria-label="Floor finishes"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                marginTop: '1.4rem',
              }}
            >
              {list.map((f, i) => (
                <button
                  key={f.file}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  style={{
                    background: i === active ? 'rgba(13,160,212,0.12)' : '#0d0d0d',
                    color: i === active ? '#F2EFEA' : '#8B8B8B',
                    border:
                      i === active
                        ? '1px solid #0DA0D4'
                        : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 40,
                    padding: '0.6rem 1.3rem',
                    fontFamily: 'var(--font-archivo), sans-serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </Reveal>
          <p
            aria-live="polite"
            style={{
              marginTop: '1.1rem',
              color: '#DDD8D2',
              fontWeight: 300,
              fontSize: '0.9rem',
              lineHeight: 1.6,
              maxWidth: 520,
              minHeight: '1.5em',
            }}
          >
            {list[active]?.blurb}
          </p>
          <p
            style={{
              marginTop: '1.6rem',
              color: '#8B8B8B',
              fontWeight: 300,
              fontSize: '0.82rem',
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            Representative looks — ten standard flake blends in the real
            catalog, or a custom blend matched to your space.
          </p>
        </>
      )}
    </section>
  );
}
