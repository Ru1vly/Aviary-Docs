import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? 'https://ru1vly.github.io/Aviary-Docs' : 'https://www.aviary-rs.com');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aviary | Open-Source SEO & GEO Website Audit Tool',
    template: '%s | Aviary',
  },
  description: 'Open-source SEO and GEO (generative engine optimization) audits in a real browser: technical SEO, Core Web Vitals, structured data, and AI crawler visibility. Readable reports, add to CI.',
  keywords: [
    'SEO',
    'GEO',
    'generative engine optimization',
    'AI search visibility',
    'AI crawler audit',
    'LLM visibility',
    'AI Overviews',
    'answer engine optimization',
    'technical SEO',
    'technical SEO audit',
    'website audit',
    'SEO audit tool',
    'open source SEO tool',
    'website audit tool',
    'on-page SEO',
    'structured data',
    'schema markup',
    'accessibility checker',
    'core web vitals',
    'performance testing',
    'playwright audit',
  ],
  authors: [{ name: 'Aviary Contributors', url: 'https://github.com/Ru1vly/Aviary' }],
  creator: 'Aviary',
  publisher: 'Aviary',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aviary | Open-Source SEO & GEO Website Audit Tool',
    description: 'We open your site in a real browser and check technical SEO, Core Web Vitals, structured data, accessibility, security, and GEO — AI crawler and AI search visibility — on the page your visitors actually see.',
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
        alt: 'Aviary — Open-Source SEO & GEO Real-Browser Website Auditing',
      },
      {
        url: '/og-square.png',
        width: 600,
        height: 600,
        type: 'image/png',
        alt: 'Aviary Logo — SEO & GEO Audit Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviary | Open-Source SEO & GEO Website Audit Tool',
    description: 'We open your site in a real browser and check technical SEO, Core Web Vitals, structured data, accessibility, security, and GEO — AI crawler and AI search visibility — on the page your visitors actually see.',
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
  description: 'Open-source SEO and GEO (generative engine optimization) audits for your development workflow — technical SEO, AI crawler visibility, and Core Web Vitals.',
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
  description: 'Real-browser SEO and GEO website auditing engine for technical SEO, Core Web Vitals, structured data, accessibility, security, and AI crawler visibility.',
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
        <SpeedInsights />
      </body>
    </html>
  );
}
