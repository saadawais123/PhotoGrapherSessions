import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tblPhotographers')
export class Photographer {
  @PrimaryGeneratedColumn()
  PhotographersID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PhotographerCompanyName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Instagram: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Website: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Facebook: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PreferredContactMethod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CompanyNotes: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PhotographerFirstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PhotographerLastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PhotographerPhone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PhotographerEmail: string;
}
