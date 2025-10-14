import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { BaseNavigation } from '@/components/layout/BaseNavigation';
import { BaseFooter } from '@/components/layout/BaseFooter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Psicóloga em Outra Dimensão | Home',
  description: 'Blog de astrologia com humor! Descubra os segredos do zodíaco, compatibilidade amorosa e roasts cósmicos. Diversão garantida!',
  keywords: ['astrologia', 'zodíaco', 'signos', 'horóscopos', 'compatibilidade', 'mapa astral'],
  authors: [{ name: 'Psicóloga em Outra Dimensão' }],
  openGraph: {
    title: 'Psicóloga em Outra Dimensão',
    description: 'Blog de astrologia com humor! Descubra os segredos do zodíaco, compatibilidade amorosa e roasts cósmicos.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicóloga em Outra Dimensão',
    description: 'Blog de astrologia com humor! Descubra os segredos do zodíaco.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body">
        <BaseNavigation />
        {children}
        <BaseFooter />
      </body>
    </html>
  );
}
