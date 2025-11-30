'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { mapAPI } from '@/lib/api';

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
      {/* Building Markers (Red) */}
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={{ lat: building.latitude, lng: building.longitude }}
          onClick={() => setSelectedBuilding(building)}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          }}
        />
      ))}

      {/* POI Markers (Blue) */}
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.latitude, lng: poi.longitude }}
          onClick={() => setSelectedPOI(poi)}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
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
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">
              {selectedBuilding.code}: {selectedBuilding.name}
            </h3>
            {selectedBuilding.description && (
              <p className="text-sm text-gray-600 mb-2">{selectedBuilding.description}</p>
            )}
            {selectedBuilding.floors && (
              <p className="text-sm text-gray-700 mb-2">Floors: {selectedBuilding.floors}</p>
            )}
            <button
              onClick={() =>
                handleNavigate(
                  selectedBuilding.latitude,
                  selectedBuilding.longitude,
                  selectedBuilding.name
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors w-full"
            >
              🧭 Navigate Here
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
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">{selectedPOI.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {selectedPOI.type.replace(/_/g, ' ')}
            </p>
            {selectedPOI.building && (
              <p className="text-sm text-gray-700 mb-2">
                Location: {selectedPOI.building.name}
              </p>
            )}
            {selectedPOI.description && (
              <p className="text-sm text-gray-600 mb-2">{selectedPOI.description}</p>
            )}
            <button
              onClick={() =>
                handleNavigate(selectedPOI.latitude, selectedPOI.longitude, selectedPOI.name)
              }
              className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors w-full"
            >
              🧭 Navigate Here
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

