import { Entity, PrimaryColumn } from 'typeorm';

@Entity('tblRegionsSubRegion')
export class RegionSubRegion {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  Region: string;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  SubRegion: string;
}
