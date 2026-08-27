import type { Metadata } from 'next';
import { Fraunces, Archivo } from 'next/font/google';
import './globals.css';
import business from '@/content/business.json';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-archivo',
  display: 'swap',
});

const cities = (business.serviceCities as string[]).filter(
  (c) => !c.toUpperCase().includes('TODO')
);
const cityPhrase = cities.length > 0 ? ` Serving ${cities.join(', ')}.` : '';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${business.domain}`),
  title: `Southern Epoxy Flooring | Premium Garage & Concrete Coatings in ${business.serviceArea}`,
  description:
    `Premium epoxy flooring and garage floor coatings across ${business.serviceArea}. ` +
    `100% solids epoxy, full-broadcast flake, and UV-stable polyaspartic topcoats — ` +
    `most floors installed in a day, built for decades.${cityPhrase} Book a free on-site estimate.`,
  keywords: [
    'epoxy flooring',
    'garage floor coating',
    'polyaspartic floor coating',
    'flake epoxy floor',
    'concrete coatings',
    'epoxy flooring South Georgia',
    'epoxy flooring North Florida',
    ...cities.map((c) => `epoxy flooring ${c}`),
  ],
  openGraph: {
    title: `Southern Epoxy Flooring | Premium Garage & Concrete Coatings in ${business.serviceArea}`,
    description:
      'Five engineered layers. One seamless finish. Built for decades. Book a free on-site estimate.',
    url: `https://${business.domain}`,
    siteName: business.name,
    locale: 'en_US',
    type: 'website',
    images: ['/og.jpg'],
  },
};

// Structured data for local search — only fields with real values are
// included (never TODO placeholders).
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: business.name,
  url: `https://${business.domain}`,
  email: business.email,
  description:
    'Premium epoxy and polyaspartic concrete floor coatings for garages, patios, basements, and commercial spaces.',
  areaServed:
    cities.length > 0
      ? cities.map((c) => ({ '@type': 'City', name: c }))
      : [
          { '@type': 'State', name: 'Georgia' },
          { '@type': 'State', name: 'Florida' },
        ],
  logo: `https://${business.domain}/logo.png`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
