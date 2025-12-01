'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { mapAPI } from '@/lib/api';
import { Building2, MapPin, Navigation, Layers, X } from 'lucide-react';

interface Building {
  id: string;
  code: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  floors?: number;
  _count?: { rooms: number; pois: number };
}

interface POI {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  description?: string;
  building?: { code: string; name: string };
}

// CADT Campus location in Phnom Penh, Cambodia
const center = {
  lat: 11.653714,
  lng: 104.912045
};

const containerStyle = {
  width: '100%',
  height: '600px'
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  zoom: 17,
};

export function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  // Define marker icons inside component after Google Maps loads
  const buildingMarkerIcon = isLoaded ? {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: '#3b82f6',
    fillOpacity: 1,
    strokeColor: '#1e40af',
    strokeWeight: 2,
    scale: 1.8,
    anchor: new google.maps.Point(12, 24),
  } : undefined;

  const poiMarkerIcon = isLoaded ? {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: '#a855f7',
    fillOpacity: 1,
    strokeColor: '#7e22ce',
    strokeWeight: 2,
    scale: 1.8,
    anchor: new google.maps.Point(12, 24),
  } : undefined;

  useEffect(() => {
    async function fetchMapData() {
      try {
        const [buildingsData, poisData] = await Promise.all([
          mapAPI.getBuildings(),
          mapAPI.getPOIs(),
        ]);
        setBuildings(buildingsData);
        setPois(poisData);
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      }
    }
    fetchMapData();
  }, []);

  const handleNavigate = (lat: number, lng: number, name: string) => {
    // Open Google Maps with directions (works without API key)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Testing Google Maps API Key...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={mapOptions}
    >
      {/* Building Markers */}
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={{ lat: building.latitude, lng: building.longitude }}
          onClick={() => setSelectedBuilding(building)}
          icon={buildingMarkerIcon}
          animation={selectedBuilding?.id === building.id ? google.maps.Animation.BOUNCE : undefined}
        />
      ))}

      {/* POI Markers */}
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.latitude, lng: poi.longitude }}
          onClick={() => setSelectedPOI(poi)}
          icon={poiMarkerIcon}
          animation={selectedPOI?.id === poi.id ? google.maps.Animation.BOUNCE : undefined}
        />
      ))}

      {/* Building Info Window */}
      {selectedBuilding && (
        <InfoWindow
          position={{
            lat: selectedBuilding.latitude,
            lng: selectedBuilding.longitude,
          }}
          onCloseClick={() => setSelectedBuilding(null)}
        >
          <div className="p-4 min-w-[280px]">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">
                  {selectedBuilding.code}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{selectedBuilding.name}</p>
              </div>
            </div>
            {selectedBuilding.description && (
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{selectedBuilding.description}</p>
            )}
            <div className="space-y-2 mb-4">
              {selectedBuilding.floors && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-blue-50 p-1.5 rounded-lg">
                    <Layers className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{selectedBuilding.floors} floors</span>
                </div>
              )}
              {selectedBuilding._count && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-green-50 p-1.5 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{selectedBuilding._count.rooms} rooms, {selectedBuilding._count.pois} POIs</span>
                </div>
              )}
            </div>
            <button
              onClick={() =>
                handleNavigate(
                  selectedBuilding.latitude,
                  selectedBuilding.longitude,
                  selectedBuilding.name
                )
              }
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        </InfoWindow>
      )}

      {/* POI Info Window */}
      {selectedPOI && (
        <InfoWindow
          position={{
            lat: selectedPOI.latitude,
            lng: selectedPOI.longitude,
          }}
          onCloseClick={() => setSelectedPOI(null)}
        >
          <div className="p-4 min-w-[280px]">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 rounded-xl shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{selectedPOI.name}</h3>
                <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg mt-1">
                  {selectedPOI.type.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
            {selectedPOI.building && (
              <div className="flex items-center gap-2 text-sm mb-3 bg-blue-50 p-2.5 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 font-medium">{selectedPOI.building.name}</span>
              </div>
            )}
            {selectedPOI.description && (
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{selectedPOI.description}</p>
            )}
            <button
              onClick={() =>
                handleNavigate(selectedPOI.latitude, selectedPOI.longitude, selectedPOI.name)
              }
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

