/**
 * TypeScript Types & Interfaces
 */

export type Role = 'STUDENT' | 'STAFF' | 'ADMIN' | 'GUEST';
export type RoomType = 'CLASSROOM' | 'LABORATORY' | 'STUDY_ROOM' | 'MEETING_ROOM' | 'AUDITORIUM' | 'OTHER';
export type POIType = 'CAFETERIA' | 'LIBRARY' | 'PARKING' | 'ATM' | 'RESTROOM' | 'RECYCLING' | 'PRINTER' | 'STUDY_AREA' | 'OTHER';
export type EventType = 'ACADEMIC' | 'WORKSHOP' | 'SEMINAR' | 'SOCIAL' | 'SPORTS' | 'CULTURAL' | 'OTHER';
export type FeedbackType = 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'QUESTION' | 'OTHER';
export type FeedbackStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface Building {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  description?: string;
  floors?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  buildingId: string;
  name: string;
  code: string;
  floor: number;
  type: RoomType;
  capacity?: number;
  description?: string;
  features?: string[];
  imageUrl?: string;
  building?: Building;
  createdAt: string;
  updatedAt: string;
}

export interface POI {
  id: string;
  buildingId?: string;
  name: string;
  type: POIType;
  latitude: number;
  longitude: number;
  description?: string;
  building?: Building;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  type: EventType;
  organizer: string;
  organizerId?: string;
  attendeeCount?: number;
  maxParticipants?: number;
  registrationRequired?: boolean;
  imageUrl?: string;
  _count?: { registrations: number };
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string;
}

export interface Feedback {
  id: string;
  userId: string;
  type: FeedbackType;
  title: string;
  description: string;
  status: FeedbackStatus;
  resolvedAt?: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface RoomAvailability {
  roomId: string;
  available: boolean;
  currentOccupancy?: number;
  nextAvailableTime?: string;
  room?: Room;
}

export interface MapFilters {
  buildingId?: string;
  roomType?: RoomType;
  poiType?: POIType;
  searchQuery?: string;
  showRooms?: boolean;
  showPOIs?: boolean;
}

export interface CalendarFilters {
  startDate?: string;
  endDate?: string;
  eventType?: EventType;
  myEvents?: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
