import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './data/redis/redis.module';
import { PostgresModule } from './data/postgres/postgres.module';
import { ApisModule } from './modules/apis/apis.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostgresModule,
    RedisModule,
    PostgresModule,
    ApisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
