'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FRAME_COUNT, frameSrc } from '@/lib/heroFrames';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let currentIdx = -1;
    let rafId = 0;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // Cover-fit: fill the viewport, crop the overflow, center the image.
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      currentIdx = idx;
    };

    // Nearest already-decoded frame at or below the target, so scrubbing
    // stays smooth while the tail of the sequence is still loading.
    const nearestLoaded = (target: number) => {
      for (let i = target; i >= 0; i--) {
        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) return i;
      }
      return -1;
    };

    sizeCanvas();

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      if (i === 0) {
        img.onload = () => {
          if (currentIdx === -1) draw(0);
        };
      }
      images.push(img);
    }

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);

    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(-top / scrollable, 0, 1) : 0;
      const target = Math.round(progress * (FRAME_COUNT - 1));
      if (target !== currentIdx) {
        const idx = nearestLoaded(target);
        if (idx >= 0 && idx !== currentIdx) draw(idx);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      sizeCanvas();
      if (currentIdx >= 0) {
        draw(currentIdx);
      } else {
        const idx = nearestLoaded(0);
        if (idx >= 0) draw(idx);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollToBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
          aria-label="A finished epoxy garage floor separating into its five engineered layers as you scroll"
          role="img"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
          }}
        >
          <div
            style={{
              padding: 'clamp(2rem, 5vw, 4.5rem)',
              maxWidth: 900,
            }}
          >
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0, 0, 1] }}
              className="label"
              style={{ marginBottom: '1.2rem' }}
            >
              Southern Epoxy Flooring &middot; Georgia
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.25, 0, 0, 1] }}
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                color: '#F2EFEA',
                marginBottom: '1.4rem',
              }}
            >
              A Floor Is a System.
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0, 0, 1] }}
              style={{
                fontFamily: 'var(--font-archivo), sans-serif',
                fontWeight: 300,
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: '#DDD8D2',
                maxWidth: 460,
                marginBottom: '2.2rem',
              }}
            >
              Five engineered layers. One seamless finish. Installed in a day,
              built for decades.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.25, 0, 0, 1] }}
            >
              <a
                href="#book"
                onClick={scrollToBook}
                style={{
                  display: 'inline-block',
                  background: '#C97B4A',
                  color: '#050505',
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '0.9rem 2.6rem',
                  borderRadius: 40,
                  pointerEvents: 'auto',
                }}
              >
                Book a Free Estimate
              </a>
            </motion.div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0, 0, 1] }}
              style={{
                marginTop: '2.4rem',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8B8B8B',
              }}
            >
              Scroll to see the system
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
