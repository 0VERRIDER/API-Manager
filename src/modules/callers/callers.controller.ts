import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallersService } from './callers.service';

@Controller('callers')
export class CallersController {
  constructor(private readonly callersService: CallersService) {}

  @Post(":apiName/:endpointName")
  async makeRequest(
    @Body() body: any,
    @Param("apiName") apiName: string,
    @Param("endpointName") endpointName: string,
  ) {
    return await this.callersService.create(apiName, endpointName, body);
  }
}
