'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Map</h1>
        <p className="text-gray-600 mb-8">Interactive campus navigation</p>

        <Card>
          <CardHeader>
            <CardTitle>🗺️ Interactive Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Map Coming Soon!</h2>
              <p className="text-gray-700">
                Interactive campus map with building navigation will be available here.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Features: Building markers, room search, POIs, turn-by-turn navigation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
