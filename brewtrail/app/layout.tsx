import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'BrewTrail — Discover Your Next Craft Beer Adventure',
  description:
    'Plan the perfect brewery trail in any city. Discover hidden gems, check live weather, and share your route with friends.',
  keywords: ['craft beer', 'brewery', 'beer trail', 'brewery tour', 'tap room'],
  openGraph: {
    title: 'BrewTrail',
    description: 'Discover & plan craft brewery trails near you.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
