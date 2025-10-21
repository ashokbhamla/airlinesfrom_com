import { Metadata } from 'next';
import { generateAlternateUrls } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://airlinefrom.com';
  
  return {
    title: {
      template: `%s | ☎ 𝟖𝟖𝟖-𝟑𝟏𝟗-𝟔𝟐𝟎𝟔`,
      default: `Airlines - Compare US Airlines & Find Best Flight Deals | ☎ 𝟖𝟖𝟖-𝟑𝟏𝟗-𝟔𝟐𝟎𝟔`
    },
    description: 'Compare major US airlines including American Airlines, Delta, United, Southwest, and more. Find the best flight deals, routes, and airline information for domestic and international travel.',
    keywords: [
      'airlines',
      'US airlines',
      'American Airlines',
      'Delta Airlines',
      'United Airlines',
      'Southwest Airlines',
      'flight comparison',
      'airline deals',
      'domestic flights',
      'international flights',
      'flight search',
      'cheap flights',
      'airline routes',
      'flight booking'
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
      canonical: `${baseUrl}/${locale}/airlines`,
      languages: generateAlternateUrls('/airlines')
    },
    openGraph: {
      title: 'Airlines - Compare US Airlines & Find Best Flight Deals',
      description: 'Compare major US airlines including American Airlines, Delta, United, Southwest, and more. Find the best flight deals and routes.',
      url: `${baseUrl}/${locale}/airlines`,
      siteName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/airlines-og.jpg`,
          width: 1200,
          height: 630,
          alt: `US Airlines Comparison - ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Airlines - Compare US Airlines & Find Best Flight Deals',
      description: 'Compare major US airlines including American Airlines, Delta, United, Southwest, and more. Find the best flight deals and routes.',
      images: [`${baseUrl}/images/airlines-og.jpg`],
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

export default function AirlinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
