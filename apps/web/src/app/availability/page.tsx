'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockRooms = [
  { id: 1, name: 'Room A-101', building: 'Building A', floor: 1, capacity: 50, available: true },
  { id: 2, name: 'Room A-102', building: 'Building A', floor: 1, capacity: 40, available: false },
  { id: 3, name: 'Room B-201', building: 'Building B', floor: 2, capacity: 30, available: true },
  { id: 4, name: 'Lab C-301', building: 'Building C', floor: 3, capacity: 25, available: true },
];

export default function AvailabilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Availability</h1>
        <p className="text-gray-600 mb-8">Find available study spaces in real-time</p>

        <div className="grid md:grid-cols-2 gap-6">
          {mockRooms.map((room) => (
            <Card key={room.id} className={room.available ? 'border-green-200' : 'border-red-200'}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{room.name}</span>
                  <span className={`text-sm font-normal px-3 py-1 rounded-full ${
                    room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {room.available ? '✓ Available' : '✗ Occupied'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>🏢</span>
                    <span>{room.building} - Floor {room.floor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Capacity: {room.capacity} people</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
