import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tblPhotographersSessions')
export class PhotographersSession {
  @PrimaryGeneratedColumn()
  SessionRowID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  SessionName: string;

  @Column({ type: 'int', nullable: true })
  PhotographersID: number;

  @Column({ type: 'datetime', nullable: true })
  SessionDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Location: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  City: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  State: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Zip: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  LocationLongitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  LocationLatitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Region: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  SubRegion: string;
}
