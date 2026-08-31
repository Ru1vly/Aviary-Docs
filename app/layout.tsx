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
  title: 'Aviary | Automated website auditing',
  description: 'We open your site in a real browser and check SEO, performance, accessibility, security, and UX — on the page your visitors actually see.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${lancelot.variable} ${ubuntuMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
