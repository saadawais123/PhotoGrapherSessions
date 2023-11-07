import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { dbConfig } from './database';

interface iConfig {
  env: string;
  port: number;
  database: MysqlConnectionOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: dbConfig(),
});
