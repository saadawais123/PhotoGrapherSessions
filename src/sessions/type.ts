import { Photographer } from 'src/entities/photographer.entity';
import { PhotographersSession } from './entities/photographer-session.entity';

export type PhotographersSessionResponsePayload = PhotographersSession & Photographer;
