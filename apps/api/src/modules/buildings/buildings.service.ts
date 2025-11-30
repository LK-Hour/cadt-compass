import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.building.findMany({
      include: {
        _count: {
          select: { rooms: true, pois: true },
        },
      },
      orderBy: { code: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.building.findUnique({
      where: { id },
      include: {
        rooms: {
          orderBy: [{ floor: 'asc' }, { code: 'asc' }],
        },
        pois: true,
      },
    });
  }

  async getRooms(buildingId: string) {
    return this.prisma.room.findMany({
      where: { buildingId },
      include: {
        building: {
          select: { code: true, name: true },
        },
      },
      orderBy: [{ floor: 'asc' }, { code: 'asc' }],
    });
  }

  async findAllRooms(query?: {
    buildingId?: string;
    floor?: number;
    type?: string;
  }) {
    return this.prisma.room.findMany({
      where: {
        ...(query?.buildingId && { buildingId: query.buildingId }),
        ...(query?.floor && { floor: query.floor }),
        ...(query?.type && { type: query.type as any }),
      },
      include: {
        building: {
          select: { code: true, name: true },
        },
      },
      orderBy: [
        { building: { code: 'asc' } },
        { floor: 'asc' },
        { code: 'asc' },
      ],
    });
  }

  async findOneRoom(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        building: true,
      },
    });
  }

  async findAllPOIs(type?: string) {
    return this.prisma.pOI.findMany({
      where: type ? { type: type as any } : undefined,
      include: {
        building: {
          select: { code: true, name: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}
