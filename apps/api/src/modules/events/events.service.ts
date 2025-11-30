import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(type?: string) {
    return this.prisma.event.findMany({
      where: type ? { type: type as any } : {},
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findUpcoming() {
    const now = new Date();
    return this.prisma.event.findMany({
      where: {
        startTime: {
          gte: now,
        },
      },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { startTime: 'asc' },
      take: 10,
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            user: {
              select: { id: true, name: true, email: true, picture: true },
            },
          },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return this.prisma.event.delete({ where: { id } });
  }

  async registerForEvent(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true } } },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
      throw new BadRequestException('Event is fully booked');
    }

    const existingRegistration = await this.prisma.eventRegistration.findFirst({
      where: { eventId, userId },
    });

    if (existingRegistration) {
      throw new BadRequestException('Already registered for this event');
    }

    return this.prisma.eventRegistration.create({
      data: { eventId, userId },
      include: {
        event: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async unregisterFromEvent(eventId: string, userId: string) {
    const registration = await this.prisma.eventRegistration.findFirst({
      where: { eventId, userId },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    return this.prisma.eventRegistration.delete({
      where: { id: registration.id },
    });
  }

  async getRegistrations(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    return this.prisma.eventRegistration.findMany({
      where: { eventId },
      include: {
        user: {
          select: { id: true, name: true, email: true, picture: true },
        },
      },
      orderBy: { registeredAt: 'desc' },
    });
  }
}
