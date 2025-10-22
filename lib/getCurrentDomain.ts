/**
 * Get the current domain dynamically
 * This function tries multiple methods to determine the current domain
 */

export function getCurrentDomain(): string {
  // Method 1: Try environment variable first
  if (process.env.NEXT_PUBLIC_DOMAIN) {
    return process.env.NEXT_PUBLIC_DOMAIN;
  }

  // Method 2: Try Vercel environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Method 3: Try other common environment variables
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Method 4: Fallback to default domain
  return 'https://airlinefrom.com';
}

/**
 * Get the current domain for client-side usage
 * This function can be used in client components
 */
export function getCurrentDomainClient(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  return getCurrentDomain();
}

/**
 * Get the current domain with request context (for server-side rendering)
 * @param request - The request object with headers
 * @returns The current domain URL
 */
export function getCurrentDomainWithRequest(request?: { headers: { host?: string } }): string {
  // Method 1: Try environment variable first
  if (process.env.NEXT_PUBLIC_DOMAIN) {
    return process.env.NEXT_PUBLIC_DOMAIN;
  }

  // Method 2: Try Vercel environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Method 3: Use request headers if available
  if (request?.headers?.host) {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return `${protocol}://${request.headers.host}`;
  }

  // Method 4: Try other common environment variables
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Method 5: Fallback to default domain
  return 'https://airlinefrom.com';
}
