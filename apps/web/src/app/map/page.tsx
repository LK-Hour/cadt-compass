import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapView } from '@/components/map/map-view';

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
            <MapView />
          </CardContent>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏢 Buildings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Explore campus buildings and facilities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📍 Points of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Find cafeterias, libraries, and more</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔍 Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Quick search for any location</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
