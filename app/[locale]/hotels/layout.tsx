import { Metadata } from 'next';
import { generateAlternateUrls, generateStaticPageCanonicalUrl, getCanonicalBaseUrl } from '@/lib/canonical';
import { localeFromParam } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = localeFromParam(params.locale);
  const baseUrl = getCanonicalBaseUrl();
  const canonicalUrl = generateStaticPageCanonicalUrl('hotels', locale);
  
  return {
    title: {
      template: `%s | ☎ 𝟖8𝟖-𝟑1𝟗-𝟔𝟐0𝟔`,
      default: `Hotels Near US Airports - Find Airport Hotels in America | ☎ 𝟖8𝟖-𝟑1𝟗-𝟔𝟐0𝟔`
    },
    description: 'Discover the best hotels near major US airports including LAX, JFK, ATL, ORD, DFW, and more. Find comfortable accommodations with airport shuttle service, great amenities, and competitive rates.',
    keywords: [
      'airport hotels',
      'US airport hotels',
      'hotels near LAX',
      'hotels near JFK',
      'hotels near ATL',
      'hotels near ORD',
      'hotels near DFW',
      'airport shuttle hotels',
      'hotel booking',
      'airport accommodation',
      'US hotels',
      'airport proximity hotels',
      'hotels near airports',
      'airport hotel deals',
      'convenient airport hotels'
    ],
    authors: [{ name: `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'} Team` }],
    creator: process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom',
    publisher: process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateUrls('/hotels')
    },
    openGraph: {
      title: 'Hotels Near US Airports - Find Airport Hotels in America',
      description: 'Discover the best hotels near major US airports including LAX, JFK, ATL, ORD, DFW, and more. Find comfortable accommodations with airport shuttle service, great amenities, and competitive rates.',
      url: canonicalUrl,
      siteName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/airport-hotels-og.jpg`,
          width: 1200,
          height: 630,
          alt: `US Airport Hotels - ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hotels Near US Airports - Find Airport Hotels in America',
      description: 'Discover the best hotels near major US airports including LAX, JFK, ATL, ORD, DFW, and more. Find comfortable accommodations with airport shuttle service, great amenities, and competitive rates.',
      images: [`${baseUrl}/images/airport-hotels-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
