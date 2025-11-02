import { Locale } from './i18n';
import { getCurrentDomain, getCurrentDomainWithRequest } from './getCurrentDomain';

/**
 * Generate canonical URL with request context (for server-side rendering)
 * @param path - The path without locale prefix
 * @param locale - The locale
 * @param request - The request object (optional)
 * @returns Full canonical URL
 */
export function generateCanonicalUrlWithRequest(
  path: string, 
  locale: Locale, 
  request?: { headers: { host?: string } }
): string {
  const baseUrl = getCurrentDomainWithRequest(request);
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For English (default), don't include /en/ prefix
  if (locale === 'en') {
    return `${baseUrl}/${cleanPath}`;
  }
  
  // For other locales, include locale prefix
  return `${baseUrl}/${locale}/${cleanPath}`;
}

/**
 * Generate canonical URL for any page with proper language support
 * @param path - The path without locale prefix (e.g., '/flights/lax-was')
 * @param locale - The locale ('en' or 'es')
 * @returns Full canonical URL
 */
export function generateCanonicalUrl(path: string, locale: Locale): string {
  const baseUrl = getCurrentDomain();
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For English (default), don't include /en/ prefix
  if (locale === 'en') {
    return `${baseUrl}/${cleanPath}`;
  }
  
  // For Spanish, include /es/ prefix
  return `${baseUrl}/es/${cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang
 * @param path - The path without locale prefix
 * @returns Object with language codes as keys and URLs as values
 */
export function generateAlternateUrls(path: string): Record<string, string> {
  const baseUrl = getCurrentDomain();
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return {
    'en': `${baseUrl}/${cleanPath}`,
    'es': `${baseUrl}/es/${cleanPath}`,
    'ru': `${baseUrl}/ru/${cleanPath}`,
    'fr': `${baseUrl}/fr/${cleanPath}`,
    'en-US': `${baseUrl}/${cleanPath}`,
    'es-ES': `${baseUrl}/es/${cleanPath}`,
    'ru-RU': `${baseUrl}/ru/${cleanPath}`,
    'fr-FR': `${baseUrl}/fr/${cleanPath}`,
  };
}

/**
 * Generate canonical URL for flight pages
 * @param slug - Flight slug (e.g., 'lax-was')
 * @param locale - The locale
 * @returns Canonical URL for flight page
 */
export function generateFlightCanonicalUrl(slug: string, locale: Locale): string {
  return generateCanonicalUrl(`/flights/${slug}`, locale);
}

/**
 * Generate canonical URL for airport pages
 * @param slug - Airport slug (e.g., 'a-a-bere-tallo-wata-abu-id')
 * @param locale - The locale
 * @returns Canonical URL for airport page
 */
export function generateAirportCanonicalUrl(slug: string, locale: Locale): string {
  return generateCanonicalUrl(`/airports/${slug}`, locale);
}

/**
 * Generate canonical URL for hotel pages
 * @param airportCode - Airport code (e.g., 'abu')
 * @param locale - The locale
 * @returns Canonical URL for hotel page
 */
export function generateHotelCanonicalUrl(airportCode: string, locale: Locale): string {
  return generateCanonicalUrl(`/hotels/${airportCode}-airport-hotels`, locale);
}

/**
 * Generate canonical URL for airline pages
 * @param airline - Airline code (e.g., 'india-ai-aic-in')
 * @param route - Route slug (optional)
 * @param locale - The locale
 * @returns Canonical URL for airline page
 */
export function generateAirlineCanonicalUrl(airline: string, route?: string, locale: Locale = 'en'): string {
  if (route) {
    return generateCanonicalUrl(`/airlines/${airline}/${route}`, locale);
  }
  return generateCanonicalUrl(`/airlines/${airline}`, locale);
}

/**
 * Generate canonical URL for flights from airport pages
 * @param airport - Airport code (e.g., 'lax')
 * @param locale - The locale
 * @returns Canonical URL for flights from airport page
 */
export function generateFlightsFromCanonicalUrl(airport: string, locale: Locale): string {
  return generateCanonicalUrl(`/flights/from/${airport}`, locale);
}

/**
 * Generate canonical URL for airport terminal pages (airline-airport pages)
 * @param airline - Airline code (e.g., 'v7')
 * @param airport - Airport code (e.g., 'agp')
 * @param locale - The locale
 * @returns Canonical URL for airport terminal page
 */
export function generateAirportTerminalCanonicalUrl(airline: string, airport: string, locale: Locale = 'en'): string {
  return generateCanonicalUrl(`/airportsterminal/${airline}/${airport}`, locale);
}

/**
 * Generate canonical URL for static pages
 * @param page - Page path (e.g., 'about-us', 'contact-us')
 * @param locale - The locale
 * @returns Canonical URL for static page
 */
export function generateStaticPageCanonicalUrl(page: string, locale: Locale): string {
  return generateCanonicalUrl(`/${page}`, locale);
}
