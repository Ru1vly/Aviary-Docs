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

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/Aviary-Docs' : '');
const basePath = rawBasePath.replace(/\/+$/, '');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? 'https://ru1vly.github.io/Aviary-Docs' : 'https://aviary-docs.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: 'Aviary',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Aviary — Automated Real-Browser Website Auditing',
      },
      {
        url: '/og-square.png',
        width: 600,
        height: 600,
        type: 'image/png',
        alt: 'Aviary Logo & Audit Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviary | Automated website auditing',
    description: 'We open your site in a real browser and check SEO, performance, accessibility, security, and UX — on the page your visitors actually see.',
    images: ['/og-image.png'],
    creator: '@aviary',
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico` },
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png` },
    ],
  },
  manifest: `${basePath}/manifest.webmanifest`,
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aviary',
  url: siteUrl,
  description: 'Automated real-browser website auditing engine with 235 checks across 28 categories',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aviary',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
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
  url: siteUrl,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Docs',
      item: `${siteUrl}/docs`,
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:w-auto focus:h-auto focus:min-w-[44px] focus:min-h-[44px] focus:px-4 focus:py-2 focus:bg-[#f4f2ec] focus:text-[#0c0d0c] focus:font-mono focus:text-sm focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E0B15A]"
        >
          Skip to content
        </a>
        <script
          id="gtag-and-a11y-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              (function(){
                function mark(root){
                  if(!root) return;
                  if(root.tagName === 'SCRIPT') root.setAttribute('aria-hidden', 'true');
                  if(root.querySelectorAll) {
                    root.querySelectorAll('script').forEach(function(s){ s.setAttribute('aria-hidden', 'true'); });
                  }
                }
                mark(document.documentElement);
                if(typeof MutationObserver !== 'undefined'){
                  new MutationObserver(function(mutations){
                    for(var i=0; i<mutations.length; i++){
                      var nodes = mutations[i].addedNodes;
                      for(var j=0; j<nodes.length; j++){ mark(nodes[j]); }
                    }
                  }).observe(document.documentElement, { childList: true, subtree: true });
                }
                window.addEventListener('DOMContentLoaded', function(){ mark(document.documentElement); });
                window.addEventListener('load', function(){ mark(document.documentElement); });
              })();
            `,
          }}
        />
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
