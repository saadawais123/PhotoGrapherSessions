import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './entities/region.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('/')
  getHello(): Promise<Region[]> {
    return this.regionService.findAll();
  }
}
