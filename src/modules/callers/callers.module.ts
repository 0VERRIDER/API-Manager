import { Module } from '@nestjs/common';
import { CallersService } from './callers.service';
import { CallersController } from './callers.controller';
import { HttpModule } from '@nestjs/axios';
import { ApisModule } from '../apis/apis.module';

@Module({
  controllers: [CallersController],
  providers: [CallersService],
  imports: [HttpModule, ApisModule],
})
export class CallersModule {}
