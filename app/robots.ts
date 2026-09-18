import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? 'https://ru1vly.github.io/Aviary-Docs' : 'https://aviary-docs.vercel.app');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
