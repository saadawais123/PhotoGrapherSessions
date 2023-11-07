import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRegionService } from './sub-region.service';
import { RegionSubRegion } from './entities/sub-region.entity';
import { SubRegionController } from './sub-region.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegionSubRegion])],
  controllers: [SubRegionController],
  providers: [SubRegionService],
  exports: [SubRegionService],
})
export class SubRegionModule {}
