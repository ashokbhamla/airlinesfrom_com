# 🚀 Fix Vercel Deployment - AirlineFrom

## 🔴 Problem
Your live site at https://airlinefrom.com/airlines/ai/del is showing:
- ❌ Placeholder text: `{airlineName}`, `{departureCity}`, `{arrivalCity}`  
- ❌ Zero prices: `$0`
- ❌ Hardcoded fallback charts instead of real data
- ❌ "No FAQs available from the API"

## ✅ Solution
The APIs work fine (tested successfully), but **environment variables are missing on Vercel**.

---

## 📋 Required Environment Variables

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

### 1. API Configuration (CRITICAL)
```env
NEXT_PUBLIC_API_BASE=https://api.triposia.com
NEXT_PUBLIC_API_REAL=https://api.triposia.com
NEXT_PUBLIC_API_CONTENT=https://api.triposia.com
```

### 2. Domain Configuration
```env
NEXT_PUBLIC_DOMAIN=https://airlinefrom.com
NEXT_PUBLIC_COMPANY_NAME=airlinefrom.com
NEXT_PUBLIC_COMPANY_EMAIL=support@airlinefrom.com
NEXT_PUBLIC_COMPANY_PHONE=+1-888-319-6206
```

### 3. Branding
```env
NEXT_PUBLIC_HEADER_TITLE=AirlineFrom
NEXT_PUBLIC_SITE_NAME=AirlineFrom
NEXT_PUBLIC_SITE_AUTHOR=AirlineFrom Team
NEXT_PUBLIC_SITE_URL=https://airlinefrom.com
```

### 4. Social Media
```env
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/airlinesfrom
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/airlinesfrom
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/airlinesfrom
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/airlinesfrom
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/airlinesfrom
```

### 5. CDN
```env
NEXT_PUBLIC_CDN_BASE=https://storage.googleapis.com/web-unified-atom-469911-j9
NEXT_PUBLIC_CDN_IMAGES=https://storage.googleapis.com/web-unified-atom-469911-j9/images
NEXT_PUBLIC_CDN_ICONS=https://storage.googleapis.com/web-unified-atom-469911-j9/icons
NEXT_PUBLIC_CDN_LOGO=https://storage.googleapis.com/web-unified-atom-469911-j9/logo
```

### 6. CRM Configuration (Optional)
```env
CUSTOM_CRM_URL=https://dashboard-alpha-one-85.vercel.app/api/webhooks/leads
CRM_WEBHOOK_API_KEY=a71a000b53d3ed32854cf5086f773403fca323adcab0d226e9d9d8a80759442b
```

### 7. Redis Cache (Optional - for better performance)
```env
UPSTASH_REDIS_REST_URL=<your_redis_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_token>
```

---

## 🛠️ Steps to Fix

### Step 1: Add Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project: **airlinesfrom_com**
3. Click: **Settings** → **Environment Variables**
4. For each variable above:
   - Click **Add New**
   - Name: (e.g., `NEXT_PUBLIC_API_BASE`)
   - Value: (e.g., `https://api.triposia.com`)
   - Select: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

### Step 2: Redeploy

After adding all variables:

**Option A: Redeploy via Dashboard**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. ✅ Check **Use existing Build Cache** (faster)
6. Click **Redeploy**

**Option B: Redeploy via CLI**
```bash
npm install -g vercel
vercel --prod
```

### Step 3: Verify

After redeployment completes (~2-5 minutes):

1. Visit: https://airlinefrom.com/airlines/ai/del
2. You should see:
   - ✅ **Real airline name**: "Air India"
   - ✅ **Real city names**: "Delhi" 
   - ✅ **Real prices**: from API data
   - ✅ **FAQs**: from Content API
   - ✅ **Charts**: Real weekly/monthly price data

---

## 🧪 Test API Calls

To verify APIs are working after deployment:

```bash
# Test Content API
curl "https://api.triposia.com/content/airlines?airline_code=ai&departure_iata=del&lang_id=1&domain_id=1"

# Test Real API  
curl "https://api.triposia.com/real/airlines?airline_code=ai&departure_iata=del&lang_id=1&domain_id=1"
```

---

## ⚠️ Common Issues

### Issue 1: Still showing placeholders after redeploy
**Solution**: Clear Vercel build cache
1. Go to Deployments
2. Click **Redeploy**
3. ❌ **Uncheck** "Use existing Build Cache"
4. Redeploy

### Issue 2: APIs timing out
**Solution**: Increase function timeout in `vercel.json`:
```json
{
  "functions": {
    "app/[locale]/airlines/[airline]/[route]/page.tsx": {
      "maxDuration": 60
    }
  }
}
```

### Issue 3: Environment variables not taking effect
**Solution**: Make sure variables apply to all environments:
- ✅ Production
- ✅ Preview  
- ✅ Development

---

## 📊 Expected Results

### Before Fix:
- Title: `{airlineName} flights from {departureCity} to {arrivalCity}`
- Prices: `$0`
- Flights: `0 flights`
- Data: Hardcoded fallbacks

### After Fix:
- Title: `Air India flights from Delhi to Various Destinations`
- Prices: From API (e.g., `$85`, `$72`, `$104`)
- Flights: Real flight count from API
- Data: Live API data with fallbacks only if API fails

---

## 🔗 Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs/concepts/projects/environment-variables
- API Test Results: See curl commands above

---

## 💡 Pro Tips

1. **Use Environment Groups**: Group related variables in Vercel for easier management
2. **Enable Auto Redeploy**: Set up GitHub integration to auto-deploy on push
3. **Monitor API Calls**: Use Vercel Analytics to monitor API performance
4. **Set up Alerts**: Get notified if deployment fails

---

## ✅ Checklist

- [ ] Added all NEXT_PUBLIC_API_* variables
- [ ] Added all NEXT_PUBLIC_DOMAIN variables
- [ ] Added branding variables (AirlineFrom)
- [ ] Added social media URLs
- [ ] Added CDN configuration
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed the project
- [ ] Verified https://airlinefrom.com/airlines/ai/del shows real data
- [ ] Tested multiple routes to confirm

