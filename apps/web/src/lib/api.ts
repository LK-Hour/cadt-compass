import { apiClient } from './api-client';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  Building,
  Room,
  POI,
  Event,
  RoomAvailability,
  Feedback,
} from './types';

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
  
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/auth/register', data),
  
  getProfile: () =>
    apiClient.get<User>('/auth/me'),
  
  logout: () =>
    apiClient.post('/auth/logout'),
};

// Buildings API
export const buildingsAPI = {
  getAll: () =>
    apiClient.get<Building[]>('/buildings'),
  
  getById: (id: string) =>
    apiClient.get<Building>(`/buildings/${id}`),
  
  getRooms: (buildingId: string) =>
    apiClient.get<Room[]>(`/buildings/${buildingId}/rooms`),
};

// Rooms API
export const roomsAPI = {
  getAll: () =>
    apiClient.get<Room[]>('/rooms'),
  
  getById: (id: string) =>
    apiClient.get<Room>(`/rooms/${id}`),
};

// POIs API
export const poisAPI = {
  getAll: () =>
    apiClient.get<POI[]>('/pois'),
};

// Map API (combined)
export const mapAPI = {
  getBuildings: async () => {
    const response = await apiClient.get<Building[]>('/map/buildings');
    return response.data;
  },
  
  getPOIs: async (type?: string) => {
    const response = await apiClient.get<POI[]>('/map/pois', {
      params: type ? { type } : {},
    });
    return response.data;
  },
  
  getRooms: async (buildingId?: string) => {
    const response = await apiClient.get<Room[]>('/map/rooms', {
      params: buildingId ? { buildingId } : {},
    });
    return response.data;
  },
  
  search: async (query: string) => {
    const response = await apiClient.get('/map/search', {
      params: { q: query },
    });
    return response.data;
  },
};

// Availability API
export const availabilityAPI = {
  getAll: () =>
    apiClient.get<{ rooms: RoomAvailability[]; lastUpdated: string }>('/availability'),
  
  getByRoomId: (roomId: string) =>
    apiClient.get<RoomAvailability>(`/availability/${roomId}`),
};

// Events API
export const eventsAPI = {
  getAll: () =>
    apiClient.get<Event[]>('/events'),
  
  getById: (id: string) =>
    apiClient.get<Event>(`/events/${id}`),
  
  create: (data: Partial<Event>) =>
    apiClient.post<Event>('/events', data),
  
  register: (eventId: string) =>
    apiClient.post(`/events/${eventId}/register`),
};

// Feedback API
export const feedbackAPI = {
  create: (data: Partial<Feedback>) =>
    apiClient.post<Feedback>('/feedback', data),
  
  getAll: () =>
    apiClient.get<Feedback[]>('/feedback'),
};
