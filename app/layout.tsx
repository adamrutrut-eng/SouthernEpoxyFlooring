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
  title:
    'Southern Epoxy Flooring | Premium Garage & Concrete Coatings in Georgia',
  description:
    `Premium epoxy flooring and garage floor coatings across ${business.state}. ` +
    `100% solids epoxy, full-broadcast flake, and UV-stable polyaspartic topcoats — ` +
    `installed in one day, built for decades.${cityPhrase} Book a free on-site estimate.`,
  keywords: [
    'epoxy flooring',
    'garage floor coating',
    'polyaspartic floor coating',
    'flake epoxy floor',
    'concrete coatings',
    `epoxy flooring ${business.state}`,
    ...cities.map((c) => `epoxy flooring ${c}`),
  ],
  openGraph: {
    title:
      'Southern Epoxy Flooring | Premium Garage & Concrete Coatings in Georgia',
    description:
      'Five engineered layers. One seamless finish. Installed in a day, built for decades. Book a free on-site estimate.',
    url: `https://${business.domain}`,
    siteName: business.name,
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
