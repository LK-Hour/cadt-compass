import { Controller, Get, Param, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('buildings')
  async getBuildings() {
    return this.mapService.getAllBuildings();
  }

  @Get('pois')
  async getPOIs(@Query('type') type?: string) {
    return this.mapService.getAllPOIs(type);
  }

  @Get('rooms')
  async getRooms(@Query('buildingId') buildingId?: string) {
    return this.mapService.getAllRooms(buildingId);
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.mapService.search(query);
  }
}
