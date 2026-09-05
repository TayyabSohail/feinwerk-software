import { Metadata } from 'next';

import { env } from '@/env';

import { siteConfig } from './site';

export const appConfig = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords:
    'software engineering studio, full-stack development, AI development, cloud automation, Next.js agency, Germany, Pakistan',
  logo: '/brand/logo-mark.svg',
  defaultLocale: 'en-US',
  defaultCurrency: 'EUR',
  defaultCountryCode: 'DE',
  appUrl: env.NEXT_PUBLIC_APP_URL,
  appName: env.NEXT_PUBLIC_APP_NAME,
  emails: {
    support: siteConfig.email,
    sender: env.CONTACT_FROM_EMAIL ?? `Feinwerks Software <${siteConfig.email}>`,
  },
} as const;

export default function getMetadata(): Metadata {
  return {
    metadataBase: new URL(appConfig.appUrl),
    title: {
      template: `%s | ${appConfig.title}`,
      default: `${appConfig.title} | ${siteConfig.tagline}`,
    },
    description: appConfig.description,
    applicationName: appConfig.title,
    robots: { index: true, follow: true },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: '/apple-icon.png',
    },
    openGraph: {
      url: appConfig.appUrl,
      title: `${appConfig.title} | ${siteConfig.tagline}`,
      description: appConfig.description,
      siteName: appConfig.title,
      type: 'website',
      locale: appConfig.defaultLocale.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${appConfig.title} | ${siteConfig.tagline}`,
      description: appConfig.description,
    },
    keywords: appConfig.keywords.split(', '),
    creator: siteConfig.founder.name,
    category: 'technology',
  };
}
