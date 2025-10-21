import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://airlinesfrom.com';
  
  // Point to the generated sitemap index
  return [{
    url: `${baseUrl}/sitemaps/sitemap.xml`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0
  }];
}