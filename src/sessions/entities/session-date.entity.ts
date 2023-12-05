import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PhotographersSession } from './photographer-session.entity';

@Entity('tblPhotographersSessionsDates')
export class SessionDate {
  @PrimaryGeneratedColumn()
  PhotographersSessionsDateRowID: number;

  @Column()
  SessionRowID: number;

  @Column({ type: 'datetime', nullable: true })
  SessionDate: Date;

  @OneToMany(() => PhotographersSession, (ph) => ph.sessionDates)
  PhotographersSessions: PhotographersSession[];
}
