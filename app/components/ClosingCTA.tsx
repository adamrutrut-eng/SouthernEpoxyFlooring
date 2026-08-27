'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';

function scrollToBook(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
}

export default function ClosingCTA() {
  return (
    <section
      className="section"
      style={{
        textAlign: 'center',
        paddingTop: '10rem',
        paddingBottom: '10rem',
        maxWidth: 900,
      }}
    >
      <Reveal order={0}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Southern Epoxy Flooring"
          style={{
            width: 'min(220px, 55vw)',
            height: 'auto',
            margin: '0 auto 1.2rem',
            display: 'block',
            mixBlendMode: 'screen',
          }}
        />
        <p className="label" style={{ marginBottom: '1.6rem' }}>
          Clean. Modern. Forever.
        </p>
      </Reveal>
      <Reveal order={1}>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
            color: '#F2EFEA',
            marginBottom: '1.6rem',
          }}
        >
          Concrete is the canvas.{' '}
          <em style={{ fontStyle: 'italic', color: '#DDD8D2' }}>
            This is the finish.
          </em>
        </h2>
      </Reveal>
      <Reveal order={2}>
        <p
          style={{
            fontWeight: 300,
            color: '#DDD8D2',
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: 480,
            margin: '0 auto 3rem',
          }}
        >
          One visit to measure, most installs done in a day — and a floor
          the house gets judged by.
        </p>
      </Reveal>
      <Reveal order={3}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(480px, 92vw)',
              height: 220,
              background:
                'radial-gradient(ellipse, rgba(13,160,212,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <motion.a
            href="#book"
            onClick={scrollToBook}
            whileHover={{ backgroundColor: '#0DA0D4', color: '#050505' }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'relative',
              display: 'inline-block',
              border: '1px solid #0DA0D4',
              color: '#F2EFEA',
              backgroundColor: 'rgba(13,160,212,0)',
              textDecoration: 'none',
              fontFamily: 'var(--font-archivo), sans-serif',
              fontWeight: 500,
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              borderRadius: 40,
            }}
          >
            Book a Free Estimate
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
