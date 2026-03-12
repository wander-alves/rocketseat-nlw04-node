import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { env } from '../env';

class DatabaseClient extends DataSource {
  constructor() {
    super({
      synchronize: true,
      logging: false,
      entities: ['./src/database/entities/*.ts'],
      ...getDatabaseConfig(),
    });

    function getDatabaseConfig(): DataSourceOptions {
      switch (env.NODE_ENV) {
        case 'prod':
          return {
            type: 'postgres',
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            username: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWD,
            database: env.POSTGRES_DB,
          };
        case 'test':
          return {
            type: 'sqlite',
            database: './database/nps-test.db',
          };
        default:
          return {
            type: 'sqlite',
            database: './database/nps-dev.db',
          };
      }
    }
  }
}

const databaseClient = new DatabaseClient();

export { databaseClient };
