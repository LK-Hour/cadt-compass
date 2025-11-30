'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { eventsAPI } from '@/lib/api';

interface Event {
  id: string;
  title: string;
  description?: string;
  type: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  _count?: { registrations: number };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Events</h1>
        <p className="text-gray-600 mb-8">Discover upcoming events and activities</p>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No events found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => {
              const startDate = new Date(event.startTime);
              const endDate = new Date(event.endTime);
              
              return (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{event.title}</span>
                      <span className="text-sm font-normal px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {event.type.replace(/_/g, ' ')}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.description && (
                      <p className="text-gray-700 mb-3">{event.description}</p>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>📅</span>
                        <span>
                          {startDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>🕐</span>
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
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>👤</span>
                        <span>Organized by: {event.organizer}</span>
                      </div>
                      {event._count && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>👥</span>
                          <span>{event._count.registrations} registered</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
