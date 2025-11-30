'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { eventsAPI } from '@/lib/api';
import { Calendar, Clock, MapPin, User, Users, ArrowRight, X, Sparkles } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description?: string;
  type: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  registrationRequired?: boolean;
  maxParticipants?: number;
  _count?: { registrations: number };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await eventsAPI.getAll();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
            <span>Campus Events</span>
            <Sparkles className="w-12 h-12 text-purple-600" />
          </h1>
          <p className="text-gray-600 text-lg">Discover upcoming events and activities</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No events found</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {events.map((event) => {
                const startDate = new Date(event.startTime);
                const endDate = new Date(event.endTime);
                
                return (
                  <Card 
                    key={event.id} 
                    className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{event.title}</span>
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
                          {event.type.replace(/_/g, ' ')}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {event.description && (
                        <p className="text-gray-600 leading-relaxed line-clamp-2">{event.description}</p>
                      )}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-gray-700">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span>
                            {startDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span>
                            {startDate.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                            {' - '}
                            {endDate.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <MapPin className="w-5 h-5 text-red-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <User className="w-5 h-5 text-green-600" />
                          <span>Organized by: {event.organizer}</span>
                        </div>
                        {event._count && (
                          <div className="flex items-center gap-3 text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                            <Users className="w-5 h-5" />
                            <span>{event._count.registrations} registered</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 pt-4 border-t">
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all group-hover:scale-105 flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                          }}
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Event Detail Modal */}
            {selectedEvent && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
                onClick={() => setSelectedEvent(null)}
              >
                <div 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-t-2xl"></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                          {selectedEvent.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold ml-4 transition-all"
                      >
                        ×
                      </button>
                    </div>

                    {selectedEvent.description && (
                      <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
                    )}

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 text-gray-700">
                        <span className="text-xl">📅</span>
                        <div>
                          <div className="font-semibold">Date</div>
                          <div>
                            {new Date(selectedEvent.startTime).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <span className="text-xl">🕐</span>
                        <div>
                          <div className="font-semibold">Time</div>
                          <div>
                            {new Date(selectedEvent.startTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                            {' - '}
                            {new Date(selectedEvent.endTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <span className="text-xl">📍</span>
                        <div>
                          <div className="font-semibold">Location</div>
                          <div>{selectedEvent.location}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <span className="text-xl">👤</span>
                        <div>
                          <div className="font-semibold">Organizer</div>
                          <div>{selectedEvent.organizer}</div>
                        </div>
                      </div>

                      {selectedEvent._count && (
                        <div className="flex items-start gap-3 text-gray-700">
                          <span className="text-xl">👥</span>
                          <div>
                            <div className="font-semibold">Participants</div>
                            <div>
                              {selectedEvent._count.registrations} registered
                              {selectedEvent.maxParticipants && ` / ${selectedEvent.maxParticipants} max`}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                      {selectedEvent.registrationRequired && (
                        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                          ✓ Register for Event
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="flex-1 hover:bg-gray-100 transition-all"
                        onClick={() => setSelectedEvent(null)}
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
