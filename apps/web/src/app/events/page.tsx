'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockEvents = [
  { id: 1, title: 'Tech Workshop', date: 'Dec 5, 2025', time: '2:00 PM', location: 'Building A, Room 101', attendees: 45 },
  { id: 2, title: 'Career Fair', date: 'Dec 10, 2025', time: '9:00 AM', location: 'Main Hall', attendees: 120 },
  { id: 3, title: 'Student Meetup', date: 'Dec 15, 2025', time: '4:00 PM', location: 'Building B, Room 205', attendees: 30 },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Events</h1>
        <p className="text-gray-600 mb-8">Discover upcoming events and activities</p>

        <div className="grid gap-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📅</span>
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>👥</span>
                    <span>{event.attendees} registered</span>
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
