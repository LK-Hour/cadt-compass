# Free Map Solution - Leaflet + OpenStreetMap

## ✅ Why This Solution is Better (for your case)

1. **Completely FREE** - No API keys required
2. **No payment setup** - Works immediately
3. **No quotas or limits** - Unlimited usage
4. **Open source** - Leaflet is the leading open-source mapping library
5. **Same navigation feature** - Still opens Google Maps for turn-by-turn directions

## How It Works

### Map Display
- **Leaflet** - Open-source JavaScript library for interactive maps
- **OpenStreetMap** - Free, editable map of the world (like Wikipedia for maps)
- No account or API key needed!

### Navigation Feature
- When you click "Navigate Here" button
- Opens Google Maps website with directions
- Works without Google Maps API key
- Users can get turn-by-turn navigation

## Features Included

✅ **Interactive Map**
- Zoom in/out
- Pan around campus
- Click markers for details

✅ **Red Markers** - Buildings
- Shows building code and name
- Floor count and room count
- Description
- Navigate button

✅ **Blue Markers** - Points of Interest
- Cafeterias, libraries, ATMs, etc.
- Shows type and location
- Navigate button

✅ **Popups**
- Click any marker to see details
- Full information display
- One-click navigation

## Technology Stack

```
Frontend Map:
├── Leaflet v1.9.4 (FREE)
├── React-Leaflet v5.0.0 (FREE)
├── OpenStreetMap Tiles (FREE)
└── Custom colored markers (FREE)

Navigation:
└── Google Maps URL scheme (FREE)
```

## CADT Campus Location

Coordinates: `11.5449°N, 104.8925°E`
- Located in Phnom Penh, Cambodia
- Zoom level: 17 (perfect for campus view)

## How Navigation Works

When user clicks "Navigate Here":
1. Creates Google Maps URL with destination coordinates
2. Opens in new tab: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`
3. User's device shows route from current location
4. Works on desktop and mobile
5. No API key required!

## Advantages Over Google Maps

| Feature | Leaflet (Current) | Google Maps |
|---------|------------------|-------------|
| Cost | FREE ✅ | Requires payment 💳 |
| API Key | Not needed ✅ | Required ❌ |
| Setup | Instant ✅ | Complex setup ❌ |
| Quotas | Unlimited ✅ | 28K loads/month ⚠️ |
| Navigation | Yes (via URL) ✅ | Yes ✅ |
| Customization | High ✅ | Limited ⚠️ |

## Running the Application

```bash
# Start backend
cd cadt-compass
npm run dev:api

# Start frontend (in another terminal)
npm run dev:web

# Or both at once
npm run dev
```

Then visit: http://localhost:3000/map

## Credits

- **Leaflet** - https://leafletjs.com/
- **OpenStreetMap** - https://www.openstreetmap.org/
- **React-Leaflet** - https://react-leaflet.js.org/
- **Marker Icons** - https://github.com/pointhi/leaflet-color-markers
