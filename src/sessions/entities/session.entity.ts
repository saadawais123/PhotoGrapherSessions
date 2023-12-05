import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PhotographersSession } from './photographer-session.entity';
import { PhotographerSessionType } from './photographer-session-type.entity';

@Entity('tblSessionTypes')
export class SessionType {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  SessionType: string;

  @OneToMany(() => PhotographersSession, (ph) => ph.sessionType)
  PhotographersSessions: PhotographersSession[];

  @OneToMany(() => PhotographerSessionType, (ph) => ph.sessionType)
  photographerSessionTypes: PhotographerSessionType[];
}
