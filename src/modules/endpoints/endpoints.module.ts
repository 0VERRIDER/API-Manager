import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';

@Module({
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {}
