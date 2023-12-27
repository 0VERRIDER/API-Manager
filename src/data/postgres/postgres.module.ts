import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(new PostgresService().getPostgresTypeOrmConfig()),
  ],
  providers: [PostgresService],
})
export class PostgresModule {}
