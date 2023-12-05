import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PhotographersSession } from './photographer-session.entity';
import { SessionType } from './session.entity';

@Entity('tblPhotographersSessionsTypes')
export class PhotographerSessionType {
  @PrimaryGeneratedColumn()
  PhotographersSessionsTypeRowID: number;

  @Column()
  SessionRowID: number;

  @Column()
  SessionType: number;

  @OneToMany(() => PhotographersSession, (ph) => ph.sessionDates)
  PhotographersSessions: PhotographersSession[];

  @OneToMany(() => SessionType, (ph) => ph.photographerSessionTypes)
  @JoinColumn({ name: 'SessionType', referencedColumnName: 'SessionType' })
  sessionType: SessionType[];
}
