import { Entity, PrimaryColumn } from 'typeorm';

@Entity('tblRegions')
export class Region {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  Region: string;
}
