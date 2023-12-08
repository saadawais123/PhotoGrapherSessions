import { Controller, Get, Query } from '@nestjs/common';
import { SessionType } from './entities/session.entity';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { PhotographersSession } from './entities/photographer-session.entity';
@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('/')
  getSessions(): Promise<SessionType[]> {
    return this.sessionService.findAll();
  }

  @Get('photographers/')
  async getTicket(
    @Query('sessionType') sessionType: string,
    @Query('region') region: string,

    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
    @Query('page') page: number,
    @Query('neLat') neLat: number,
    @Query('swLat') swLat: number,
    @Query('neLng') neLng: number,
    @Query('swLng') swLng: number,
  ): Promise<PhotographersSession[]> {
    return await this.sessionService.getPhotographerSessions({
      sessionType,
      region,
      fromDate,
      toDate,
      page,
      neLat,
      swLat,
      neLng,
      swLng,
    });
  }
}
