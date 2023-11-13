import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionType } from './entities/session.entity';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PhotographersSession } from './entities/photographer-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionType, PhotographersSession])],
  controllers: [SessionController],

  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
