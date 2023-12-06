import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PhotographersSession } from './photographer-session.entity';

@Entity('tblPhotographersSessionsDates')
export class SessionDate {
  @PrimaryGeneratedColumn()
  PhotographersSessionsDateRowID: number;

  @Column()
  SessionRowID: number;

  @Column({ type: 'datetime', nullable: true })
  SessionDate: Date;

  @ManyToOne(() => PhotographersSession, (ph) => ph.sessionDates)
  @JoinColumn({ name: 'SessionRowID', referencedColumnName: 'SessionRowID' })
  PhotographersSessions: PhotographersSession;
}
