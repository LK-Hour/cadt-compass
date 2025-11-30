'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapView } from '@/components/map/map-view';
import { Input } from '@/components/ui/input';
import { mapAPI } from '@/lib/api';
import { Map as MapIcon, Search, Building2, Navigation, Layers, MapPin, Loader2, DoorOpen, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
            <span>Campus Map</span>
            <MapIcon className="w-12 h-12 text-cyan-600" />
          </h1>
          <p className="text-gray-600 text-lg">Interactive campus navigation with Google Maps</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search buildings, rooms, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500 rounded-2xl shadow-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>All</span>
            </button>
            <button
              onClick={() => setSelectedFilter('buildings')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
                selectedFilter === 'buildings'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Buildings</span>
            </button>
            <button
              onClick={() => setSelectedFilter('pois')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
                selectedFilter === 'pois'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>POIs</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards - Horizontal Row */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 bg-white shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">Buildings</span>
                </div>
                <span className="font-bold text-blue-600 text-2xl">{buildings.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">Points of Interest</span>
                </div>
                <span className="font-bold text-purple-600 text-2xl">{pois.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <DoorOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">Total Rooms</span>
                </div>
                <span className="font-bold text-green-600 text-2xl">
                  {buildings.reduce((sum, b) => sum + (b._count?.rooms || 0), 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map - Full Width */}
        <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl mb-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <CardContent className="p-0">
            <div className="h-[600px] rounded-2xl overflow-hidden">
              <MapView />
            </div>
          </CardContent>
        </Card>

        {/* Marker Legend - Below Map */}
        <Card className="border-0 bg-white shadow-lg overflow-hidden rounded-2xl mb-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-gray-700" />
              <span>Map Legend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="relative">
                  <svg width="30" height="40" viewBox="0 0 24 24" className="text-blue-600">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#3b82f6"
                      stroke="#1e40af"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Blue Markers</h4>
                  <p className="text-sm text-gray-600">Campus Buildings - Click for details and navigation</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="relative">
                  <svg width="30" height="40" viewBox="0 0 24 24" className="text-purple-600">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#a855f7"
                      stroke="#7e22ce"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Purple Markers</h4>
                  <p className="text-sm text-gray-600">Points of Interest - Libraries, cafeterias, ATMs, and more</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buildings & POIs Lists - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Buildings List */}
          {(selectedFilter === 'all' || selectedFilter === 'buildings') && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Buildings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
                {loading ? (
                  <p className="text-gray-500 text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                    <span className="block mt-2">Loading...</span>
                  </p>
                ) : filteredBuildings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>No buildings found</span>
                  </p>
                ) : (
                  filteredBuildings.map((building) => (
                    <div
                      key={building.id}
                      className="group p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl hover:shadow-lg transition-all cursor-pointer border-2 border-blue-100 hover:border-blue-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                            {building.code}
                          </h4>
                          <p className="text-gray-700 font-medium">{building.name}</p>
                          {building.description && (
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{building.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 flex-wrap">
                        {building.floors && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>{building.floors} floors</span>
                          </span>
                        )}
                        {building._count && (
                          <>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-medium flex items-center gap-1">
                              <DoorOpen className="w-3 h-3" />
                              <span>{building._count.rooms} rooms</span>
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{building._count.pois} POIs</span>
                            </span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleNavigate(building.latitude, building.longitude, building.name)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Navigate</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          {/* POIs List */}
          {(selectedFilter === 'all' || selectedFilter === 'pois') && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>Points of Interest</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto space-y-2">
                {loading ? (
                  <p className="text-gray-500 text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-purple-600" />
                    <span className="block mt-2">Loading...</span>
                  </p>
                ) : filteredPOIs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>No POIs found</span>
                  </p>
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
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span>{poi.building.name}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleNavigate(poi.latitude, poi.longitude, poi.name)}
                        className="w-full bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
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
    </div>
  );
}
