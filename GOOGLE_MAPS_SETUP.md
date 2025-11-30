# Google Maps API Setup Guide

## Get Your Google Maps API Key

Follow these steps to get a free Google Maps API key:

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select a Project
- Click on the project dropdown at the top
- Click "New Project"
- Enter project name (e.g., "CADT Compass")
- Click "Create"

### 3. Enable Maps JavaScript API
- In the search bar, type "Maps JavaScript API"
- Click on "Maps JavaScript API"
- Click "Enable"

### 4. Create API Key
- Go to "Credentials" in the left sidebar
- Click "Create Credentials" → "API Key"
- Copy the generated API key

### 5. (Optional) Restrict API Key
For security, restrict your API key:
- Click on your API key to edit it
- Under "Application restrictions":
  - Select "HTTP referrers (web sites)"
  - Add: `http://localhost:3000/*`
- Under "API restrictions":
  - Select "Restrict key"
  - Select "Maps JavaScript API"
- Click "Save"

### 6. Add API Key to Your Project
Open `apps/web/.env.local` and replace:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY_HERE"
```

With your actual key:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSy..."
```

### 7. Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

## Billing Information

Google Maps provides:
- **$200 free credit per month**
- This covers approximately 28,000 map loads per month
- No credit card required for development/testing
- Perfect for student projects and small applications

## Troubleshooting

### Error: "Google Maps JavaScript API error: InvalidKeyMapError"
- Your API key is not valid
- Follow steps above to get a real API key
- Make sure you enabled "Maps JavaScript API"
- Restart your development server after adding the key

### Map shows gray tiles
- Check if Maps JavaScript API is enabled
- Verify your API key is correct in `.env.local`
- Check browser console for specific error messages

### "This page can't load Google Maps correctly"
- You may have exceeded free quota (unlikely for development)
- API key might be restricted to wrong domains
- Try removing restrictions for local development

## Resources

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
