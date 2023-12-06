import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PhotographersSession } from './photographer-session.entity';

@Entity('tblSessionImages')
export class SessionImages {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  SessionRowID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ImageUrl: string;

  @ManyToOne(() => PhotographersSession, (ph) => ph.sessionImages)
  @JoinColumn({ name: 'SessionRowID', referencedColumnName: 'SessionRowID' })
  PhotographersSessions: PhotographersSession;
}
