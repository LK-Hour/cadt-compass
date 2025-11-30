'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapView } from '@/components/map/map-view';
import { Input } from '@/components/ui/input';
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

export default function MapPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [pois, setPois] = useState<POI[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'buildings' | 'pois'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [buildingsData, poisData] = await Promise.all([
          mapAPI.getBuildings(),
          mapAPI.getPOIs(),
        ]);
        setBuildings(buildingsData);
        setPois(poisData);
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredBuildings = buildings.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPOIs = pois.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (lat: number, lng: number, name: string) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Map</h1>
          <p className="text-gray-600">Interactive campus navigation with Google Maps</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search buildings, rooms, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('buildings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'buildings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Buildings
            </button>
            <button
              onClick={() => setSelectedFilter('pois')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'pois'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              POIs
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <MapView />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Buildings & POIs List */}
          <div className="space-y-4">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Buildings</span>
                  <span className="font-bold text-blue-600">{buildings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points of Interest</span>
                  <span className="font-bold text-purple-600">{pois.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Rooms</span>
                  <span className="font-bold text-green-600">
                    {buildings.reduce((sum, b) => sum + (b._count?.rooms || 0), 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Buildings List */}
            {(selectedFilter === 'all' || selectedFilter === 'buildings') && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🏢 Buildings</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto space-y-2">
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                  ) : filteredBuildings.length === 0 ? (
                    <p className="text-gray-500 text-sm">No buildings found</p>
                  ) : (
                    filteredBuildings.map((building) => (
                      <div
                        key={building.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {building.code}: {building.name}
                            </h4>
                            {building.description && (
                              <p className="text-xs text-gray-600 mt-1">{building.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                          {building.floors && <span>🏢 {building.floors} floors</span>}
                          {building._count && (
                            <>
                              <span>🚪 {building._count.rooms} rooms</span>
                              <span>📍 {building._count.pois} POIs</span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => handleNavigate(building.latitude, building.longitude, building.name)}
                          className="w-full bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🧭</span>
                          <span>Navigate</span>
                        </button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* POIs List */}
            {(selectedFilter === 'all' || selectedFilter === 'pois') && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📍 Points of Interest</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto space-y-2">
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                  ) : filteredPOIs.length === 0 ? (
                    <p className="text-gray-500 text-sm">No POIs found</p>
                  ) : (
                    filteredPOIs.map((poi) => (
                      <div
                        key={poi.id}
                        className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{poi.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {poi.type.replace(/_/g, ' ')}
                            </p>
                            {poi.building && (
                              <p className="text-xs text-gray-500 mt-1">
                                📍 {poi.building.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleNavigate(poi.latitude, poi.longitude, poi.name)}
                          className="w-full bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🧭</span>
                          <span>Navigate</span>
                        </button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Access Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>🏢</span>
                <span>Buildings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Explore {buildings.length} campus buildings. Click on red markers on the map or use the building list to navigate.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📍</span>
                <span>Points of Interest</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Find cafeterias, libraries, ATMs, and more. Blue markers show all POI locations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>🧭</span>
                <span>Navigation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Use the "Navigate" button to get turn-by-turn directions via Google Maps.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
