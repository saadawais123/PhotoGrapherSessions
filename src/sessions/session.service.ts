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
    const whereClause = this.buildWhereClause({ region, fromDate, toDate });
    const query = this.photographerSessionRepository
      .createQueryBuilder('photoGrapherSession')
      .select([
        'photoGrapherSession.SessionName as SessionName ',
        'photoGrapherSession.SessionDate as SessionDate',
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
        'sessionType.SessionType as SessionType',
      ])
      .innerJoin(
        'tblPhotographersSessionsTypes',
        'sessionType',
        `sessionType.SessionType = '${sessionType}' AND photoGrapherSession.SessionRowID = sessionType.SessionRowID`,
      )
      .innerJoin('tblPhotographers', 'photographer', 'photographer.PhotographersID = photoGrapherSession.PhotographersID')
      .where(whereClause);
    return query.getRawMany();
  }

  buildWhereClause = (conditions: { region: string; fromDate: Date; toDate: Date }): string => {
    const clauses: string[] = [];

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
