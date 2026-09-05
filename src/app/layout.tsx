import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

import { Cursor } from '@/components/effects/cursor';
import { SpotlightEffect } from '@/components/effects/spotlight';
import { Backdrop } from '@/components/layout/backdrop';
import { CookieConsent } from '@/components/layout/cookie-consent';
import { DynamicFavicon } from '@/components/layout/dynamic-favicon';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Preloader } from '@/components/layout/preloader';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import PosthogAnalytics from '@/components/posthog/analytics';
import { OrganizationJsonLd } from '@/components/seo/json-ld';

import getMetadata from '@/config/app';
import { getDictionary } from '@/i18n/server';

import AppProviders from './providers';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = getMetadata();

export const viewport: Viewport = {
  themeColor: '#f5f5f3',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();

  return (
    <html lang={dict.locale}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <AppProviders>
          <SmoothScroll>
            <PosthogAnalytics />
            <DynamicFavicon />
            <OrganizationJsonLd />
            <Toaster richColors position='bottom-center' />
            <Preloader />
            <ScrollProgress />
            <Backdrop />
            <SpotlightEffect />
            <Cursor />
            <Header dict={dict} />
            <main id='main' className='relative'>
              {children}
            </main>
            <Footer dict={dict} />
            <CookieConsent />
          </SmoothScroll>
        </AppProviders>
      </body>
    </html>
  );
}
