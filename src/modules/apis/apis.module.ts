import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from './entities/api.entity';
import { ApiAuth } from './entities/api-auth.entity';
import { ApiEndpoint } from './entities/api-endpoint.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Api,
      ApiAuth,
      ApiEndpoint,
    ]),
  ],
  controllers: [ApisController],
  providers: [ApisService],
})
export class ApisModule {}
