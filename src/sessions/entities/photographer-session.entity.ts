// import { Photographer } from 'dist/entities/photographer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { SessionType } from './session.entity';
import { SessionDate } from './session-date.entity';
import { Photographer } from 'src/entities/photographer.entity';
import { PhotographerSessionType } from './photographer-session-type.entity';
import { SessionImages } from './session-images.entity';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  HowToBook: string;

  @ManyToOne(() => Photographer, { eager: true })
  @JoinColumn({ name: 'PhotographersID' })
  photographer: Photographer;

  @ManyToOne(
    () => PhotographerSessionType,
    (st) => {
      st.PhotographersSessions;
    },
  )
  @JoinColumn({ name: 'SessionRowID', referencedColumnName: 'SessionRowID' })
  sessionType: PhotographerSessionType;

  @OneToMany(() => SessionDate, (sd) => sd.PhotographersSessions)
  @JoinColumn({ name: 'SessionRowID', referencedColumnName: 'SessionRowID' })
  sessionDates: SessionDate[];

  @OneToMany(() => SessionImages, (si) => si.PhotographersSessions)
  @JoinColumn({ name: 'SessionRowID', referencedColumnName: 'SessionRowID' })
  sessionImages: SessionImages;
}
