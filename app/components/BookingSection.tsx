'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import business from '@/content/business.json';

const isTodo = (v: unknown) =>
  typeof v !== 'string' || v.length === 0 || v.toUpperCase().includes('TODO');

const calendlyReady =
  !isTodo(business.calendlyUrl) &&
  business.calendlyUrl.startsWith('https://calendly.com/');

// Where quote requests actually land. Falls back to the public contact
// address if no dedicated quote inbox is configured.
const quoteTo = !isTodo((business as Record<string, unknown>).quoteEmail)
  ? (business as { quoteEmail: string }).quoteEmail
  : business.email;

// Formspree carries the form once its ID is pasted into business.json;
// until then submissions fall back to opening the visitor's email app.
const formspreeReady = !isTodo(business.formspreeId);

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

export default function BookingSection() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'mailto' | 'error'
  >('idle');

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
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    // Honeypot: real visitors never see or fill this field.
    if (typeof data._gotcha === 'string' && data._gotcha !== '') {
      setStatus('sent');
      form.reset();
      return;
    }

    const subject = `Free estimate request — ${data.name || ''}${
      data.city ? ` (${data.city})` : ''
    }`;

    if (!formspreeReady) {
      // No Formspree form connected yet: open the visitor's own email
      // app with everything pre-filled instead.
      const body = [
        `Name: ${data.name || ''}`,
        `Phone: ${data.phone || ''}`,
        `Email: ${data.email || ''}`,
        `City: ${data.city || ''}`,
        '',
        data.message || '',
      ].join('\n');
      window.location.href = `mailto:${quoteTo}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(
        `https://formspree.io/f/${business.formspreeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            email: data.email,
            city: data.city,
            message: data.message,
            _subject: subject,
          }),
        }
      );
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
          Request a Free Estimate
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
          We measure. We quote. You decide.
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
            marginBottom: '2.2rem',
          }}
        >
          Tell us about the space — or call or text{' '}
          {!isTodo(business.phone) ? (
            <a
              href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}
              style={{ color: '#0DA0D4', textDecoration: 'none', fontWeight: 500 }}
            >
              {business.phone}
            </a>
          ) : (
            'us'
          )}{' '}
          — and we&rsquo;ll schedule your free on-site estimate.
        </p>
      </Reveal>

      {calendlyReady && (
        <Reveal order={2}>
          <div
            className="calendly-inline-widget"
            data-url={`${business.calendlyUrl}?hide_gdpr_banner=1&background_color=0d0d0d&text_color=F2EFEA&primary_color=0DA0D4`}
            style={{
              minWidth: 'min(320px, 100%)',
              height: 700,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(13,160,212,0.18)',
              marginBottom: '2.5rem',
            }}
          />
        </Reveal>
      )}

      <Reveal order={3}>
        <form
          onSubmit={submitQuote}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: '1rem',
            background: 'rgba(13,13,13,0.78)',
            border: '1px solid rgba(13,160,212,0.18)',
            borderRadius: 16,
            padding: '1.8rem 1.6rem',
          }}
        >
          <input
            name="name"
            placeholder="Name"
            aria-label="Name"
            required
            className="field"
            style={inputStyle}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            aria-label="Phone"
            required
            className="field"
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="field"
            style={inputStyle}
          />
          <input
            name="city"
            placeholder="City"
            aria-label="City"
            className="field"
            style={inputStyle}
          />
          <input
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              opacity: 0,
            }}
          />
          <textarea
            name="message"
            placeholder="Tell us about the space — garage, patio, basement, square footage…"
            aria-label="Project details"
            rows={4}
            required
            className="field"
            style={{ ...inputStyle, gridColumn: '1 / -1', resize: 'vertical' }}
          />
          <div style={{ gridColumn: '1 / -1' }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-solid"
              style={{
                background: '#0DA0D4',
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
              {status === 'sending' ? 'Sending…' : 'Request Free Estimate'}
            </button>
            <div aria-live="polite">
              {status === 'sent' && (
                <p style={{ color: '#0DA0D4', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                  Got it — we&rsquo;ll reach out to schedule your estimate.
                </p>
              )}
              {status === 'mailto' && (
                <p style={{ color: '#DDD8D2', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                  Your email app should open with everything filled in — just
                  press send. Nothing opened? Email us at{' '}
                  <a href={`mailto:${quoteTo}`} style={{ color: '#0DA0D4' }}>
                    {quoteTo}
                  </a>
                  .
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#DDD8D2', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                  Something went wrong — please email us at{' '}
                  <a href={`mailto:${quoteTo}`} style={{ color: '#0DA0D4' }}>
                    {quoteTo}
                  </a>{' '}
                  instead.
                </p>
              )}
            </div>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
