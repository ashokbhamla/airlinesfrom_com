# Sitemap Setup for AirlinesFrom.com

## Environment Variables

Add these to your `.env.local` file:

```bash
CRON_SECRET=airlinesfrom-sitemap-secret-2024
VERCEL_URL=https://airlinefrom.com
```

## Sitemap URLs

After deployment, your sitemaps will be available at:

- **Main Sitemap Index**: `https://airlinefrom.com/sitemap.xml`
- **Category Sitemaps**:
  - `https://airlinefrom.com/sitemap-flightsone_pages.xml`
  - `https://airlinefrom.com/sitemap-flightsround_pages.xml`
  - `https://airlinefrom.com/sitemap-airlinesround_pages.xml`
  - `https://airlinefrom.com/sitemap-airlinesone_pages.xml`
  - `https://airlinefrom.com/sitemap-airport_pages.xml`
  - `https://airlinefrom.com/sitemap-airlines_pages.xml`
  - `https://airlinefrom.com/sitemap-airport_hotels.xml`

## API Endpoints

- **Status Check**: `https://airlinefrom.com/api/sitemap/status`
- **Manual Update**: `https://airlinefrom.com/api/cron/sitemap-update`

## Cron Job

The sitemap will automatically update every Sunday at 2 AM UTC via Vercel cron jobs.

## Manual Testing

Test the cron endpoint manually:
```bash
curl -H "Authorization: Bearer airlinesfrom-sitemap-secret-2024" \
  https://airlinefrom.com/api/cron/sitemap-update
```
