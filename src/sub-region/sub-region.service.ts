import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionSubRegion } from './entities/sub-region.entity';

@Injectable()
export class SubRegionService {
  constructor(@InjectRepository(RegionSubRegion) private readonly subRegionRepository: Repository<RegionSubRegion>) {}

  async findAll(): Promise<RegionSubRegion[]> {
    return this.subRegionRepository.find();
  }

  async findSubRegionByRegion(region: string): Promise<RegionSubRegion[]> {
    return this.subRegionRepository.find({
      where: {
        Region: region,
      },
    });
  }
}
