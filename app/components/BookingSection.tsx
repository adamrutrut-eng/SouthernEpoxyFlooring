'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import business from '@/content/business.json';

const isTodo = (v: unknown) =>
  typeof v !== 'string' || v.length === 0 || v.toUpperCase().includes('TODO');

const calendlyReady =
  !isTodo(business.calendlyUrl) &&
  business.calendlyUrl.startsWith('https://calendly.com/');

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  padding: '0.85rem 1rem',
  color: '#F2EFEA',
  fontFamily: 'var(--font-archivo), sans-serif',
  fontSize: '0.9rem',
  fontWeight: 300,
  outline: 'none',
};

export default function BookingSection({
  smtpConfigured,
}: {
  smtpConfigured: boolean;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  useEffect(() => {
    if (!calendlyReady) return;
    const id = 'calendly-widget-script';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  async function submitQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="book" className="section" style={{ maxWidth: 1000 }}>
      <Reveal order={0}>
        <p className="label" style={{ marginBottom: '1rem' }}>
          Book a Free In-Person Estimate
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
            marginBottom: '2.5rem',
          }}
        >
          We measure. We quote. You decide.
        </h2>
      </Reveal>

      <Reveal order={2}>
        {calendlyReady ? (
          <div
            className="calendly-inline-widget"
            data-url={`${business.calendlyUrl}?hide_gdpr_banner=1&background_color=0d0d0d&text_color=F2EFEA&primary_color=C97B4A`}
            style={{
              minWidth: 320,
              height: 700,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(201,123,74,0.18)',
            }}
          />
        ) : (
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(201,123,74,0.18)',
              borderRadius: 16,
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: '#DDD8D2',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: 460,
                margin: '0 auto',
              }}
            >
              Online booking is being connected. Reach out directly and
              we&rsquo;ll schedule your free on-site estimate.
            </p>
          </div>
        )}
      </Reveal>

      <Reveal order={3}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem 2.5rem',
            marginTop: '2rem',
            alignItems: 'center',
          }}
        >
          {!isTodo(business.phone) && (
            <a
              href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}
              style={{
                color: '#F2EFEA',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {business.phone}
            </a>
          )}
          <a
            href={`mailto:${business.email}`}
            style={{
              color: '#C97B4A',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 400,
            }}
          >
            {business.email}
          </a>
        </div>
      </Reveal>

      {smtpConfigured && (
        <Reveal order={4}>
          <form
            onSubmit={submitQuote}
            style={{
              marginTop: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            <p
              style={{
                gridColumn: '1 / -1',
                color: '#8B8B8B',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Or send project details
            </p>
            <input name="name" placeholder="Name" required style={inputStyle} />
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              required
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              style={inputStyle}
            />
            <input name="city" placeholder="City" style={inputStyle} />
            <textarea
              name="message"
              placeholder="Tell us about the space — garage, patio, basement, square footage…"
              rows={4}
              required
              style={{ ...inputStyle, gridColumn: '1 / -1', resize: 'vertical' }}
            />
            <div style={{ gridColumn: '1 / -1' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  background: '#C97B4A',
                  color: '#050505',
                  border: 'none',
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.6rem',
                  borderRadius: 40,
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Request Quote'}
              </button>
              {status === 'sent' && (
                <p style={{ color: '#C97B4A', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                  Got it — we&rsquo;ll be in touch within one business day.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#DDD8D2', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                  Something went wrong — please call or email us instead.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      )}
    </section>
  );
}
