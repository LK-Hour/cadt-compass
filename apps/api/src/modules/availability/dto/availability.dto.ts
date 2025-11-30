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
  type: string;
  available: boolean;
  currentBooking?: RoomBooking;
  nextBooking?: RoomBooking;
  nextAvailable?: Date;
}

export interface AvailabilityResponse {
  rooms: RoomAvailability[];
  lastUpdated: Date;
}

export interface AvailabilityFilters {
  buildingId?: string;
  floor?: number;
  type?: string;
  available?: boolean;
}
