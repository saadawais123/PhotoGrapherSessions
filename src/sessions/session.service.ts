import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionType } from './entities/session.entity';
import { PhotographersSession } from './entities/photographer-session.entity';
import { LIMIT } from 'src/utils/constants';

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
    page = 1,
  }: {
    sessionType: string;
    region: string;
    fromDate: Date;
    toDate: Date;
    page: number;
  }): Promise<PhotographersSession[]> {
    const whereClause = this.buildWhereClause({ region, fromDate, toDate });
    const offset = (page - 1) * LIMIT;
    let dateWhereClause = '';
    if (fromDate || toDate) {
      const dateClause = [];
      if (fromDate) {
        dateClause.push(`sessionDates.SessionDate >= '${fromDate}'`);
      }
      if (toDate) {
        dateClause.push(`sessionDates.SessionDate <= '${toDate}'`);
      }
      dateWhereClause = dateClause.length > 0 ? `(${dateClause.join(' AND ')})` : '';
    }

    const query = this.photographerSessionRepository
      .createQueryBuilder('photoGrapherSession')
      .limit(LIMIT)
      .offset(offset)
      .select([
        'photoGrapherSession.SessionName as SessionName ',
        'photoGrapherSession.Address as Address',
        'photoGrapherSession.Location as Location',
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
        'sessionDates.SessionDate as SessionDate',
      ])
      .innerJoin(
        'tblPhotographersSessionsTypes',
        'sessionType',
        `${
          sessionType ? `sessionType.SessionType = '${sessionType}' AND` : ''
        } photoGrapherSession.SessionRowID = sessionType.SessionRowID`,
      )
      .innerJoin(
        'tblPhotographersSessionsDates',
        'sessionDates',
        `${dateWhereClause ? `${dateWhereClause} AND ` : ''} photoGrapherSession.SessionRowID = sessionDates.SessionRowID`,
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

    return clauses.length > 0 ? `(${clauses.join(' AND ')})` : '';
  };
}
