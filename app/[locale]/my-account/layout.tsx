import { Metadata } from 'next';
import { generateAlternateUrls, generateStaticPageCanonicalUrl, getCanonicalBaseUrl } from '@/lib/canonical';
import { localeFromParam } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = localeFromParam(params.locale);
  const baseUrl = getCanonicalBaseUrl();
  const canonicalUrl = generateStaticPageCanonicalUrl('my-account', locale);
  
  return {
    title: {
      template: `%s | ☎ 𝟖8𝟖-𝟑1𝟗-𝟔𝟐0𝟔`,
      default: `My Account - Manage Your Travel Profile | ☎ 𝟖8𝟖-𝟑1𝟗-𝟔𝟐0𝟔`
    },
    description: `Manage your ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'} account, view booking history, update travel preferences, and access exclusive member benefits.`,
    keywords: [
      'my account',
      'user dashboard',
      'travel profile',
      'booking history',
      'travel preferences',
      'member benefits',
      'flight bookings',
      'hotel bookings',
      'travel management'
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
      languages: generateAlternateUrls('/my-account')
    },
    openGraph: {
      title: 'My Account - Manage Your Travel Profile',
      description: `Manage your ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'} account, view booking history, update travel preferences, and access exclusive member benefits.`,
      url: canonicalUrl,
      siteName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/account-dashboard-og.jpg`,
          width: 1200,
          height: 630,
          alt: `My Account Dashboard - ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'My Account - Manage Your Travel Profile',
      description: `Manage your ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'AirlineFrom'} account, view booking history, update travel preferences, and access exclusive member benefits.`,
      images: [`${baseUrl}/images/account-dashboard-og.jpg`],
    },
    robots: {
      index: false, // Private page, don't index
      follow: true,
    },
  };
}

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
