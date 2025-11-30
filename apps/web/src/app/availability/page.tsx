'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { availabilityAPI } from '@/lib/api';
import { DoorOpen, Building2, Layers, Users, Clock, User, X, Check, XCircle, ArrowRight } from 'lucide-react';

interface Room {
  roomId: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: string;
  available: boolean;
  currentBooking?: {
    user: string;
    startTime: string;
    endTime: string;
    purpose: string;
  };
  nextBooking?: {
    startTime: string;
    endTime: string;
  };
  nextAvailable?: string;
}

export default function AvailabilityPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await availabilityAPI.getAll();
        setRooms(response.data.rooms || []);
      } catch (error) {
        console.error('Failed to fetch room availability:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(room => {
    if (filter === 'available') return room.available;
    if (filter === 'occupied') return !room.available;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading room availability...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
            <span>Room Availability</span>
            <DoorOpen className="w-12 h-12 text-green-600" />
          </h1>
          <p className="text-gray-600 text-lg">Find available study spaces in real-time</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Rooms ({rooms.length})
          </Button>
          <Button
            variant={filter === 'available' ? 'default' : 'outline'}
            onClick={() => setFilter('available')}
            className={filter === 'available' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            Available ({rooms.filter(r => r.available).length})
          </Button>
          <Button
            variant={filter === 'occupied' ? 'default' : 'outline'}
            onClick={() => setFilter('occupied')}
            className={filter === 'occupied' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Occupied ({rooms.filter(r => !r.available).length})
          </Button>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-20">
            <DoorOpen className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No rooms found matching your filter</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredRooms.map((room) => (
                <Card 
                  key={room.roomId} 
                  className={`group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm overflow-hidden ${
                    room.available ? 'ring-2 ring-green-200' : 'ring-2 ring-red-200'
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    room.available 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{room.name}</span>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 ${
                        room.available 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {room.available ? <><Check className="w-3 h-3" /> Available</> : <><XCircle className="w-3 h-3" /> Occupied</>}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2.5 text-gray-700">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span>{room.building}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-purple-600" />
                        <span>Floor {room.floor}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span>Capacity: {room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DoorOpen className="w-5 h-5 text-cyan-600" />
                        <span>{room.type.replace(/_/g, ' ')}</span>
                      </div>
                      {!room.available && room.nextAvailable && (
                        <div className="mt-3 pt-3 border-t bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg">
                          <div className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Next available: {new Date(room.nextAvailable).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-5 pt-4 border-t">
                      <Button 
                        className={`w-full shadow-lg hover:shadow-xl transition-all group-hover:scale-105 flex items-center justify-center gap-2 ${
                          room.available
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                        }}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Room Detail Modal */}
            {selectedRoom && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
                onClick={() => setSelectedRoom(null)}
              >
                <div 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-2xl ${
                    selectedRoom.available
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRoom.name}</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                          selectedRoom.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {selectedRoom.available ? <><Check className="w-3 h-3" /> Available Now</> : <><XCircle className="w-3 h-3" /> Currently Occupied</>}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedRoom(null)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center ml-4 transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 text-gray-700">
                        <Building2 className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <div className="font-semibold">Building</div>
                          <div>{selectedRoom.building}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <Layers className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <div className="font-semibold">Floor</div>
                          <div>Floor {selectedRoom.floor}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <Users className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <div className="font-semibold">Capacity</div>
                          <div>{selectedRoom.capacity} people</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <DoorOpen className="w-5 h-5 text-cyan-600 mt-1" />
                        <div>
                          <div className="font-semibold">Room Type</div>
                          <div>{selectedRoom.type.replace(/_/g, ' ')}</div>
                        </div>
                      </div>

                      {selectedRoom.currentBooking && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="font-semibold text-red-900 mb-2">Current Booking</div>
                          <div className="space-y-1 text-sm text-red-800">
                            <div><strong>Purpose:</strong> {selectedRoom.currentBooking.purpose}</div>
                            <div><strong>By:</strong> {selectedRoom.currentBooking.user}</div>
                            <div><strong>Until:</strong> {new Date(selectedRoom.currentBooking.endTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}</div>
                          </div>
                        </div>
                      )}

                      {selectedRoom.nextBooking && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="font-semibold text-blue-900 mb-2">Next Booking</div>
                          <div className="space-y-1 text-sm text-blue-800">
                            <div><strong>Starts:</strong> {new Date(selectedRoom.nextBooking.startTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}</div>
                            <div><strong>Ends:</strong> {new Date(selectedRoom.nextBooking.endTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}</div>
                          </div>
                        </div>
                      )}

                      {selectedRoom.available && !selectedRoom.nextBooking && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                          This room is available with no upcoming bookings
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                      {selectedRoom.available && (
                        <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all">
                          📅 Book This Room
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="flex-1 hover:bg-gray-100 transition-all"
                        onClick={() => setSelectedRoom(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
