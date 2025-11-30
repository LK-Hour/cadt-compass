'use client';

export function MapView() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map</h3>
        <p className="text-gray-700">Map integration coming soon!</p>
        <p className="text-sm text-gray-600 mt-2">
          Will use Leaflet or Mapbox for interactive campus navigation
        </p>
      </div>
    </div>
  );
}
