import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionType } from './entities/session.entity';
import { PhotographersSession } from './entities/photographer-session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionType)
    private readonly sessionRepository: Repository<SessionType>,

    @InjectRepository(PhotographersSession)
    private readonly photographerSessionRepository: Repository<PhotographersSession>,
  ) {}

  async findAll(): Promise<SessionType[]> {
    return this.sessionRepository.find();
  }

  async getPhotographerSessions({
    sessionType,
    region,
    fromDate,
    toDate,
  }: {
    sessionType: string;
    region: string;
    fromDate: Date;
    toDate: Date;
  }): Promise<PhotographersSession[]> {
    const whereClause = this.buildWhereClause({ sessionType, region, fromDate, toDate });
    const query = this.photographerSessionRepository
      .createQueryBuilder('photoGrapherSession')
      .select([
        'photoGrapherSession.SessionName as SessionName ',
        'photoGrapherSession.SessionDate as SessionDate',
        'photoGrapherSession.SessionRowId as SessionType',
        'photoGrapherSession.Address as Address',
        'photoGrapherSession.LocationLongitude as LocationLongitude ',
        'photoGrapherSession.LocationLatitude as LocationLatitude',
        'photoGrapherSession.Region as Region',
        'photoGrapherSession.PhotographersID as PhotographersID',
        'photographer.PhotographerCompanyName as PhotographerCompanyName',
        'photographer.Instragram as Instragram',
        'photographer.Website as Website',
        'photographer.Facebook as Facebook',
        'photographer.PreferredContactMethod as PreferredContactMethod',
        'photographer.CompanyNotes as CompanyNotes',
        'photographer.PhotographerFirstName as PhotographerFirstName',
        'photographer.PhotographerLastName as PhotographerLastName',
        'photographer.PhotographerPhone as PhotographerPhone',
        'photographer.PhotographerEmail as PhotographerEmail',
      ])
      .innerJoin('tblPhotographers', 'photographer', 'photographer.PhotographersID = photoGrapherSession.PhotographersID')
      .where(whereClause, {
        sessionType,
        region,
      });
    console.log('wqu', query.getQuery());
    return query.getRawMany();
  }

  buildWhereClause = (conditions: { sessionType: string; region: string; fromDate: Date; toDate: Date }): string => {
    const clauses: string[] = [];

    if (conditions.sessionType) {
      clauses.push(`photoGrapherSession.SessionName LIKE '%${conditions.sessionType}%'`);
    }

    if (conditions.region) {
      clauses.push(`photoGrapherSession.Region LIKE '%${conditions.region}%'`);
    }

    if (conditions.fromDate || conditions.toDate) {
      const dateClause = [];
      if (conditions.fromDate) {
        dateClause.push(`photoGrapherSession.SessionDate >= '${conditions.fromDate}'`);
      }
      if (conditions.toDate) {
        dateClause.push(`photoGrapherSession.SessionDate <= '${conditions.toDate}'`);
      }
      clauses.push(dateClause.join(' AND '));
    }

    return clauses.length > 0 ? `(${clauses.join(' AND ')})` : '';
  };
}
