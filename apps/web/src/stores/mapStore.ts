import { create } from 'zustand';
import type { Building, Room, POI, MapFilters } from '@/lib/types';

interface MapState {
  buildings: Building[];
  rooms: Room[];
  pois: POI[];
  filters: MapFilters;
  selectedBuilding: Building | null;
  selectedRoom: Room | null;
  setBuildings: (buildings: Building[]) => void;
  setRooms: (rooms: Room[]) => void;
  setPOIs: (pois: POI[]) => void;
  setFilters: (filters: MapFilters) => void;
  selectBuilding: (building: Building | null) => void;
  selectRoom: (room: Room | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  buildings: [],
  rooms: [],
  pois: [],
  filters: {
    showRooms: true,
    showPOIs: true,
  },
  selectedBuilding: null,
  selectedRoom: null,
  setBuildings: (buildings) => set({ buildings }),
  setRooms: (rooms) => set({ rooms }),
  setPOIs: (pois) => set({ pois }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  selectBuilding: (building) => set({ selectedBuilding: building }),
  selectRoom: (room) => set({ selectedRoom: room }),
}));
