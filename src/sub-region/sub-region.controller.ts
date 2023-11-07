import { Controller, Get, Param } from '@nestjs/common';
import { SubRegionService } from './sub-region.service';
import { RegionSubRegion } from './entities/sub-region.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('sub-region')
@Controller('sub-region')
export class SubRegionController {
  constructor(private readonly subRegionService: SubRegionService) {}

  @Get('/')
  getAllSubRegion(): Promise<RegionSubRegion[]> {
    return this.subRegionService.findAll();
  }

  @Get('/:subRegion')
  getRegionSubRegion(@Param('subRegion') subRegion: string): Promise<RegionSubRegion[]> {
    return this.subRegionService.findSubRegionByRegion(subRegion);
  }
}
