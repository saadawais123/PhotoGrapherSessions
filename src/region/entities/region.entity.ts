import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tblRegions')
export class Region {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  Region: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Longitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Latitude: string;
}
