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
    fromDate: string;
    toDate: string;
  }): Promise<PhotographersSession[]> {
    let whereClause = '';
    if (sessionType) {
      whereClause = whereClause + `photoGrapherSession.SessionName like '%${sessionType}%'`;
    }
    if (region) {
      whereClause = whereClause + ` AND photoGrapherSession.Region like '%${region}%'`;
    }
    if (fromDate || toDate) {
      whereClause =
        whereClause +
        `${fromDate ? `AND photoGrapherSession.SessionDate >= '${fromDate}'` : ''} ${
          toDate ? `AND photoGrapherSession.SessionDate <= '${toDate}'` : ''
        }`;
    }
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
    return query.getRawMany();
  }
}
