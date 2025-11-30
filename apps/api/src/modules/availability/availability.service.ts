import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  RoomBooking,
  RoomAvailability,
  AvailabilityResponse,
  AvailabilityFilters,
} from './dto/availability.dto';

@Injectable()
export class AvailabilityService {
  private readonly logger = new Logger(AvailabilityService.name);

  constructor(private prisma: PrismaService) {}

  async getAvailability(
    filters?: AvailabilityFilters,
  ): Promise<AvailabilityResponse> {
    const rooms = await this.prisma.room.findMany({
      where: {
        ...(filters?.buildingId && { buildingId: filters.buildingId }),
        ...(filters?.floor && { floor: filters.floor }),
        ...(filters?.type && { type: filters.type as any }),
      },
      include: {
        building: {
          select: { name: true },
        },
      },
      orderBy: [
        { building: { code: 'asc' } },
        { floor: 'asc' },
        { code: 'asc' },
      ],
    });

    // Mock booking data (replace with actual CADT API integration)
    const availability = rooms.map((room) => this.getMockAvailability(room));

    // Apply available filter if specified
    const filteredAvailability =
      filters?.available !== undefined
        ? availability.filter((a) => a.available === filters.available)
        : availability;

    return {
      rooms: filteredAvailability,
      lastUpdated: new Date(),
    };
  }

  async getRoomAvailability(roomId: string): Promise<RoomAvailability | null> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        building: {
          select: { name: true },
        },
      },
    });

    if (!room) {
      return null;
    }

    return this.getMockAvailability(room);
  }

  private getMockAvailability(room: any): RoomAvailability {
    const now = new Date();

    // Mock: Computer labs are typically occupied during business hours
    const isComputerLab = room.type === 'COMPUTER_LAB';
    const hour = now.getHours();
    const isBusinessHours = hour >= 9 && hour < 17;

    // Mock: Random availability for demo purposes
    const isAvailable = isComputerLab
      ? !isBusinessHours || Math.random() > 0.6
      : Math.random() > 0.4;

    const availability: RoomAvailability = {
      roomId: room.id,
      name: room.name,
      building: room.building.name,
      floor: room.floor,
      capacity: room.capacity,
      type: room.type,
      available: isAvailable,
    };

    if (!isAvailable) {
      // Mock current booking
      const currentEndTime = new Date(now);
      currentEndTime.setHours(
        currentEndTime.getHours() + Math.floor(Math.random() * 2) + 1,
      );

      availability.currentBooking = {
        user: this.getMockUser(),
        startTime: new Date(now.getTime() - 30 * 60 * 1000), // Started 30 min ago
        endTime: currentEndTime,
        purpose: 'Study Group',
      };

      availability.nextAvailable = currentEndTime;
    } else {
      // Mock next booking
      if (Math.random() > 0.5) {
        const nextStart = new Date(now);
        nextStart.setHours(
          nextStart.getHours() + Math.floor(Math.random() * 3) + 2,
        );
        const nextEnd = new Date(nextStart);
        nextEnd.setHours(nextEnd.getHours() + 2);

        availability.nextBooking = {
          startTime: nextStart,
          endTime: nextEnd,
        };
      }
    }

    return availability;
  }

  private getMockUser(): string {
    const users = [
      'CS101 - Intro to Programming',
      'Mathematics Study Group',
      'Engineering Club',
      'Project Team Meeting',
      'Web Development Workshop',
    ];
    return users[Math.floor(Math.random() * users.length)];
  }
}
