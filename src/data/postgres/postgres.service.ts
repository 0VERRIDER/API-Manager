import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresTypeORMConfiguration } from './constants';

@Injectable()
export class PostgresService {
    private postgresTypeORMConfiguration = new PostgresTypeORMConfiguration();

    public getPostgresTypeOrmConfig(): TypeOrmModuleOptions {
        return this.postgresTypeORMConfiguration.getPostgresTypeOrmConfig();
    }

}
