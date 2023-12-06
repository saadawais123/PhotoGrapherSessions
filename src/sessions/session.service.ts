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

      .select([
        'photoGrapherSession.SessionRowID',
        'photoGrapherSession.SessionName',
        'photoGrapherSession.HowToBook',
        'photoGrapherSession.Address',
        'photoGrapherSession.Location',
        'photoGrapherSession.LocationLongitude',
        'photoGrapherSession.LocationLatitude',
        'photoGrapherSession.Region',
        'photoGrapherSession.PhotographersID',
        'photographer.PhotographerCompanyName',
        'photographer.Instagram',
        'photographer.Website',
        'photographer.Facebook',
        'photographer.PreferredContactMethod',
        'photographer.CompanyNotes',
        'photographer.PhotographerFirstName',
        'photographer.PhotographerLastName',
        'photographer.PhotographerPhone',
        'photographer.PhotographerEmail',
        'sessionDates.SessionDate',
        'sessionDates.PhotographersSessionsDateRowID',
      ])
      .innerJoin('photoGrapherSession.photographer', 'photographer');

    query.addSelect('sessionType.SessionType').leftJoin('photoGrapherSession.sessionType', 'sessionType');

    query.leftJoin('photoGrapherSession.sessionDates', 'sessionDates').where(whereClause);
    query.take(LIMIT).skip(offset);
    return query.getMany();
  }

  buildWhereClause = (conditions: { region: string; fromDate: Date; toDate: Date }): string => {
    const clauses: string[] = [];

    if (conditions.region) {
      clauses.push(`photoGrapherSession.Region LIKE '%${conditions.region}%'`);
    }

    return clauses.length > 0 ? `(${clauses.join(' AND ')})` : '';
  };
}
