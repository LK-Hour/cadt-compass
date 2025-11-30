import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MapService {
  constructor(private prisma: PrismaService) {}

  async getAllBuildings() {
    return this.prisma.building.findMany({
      include: {
        _count: {
          select: { rooms: true, pois: true },
        },
      },
      orderBy: { code: 'asc' },
    });
  }

  async getAllPOIs(type?: string) {
    return this.prisma.pOI.findMany({
      where: type ? { type: type as any } : {},
      include: {
        building: {
          select: { code: true, name: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getAllRooms(buildingId?: string) {
    return this.prisma.room.findMany({
      where: buildingId ? { buildingId } : {},
      include: {
        building: {
          select: { code: true, name: true },
        },
      },
      orderBy: [{ buildingId: 'asc' }, { code: 'asc' }],
    });
  }

  async search(query: string) {
    if (!query || query.length < 2) {
      return { buildings: [], rooms: [], pois: [] };
    }

    const searchTerm = `%${query.toLowerCase()}%`;

    const [buildings, rooms, pois] = await Promise.all([
      this.prisma.building.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { code: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      this.prisma.room.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { code: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          building: {
            select: { code: true, name: true },
          },
        },
        take: 10,
      }),
      this.prisma.pOI.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          building: {
            select: { code: true, name: true },
          },
        },
        take: 5,
      }),
    ]);

    return { buildings, rooms, pois };
  }
}
