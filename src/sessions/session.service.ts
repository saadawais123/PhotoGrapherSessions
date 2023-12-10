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
    neLat,
    swLat,
    neLng,
    swLng,
  }: {
    sessionType: string;
    region: string;
    fromDate: Date;
    toDate: Date;
    page: number;
    neLat: number;
    swLat: number;
    neLng: number;
    swLng: number;
  }): Promise<PhotographersSession[]> {
    const whereClause = this.buildWhereClause({
      region,
      fromDate,
      toDate,
      sessionType,
      neLat,
      swLat,
      neLng,
      swLng,
    });
    const offset = (page - 1) * LIMIT;

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
        'sessionImages.id',
        'sessionImages.ImageUrl',
      ])
      .innerJoin('photoGrapherSession.photographer', 'photographer');

    query.addSelect('sessionType.SessionType').leftJoin('photoGrapherSession.sessionType', 'sessionType');

    query.leftJoin('photoGrapherSession.sessionImages', 'sessionImages');

    query.leftJoin('photoGrapherSession.sessionDates', 'sessionDates').where(whereClause);

    query.take(LIMIT).skip(offset);
    return query.getMany();
  }

  buildWhereClause = (conditions: {
    region: string;
    fromDate: Date;
    toDate: Date;
    sessionType: string;
    neLat: number;
    swLat: number;
    neLng: number;
    swLng: number;
  }): string => {
    const clauses: string[] = [];

    if (conditions.region && !conditions.neLat && !conditions.swLat && !conditions.neLng && !conditions.swLng) {
      clauses.push(`photoGrapherSession.Region LIKE '%${conditions.region}%'`);
    }

    if (conditions.neLat && conditions.swLat && conditions.neLng && conditions.swLng) {
      clauses.push(
        `photoGrapherSession.LocationLatitude <= ${+conditions.neLat} AND photoGrapherSession.LocationLatitude >= ${+conditions.swLat}`,
      );
      clauses.push(
        `photoGrapherSession.LocationLongitude <= ${+conditions.neLng} AND photoGrapherSession.LocationLongitude >= ${+conditions.swLng}`,
      );
    }

    if (conditions.sessionType) {
      clauses.push(`sessionType.sessionType LIKE '${conditions.sessionType}'`);
    }

    if (conditions.fromDate) {
      clauses.push(`sessionDates.SessionDate >= '${conditions.fromDate}'`);
    }

    if (conditions.toDate) {
      clauses.push(`sessionDates.SessionDate <= '${conditions.toDate}'`);
    }

    return clauses.length > 0 ? `(${clauses.join(' AND ')})` : '';
  };
}
