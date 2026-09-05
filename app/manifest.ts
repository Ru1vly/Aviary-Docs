import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aviary | Automated Website Auditing',
    short_name: 'Aviary',
    description: 'Automated real-browser website auditing engine for SEO, performance, accessibility, security, and UX.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0C0D0C',
    theme_color: '#E0B15A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
