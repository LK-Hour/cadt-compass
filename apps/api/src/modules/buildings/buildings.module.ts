import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import {
  BuildingsController,
  RoomsController,
  POIsController,
} from './buildings.controller';

@Module({
  controllers: [BuildingsController, RoomsController, POIsController],
  providers: [BuildingsService],
  exports: [BuildingsService],
})
export class BuildingsModule {}
