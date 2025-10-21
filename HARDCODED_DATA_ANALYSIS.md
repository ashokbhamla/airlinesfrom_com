# Hardcoded Data Analysis for `/airlines/{airline}/{route}` Pages

## Summary
The airline route pages (`/airlines/ai/del`) use a **hybrid approach** combining API data with extensive hardcoded fallbacks. The file is **3,609 lines long**.

---

## 🔴 Hardcoded Data Used (Fallbacks)

### 1. **City Name Mappings** (Lines 71-114)
- **~44 major cities** hardcoded with IATA codes
- Used when API doesn't return city names
- Examples:
  ```typescript
  'LAX': 'Los Angeles'
  'DEL': 'Delhi'
  'JFK': 'New York'
  'BOM': 'Mumbai'
  ```

### 2. **Airline Code to Name Mappings** (Lines 120-144, 158-171)
- **~20 airline codes** mapped to airline names
- Two separate mappings (slug-to-code and code-to-name)
- Examples:
  ```typescript
  'ai': 'Air India'
  '6e': 'IndiGo'
  'uk': 'Vistara'
  ```

### 3. **Airport Coordinates** (Lines 192-249)
- **~58 major airport coordinates** hardcoded
- Used for map displays when API doesn't provide coordinates
- Format: `{ lat: number, lng: number }`

### 4. **Flight Schedule Data** (Lines 788-789, 795-821)
- Hardcoded departure times: `['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '08:00']`
- Days of week: `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`
- Used to generate flight cards when API returns single route object

### 5. **Price Data & Charts** (Lines 835-908)

#### Flight Deals (Lines 835-868)
- 4 hardcoded deal types: round-trip, one-way, popular month, cheapest day
- Fallback prices: `$104` (round-trip), `$72` (one-way)
- Fallback cheapest month: `'December'`
- Fallback cheapest day: `'Tuesday'`

#### Weekly Price Data (Lines 872-886)
```typescript
[
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 10 },
  { name: 'Wed', value: 12 },
  { name: 'Thu', value: 7 },
  { name: 'Fri', value: 10 },
  { name: 'Sat', value: 9 },
  { name: 'Sun', value: 8 }
]
```

#### Monthly Price Data (Lines 889-908)
- 12 months of hardcoded price data
- Range: `$140 - $190`

### 6. **Weather Data** (Lines 911-928)
- 12 months of hardcoded temperature data (Fahrenheit)
- Range: `57°F - 82°F`

### 7. **Rainfall Data** (Lines 930-947)
- 12 months of hardcoded rainfall data (inches)
- Range: `1.2 - 10.2 inches`

---

## 🟢 API Data Sources

The page fetches data from **multiple API endpoints**:

### API Calls Made (Lines 382-387, 656-665):

1. **Content API Calls:**
   - `fetchAirlineContent()` / `getCachedAirlineContent()`
   - `fetchAirlineAirportContent()` / `getCachedAirlineAirportContent()`
   
2. **Flight Data API Calls:**
   - `fetchAirlineData()` / `getCachedAirlineData()`
   - `fetchAirlineAirportData()` / `getCachedAirlineAirportData()`

3. **Additional API Calls:**
   - `fetchAirlineContactInfo()` / `getCachedAirlineContactInfo()`
   - `fetchCityByIata()` / `getCachedCityData()` (for departure and arrival cities)

### Data Prioritization Strategy:
```
API Data (Priority 1) → Cached API Data → Hardcoded Fallback (Priority 3)
```

---

## 📊 Data Usage Breakdown

| Data Type | Source | Fallback Strategy |
|-----------|--------|-------------------|
| **City Names** | API → Hardcoded map (44 cities) | Always available |
| **Airline Names** | Contact Info API → Content API → Hardcoded (20 airlines) | 3-tier fallback |
| **Airport Coords** | Flight Data API → Hardcoded (58 airports) | 2-tier fallback |
| **Flight Prices** | Content API → Flight Data API → Hardcoded | Dynamic or $72-$104 |
| **Weekly Prices** | Content API → Flight Data API → Hardcoded 7 days | Chart always renders |
| **Monthly Prices** | Content API → Flight Data API → Hardcoded 12 months | Chart always renders |
| **Weather** | Flight Data API → Hardcoded 12 months | Chart always renders |
| **Rainfall** | Flight Data API → Hardcoded 12 months | Chart always renders |
| **Flight Schedule** | Flight Data API → Generated from day flags | Dynamic generation |

---

## 🎯 Key Findings

### Strengths:
1. ✅ **Robust fallback system** - Page never breaks even if all APIs fail
2. ✅ **Mixed data strategy** - Tries real API data first before fallbacks
3. ✅ **Caching layer** - Uses `getCached*()` functions for performance
4. ✅ **Major airports covered** - 58 airports with coordinates
5. ✅ **Reasonable defaults** - Hardcoded data looks realistic

### Concerns:
1. ⚠️ **Heavy hardcoding** - Hundreds of lines of fallback data
2. ⚠️ **Maintenance burden** - Need to update ~180+ hardcoded mappings
3. ⚠️ **Scalability issues** - Won't scale to all global airports/cities
4. ⚠️ **Potentially misleading** - Users might see generic data thinking it's real
5. ⚠️ **Duplicate code** - Same mappings might exist in multiple files

---

## 💡 Recommendations

### Short-term:
1. Add clear indicators when displaying fallback data vs real API data
2. Log when fallbacks are used for monitoring
3. Create a centralized constants file for all mappings

### Long-term:
1. **Move hardcoded mappings to database** - Make them dynamic and updateable
2. **Add data source indicators** - Show users if data is estimated or real
3. **Improve API reliability** - Reduce need for fallbacks
4. **Use 3rd party data** - Integrate OpenFlights data for airport/airline info
5. **Consider using environment variables** - For frequently changing defaults

---

## 📝 Example: What User Sees on `/airlines/ai/del`

**IF APIs work:**
- Real Air India contact info
- Real flight prices from Delhi
- Real weekly/monthly price trends
- Real weather data for Delhi

**IF APIs fail:**
- Airline: "Air India" (from hardcoded map)
- City: "Delhi" (from hardcoded map)
- Prices: $72 one-way, $104 round-trip
- Weekly prices: Mon $12, Tue $10, etc. (generic data)
- Monthly prices: Jan $150, Feb $140, etc. (generic data)
- Weather: 57°F-82°F range (generic data)

---

## File Structure
- **Total Lines:** 3,609
- **Estimated Hardcoded Data:** ~250-300 lines (~8% of file)
- **API Integration Code:** ~200 lines (~5% of file)
- **Component/UI Code:** ~3,100 lines (~87% of file)

