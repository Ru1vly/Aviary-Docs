import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/Aviary-Docs' : '');
  const basePath = rawBasePath.replace(/\/+$/, '');

  return {
    name: 'Aviary | Automated Website Auditing',
    short_name: 'Aviary',
    description: 'Automated real-browser website auditing engine for SEO, performance, accessibility, security, and UX.',
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#0C0D0C',
    theme_color: '#E0B15A',
    icons: [
      {
        src: `${basePath}/icon.svg`,
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: `${basePath}/apple-touch-icon.png`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
