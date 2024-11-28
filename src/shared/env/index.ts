import { ConfigService } from '@nestjs/config';
import { JWT } from '../enums';

const configService = new ConfigService();

export const JWT_SECRET_KEY = configService.get(JWT.JWT_SECRET_KEY);
