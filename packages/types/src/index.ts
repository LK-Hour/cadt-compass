// User Types
export enum Role {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

export interface User {
  id: string;
  email: string;
  studentId?: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Building Types
export interface Building {
  id: string;
  code: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  floors: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Room Types
export enum RoomType {
  STUDY_ROOM = 'STUDY_ROOM',
  COMPUTER_LAB = 'COMPUTER_LAB',
  CLASSROOM = 'CLASSROOM',
  LECTURE_HALL = 'LECTURE_HALL',
  MEETING_ROOM = 'MEETING_ROOM',
}

export interface Room {
  id: string;
  code: string;
  name: string;
  buildingId: string;
  building?: Building;
  floor: number;
  capacity: number;
  type: RoomType;
  latitude?: number;
  longitude?: number;
  description?: string;
  facilities?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// POI Types
export enum POIType {
  CAFETERIA = 'CAFETERIA',
  LIBRARY = 'LIBRARY',
  RECYCLING = 'RECYCLING',
  ATM = 'ATM',
  PARKING = 'PARKING',
  ENTRANCE = 'ENTRANCE',
  RESTROOM = 'RESTROOM',
  OFFICE = 'OFFICE',
}

export interface POI {
  id: string;
  name: string;
  type: POIType;
  buildingId?: string;
  building?: Building;
  latitude: number;
  longitude: number;
  floor?: number;
  description?: string;
  icon?: string;
  createdAt: Date;
}

// Event Types
export enum EventType {
  ACADEMIC = 'ACADEMIC',
  CLUB = 'CLUB',
  WORKSHOP = 'WORKSHOP',
  CAREER = 'CAREER',
  SOCIAL = 'SOCIAL',
  OFFICIAL = 'OFFICIAL',
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  startTime: Date;
  endTime: Date;
  location: string;
  organizer: string;
  imageUrl?: string;
  registrationRequired: boolean;
  maxParticipants?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  event?: Event;
  userId: string;
  user?: User;
  registeredAt: Date;
}

// Feedback Types
export enum FeedbackType {
  BUG_REPORT = 'BUG_REPORT',
  MAP_ERROR = 'MAP_ERROR',
  DATA_INACCURACY = 'DATA_INACCURACY',
  FEATURE_REQUEST = 'FEATURE_REQUEST',
  OTHER = 'OTHER',
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface Feedback {
  id: string;
  userId: string;
  user?: User;
  type: FeedbackType;
  subject: string;
  description: string;
  status: FeedbackStatus;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Availability Types
export interface RoomBooking {
  user?: string;
  startTime: Date;
  endTime: Date;
  purpose?: string;
}

export interface RoomAvailability {
  roomId: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: RoomType;
  available: boolean;
  currentBooking?: RoomBooking;
  nextBooking?: RoomBooking;
  nextAvailable?: Date;
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  studentId?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface AvailabilityFilter {
  buildingId?: string;
  floor?: number;
  type?: RoomType;
  available?: boolean;
}

export interface EventFilter {
  type?: EventType;
  startDate?: Date;
  endDate?: Date;
  organizer?: string;
}
