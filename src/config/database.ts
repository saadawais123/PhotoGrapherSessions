import { Logger } from '@nestjs/common';
import { join } from 'path';
import * as dotenv from 'dotenv';

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();

export const dbConfig = (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT) || 5432,
  username: process.env.MYSQLUSERNAME,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: false,
  logging: true,
});

if (process.env.NODE_ENV === 'development') {
  Logger.debug(dbConfig());
}

export default dbConfig();
