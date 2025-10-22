import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const supportedLocales = ['en', 'es', 'ru', 'fr'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next();
  }

  // Normalize airline route URLs to lowercase
  // Pattern: /airlines/[airline]/[route] or /[locale]/airlines/[airline]/[route]
  const airlineRoutePattern = /^(\/[a-z]{2})?\/airlines\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)(?:\/.*)?$/i;
  const match = pathname.match(airlineRoutePattern);
  
  if (match) {
    const [, localePrefix, airlineCode, routeCode] = match;
    const normalizedAirlineCode = airlineCode.toLowerCase();
    const normalizedRouteCode = routeCode.toLowerCase();
    
    // If the codes are not already lowercase, redirect to lowercase version
    if (airlineCode !== normalizedAirlineCode || routeCode !== normalizedRouteCode) {
      const normalizedPath = `${localePrefix || ''}/airlines/${normalizedAirlineCode}/${normalizedRouteCode}`;
      const url = req.nextUrl.clone();
      url.pathname = normalizedPath;
      return NextResponse.redirect(url, 301); // Permanent redirect
    }
  }

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For all other routes, rewrite to include /en internally but don't show it in URL
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
