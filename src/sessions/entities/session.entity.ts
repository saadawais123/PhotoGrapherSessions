import { Entity, PrimaryColumn } from 'typeorm';

@Entity('tblSessionTypes')
export class SessionType {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  SessionType: string;
}
