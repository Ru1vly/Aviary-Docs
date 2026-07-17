import type {Metadata} from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Aviary | SEO Auditing Suite',
  description: 'The SEO suite that fits directly into your development tools.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${serif.variable}`}>
      <body className="bg-[#FAF9F6] text-[#2C2E33] font-sans antialiased selection:bg-[#0EA5E9] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
