import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistMono = localFont({
  src: [
    { path: './fonts/GeistMono-VariableFont_wght.ttf', weight: '100 900', style: 'normal' },
    { path: './fonts/GeistMono-Italic-VariableFont_wght.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

const lancelot = localFont({
  src: [{ path: './fonts/Lancelot-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-lancelot',
  display: 'swap',
});

const ubuntuMono = localFont({
  src: [
    { path: './fonts/UbuntuMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/UbuntuMono-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/UbuntuMono-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-ubuntu-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aviary-docs.vercel.app'),
  title: {
    default: 'Aviary | Automated website auditing',
    template: '%s | Aviary',
  },
  description: 'Automated real-browser website auditing engine with 235 checks across 28 categories: SEO, performance, accessibility, security, and UX.',
  keywords: [
    'SEO',
    'website audit',
    'automated auditing',
    'accessibility checker',
    'core web vitals',
    'performance testing',
    'playwright audit',
    'technical SEO',
  ],
  authors: [{ name: 'Aviary Contributors', url: 'https://github.com/Ru1vly/Aviary' }],
  creator: 'Aviary',
  publisher: 'Aviary',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aviary | Automated website auditing',
    description: 'We open your site in a real browser and check SEO, performance, accessibility, security, and UX — on the page your visitors actually see.',
    url: 'https://aviary-docs.vercel.app',
    siteName: 'Aviary',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'Aviary Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviary | Automated website auditing',
    description: 'We open your site in a real browser and check SEO, performance, accessibility, security, and UX — on the page your visitors actually see.',
    images: ['/icon.svg'],
    creator: '@aviary',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aviary',
  url: 'https://aviary-docs.vercel.app',
  description: 'Automated real-browser website auditing engine with 235 checks across 28 categories',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aviary',
  url: 'https://aviary-docs.vercel.app',
  logo: 'https://aviary-docs.vercel.app/icon.svg',
  sameAs: ['https://github.com/Ru1vly/Aviary'],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aviary',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Real-browser website auditing engine for SEO, performance, accessibility, security, and UX.',
  url: 'https://aviary-docs.vercel.app',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://aviary-docs.vercel.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Docs',
      item: 'https://aviary-docs.vercel.app/docs',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${lancelot.variable} ${ubuntuMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#f4f2ec] focus:text-[#0c0d0c] focus:font-mono focus:text-sm focus:rounded"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
