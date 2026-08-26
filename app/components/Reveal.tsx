'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Shared scroll-entrance: y 24 -> 0, opacity 0 -> 1, once, with a
// per-element stagger passed in as `order` (100ms steps).
export default function Reveal({
  children,
  order = 0,
  style,
  className,
}: {
  children: ReactNode;
  order?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: order * 0.1,
        ease: [0.25, 0, 0, 1],
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
