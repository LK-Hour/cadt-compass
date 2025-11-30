import { Controller, Get, Param, Query } from '@nestjs/common';
import { BuildingsService } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Get(':id/rooms')
  getRooms(@Param('id') id: string) {
    return this.buildingsService.getRooms(id);
  }
}

@Controller('rooms')
export class RoomsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  findAll(
    @Query('buildingId') buildingId?: string,
    @Query('floor') floor?: string,
    @Query('type') type?: string,
  ) {
    return this.buildingsService.findAllRooms({
      buildingId,
      floor: floor ? parseInt(floor) : undefined,
      type,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOneRoom(id);
  }
}

@Controller('pois')
export class POIsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  findAll(@Query('type') type?: string) {
    return this.buildingsService.findAllPOIs(type);
  }
}
