import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';

@Controller('api/manage')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post("create/api")
  createApi(@Body() createApiDto: CreateApiDto) {
    return this.apisService.createApi(createApiDto);
  }

  @Post("create/auth")
  createApiAuth(@Body() createApiAuthDto: any) {
    return this.apisService.createApiAuth(createApiAuthDto);
  }

  @Post("create/endpoint")
  createApiEndpoint(@Body() createApiEndpointDto: any) {
    return this.apisService.createApiEndpoint(createApiEndpointDto);
  }

}
