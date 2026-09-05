import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

/** Organization structured data, emitted once from the root layout. */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    // Only published once a real company inbox exists.
    ...(siteConfig.publicEmail ? { email: siteConfig.publicEmail } : {}),
    foundingDate: String(siteConfig.founded),
    founder: {
      '@type': 'Person',
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
    },
    address: siteConfig.locations.map((location) => ({
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressCountry: location.countryCode,
    })),
    contactPoint: siteConfig.locations.map((location) => ({
      '@type': 'ContactPoint',
      ...(siteConfig.publicEmail
        ? { email: siteConfig.publicEmail }
        : { url: `${siteConfig.url}${paths.contact}` }),
      contactType: 'sales',
      areaServed: location.countryCode,
      availableLanguage: ['en', 'de', 'ur'],
    })),
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
