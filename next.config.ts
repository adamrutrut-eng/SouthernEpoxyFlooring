import type { NextConfig } from 'next';

// Fully static site: Formspree handles the quote form, so there is no
// server code — `next build` emits plain HTML/assets into out/ that any
// static host (Netlify) serves directly.
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
