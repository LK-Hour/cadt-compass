import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto, RegisterEventDto } from './dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    return this.eventsService.findAll(type);
  }

  @Get('upcoming')
  async findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/register')
  async register(@Param('id') id: string, @Body() registerDto: RegisterEventDto) {
    return this.eventsService.registerForEvent(id, registerDto.userId);
  }

  @Delete(':id/register/:userId')
  async unregister(@Param('id') id: string, @Param('userId') userId: string) {
    return this.eventsService.unregisterFromEvent(id, userId);
  }

  @Get(':id/registrations')
  async getRegistrations(@Param('id') id: string) {
    return this.eventsService.getRegistrations(id);
  }
}
