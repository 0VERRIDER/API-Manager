import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export class PostgresTypeORMConfiguration {
    private getValue(key: string, throwOnMissing = true): string | undefined {
        const value = process.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    private isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public checkValues(): boolean {
        const keys = [
            'POSTGRES_HOST',
            'POSTGRES_PORT',
            'POSTGRES_USER',
            'POSTGRES_PASSWORD',
            'POSTGRES_DATABASE',
        ];

        let allFound = true;
        keys.forEach(key => {
            if (!process.env[key]) {
                console.error(`config error - missing env.${key}`);
                allFound = false;
            }
        });

        return allFound;
    }

    public getPostgresTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',

            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT') ?? '5432'),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),

            autoLoadEntities: true,

            synchronize: true,

            migrationsTableName: 'migration',

            migrations: ['src/migration/*.ts'],

            ssl: this.isProduction(),

            logging: !this.isProduction(),

            extra: {
                ssl: {
                    rejectUnauthorized: false // check and fix this later,
                }
            }

        };
    }
}