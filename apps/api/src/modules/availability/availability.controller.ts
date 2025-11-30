import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityResponse, RoomAvailability } from './dto/availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  async getAvailability(
    @Query('buildingId') buildingId?: string,
    @Query('floor') floor?: string,
    @Query('type') type?: string,
    @Query('available') available?: string,
  ): Promise<AvailabilityResponse> {
    return this.availabilityService.getAvailability({
      buildingId,
      floor: floor ? parseInt(floor) : undefined,
      type,
      available:
        available === 'true' ? true : available === 'false' ? false : undefined,
    });
  }

  @Get(':roomId')
  async getRoomAvailability(
    @Param('roomId') roomId: string,
  ): Promise<RoomAvailability> {
    const availability =
      await this.availabilityService.getRoomAvailability(roomId);

    if (!availability) {
      throw new NotFoundException('Room not found');
    }

    return availability;
  }
}
