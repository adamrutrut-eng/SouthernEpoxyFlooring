'use client';

import { useEffect, useRef } from 'react';

// Dimmed looping b-roll of an install in progress, pinned behind every
// section after the hero. Pauses off-screen, skipped entirely for
// reduced-motion visitors.
export default function WorkLoopBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.remove();
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div className="hero-pane" style={{ position: 'sticky', top: 0 }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/work-loop.mp4" type="video/mp4" />
          <source src="/work-loop.webm" type="video/webm" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(rgba(5,5,5,0.9), rgba(5,5,5,0.78) 40%, rgba(5,5,5,0.86))',
          }}
        />
      </div>
    </div>
  );
}
