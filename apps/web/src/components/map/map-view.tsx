'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { mapAPI } from '@/lib/api';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface MapBuilding {
  id: string;
  code: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  floors: number;
  _count?: { rooms: number; pois: number };
}

interface MapPOI {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  description?: string;
  building?: { code: string; name: string };
}

export function MapView() {
  const [buildings, setBuildings] = useState<MapBuilding[]>([]);
  const [pois, setPois] = useState<MapPOI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMapData() {
      try {
        setLoading(true);
        const [buildingsData, poisData] = await Promise.all([
          mapAPI.getBuildings(),
          mapAPI.getPOIs(),
        ]);
        setBuildings(buildingsData as MapBuilding[]);
        setPois(poisData as MapPOI[]);
      } catch (err) {
        setError('Failed to load map data');
        console.error('Map data error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMapData();
  }, []);

  if (loading) {
    return (
      <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // CADT coordinates (approximate)
  const centerLat = buildings.length > 0 
    ? buildings.reduce((sum, b) => sum + b.latitude, 0) / buildings.length
    : 11.5564;
  const centerLng = buildings.length > 0
    ? buildings.reduce((sum, b) => sum + b.longitude, 0) / buildings.length
    : 104.9282;

  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={17}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Building Markers */}
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={[building.latitude, building.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">
                  {building.code}: {building.name}
                </h3>
                {building.description && (
                  <p className="text-sm text-gray-600 mb-2">{building.description}</p>
                )}
                <div className="text-sm space-y-1">
                  <p>🏢 Floors: {building.floors}</p>
                  {building._count && (
                    <>
                      <p>🚪 Rooms: {building._count.rooms}</p>
                      <p>📍 POIs: {building._count.pois}</p>
                    </>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* POI Markers */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-base mb-1">{poi.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Type: {poi.type.replace(/_/g, ' ')}
                </p>
                {poi.description && (
                  <p className="text-sm text-gray-700">{poi.description}</p>
                )}
                {poi.building && (
                  <p className="text-xs text-gray-500 mt-2">
                    📍 {poi.building.name}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
