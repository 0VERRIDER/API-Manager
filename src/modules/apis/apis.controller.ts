import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';


@Controller('api')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post("create")
  async createApi(@Body() createApiDto: CreateApiDto) {
    return await this.apisService.createApi(createApiDto);
  }

  @Get("all")
  findAllApi() {
    return this.apisService.findAllApi();
  }

  @Patch('update/:id')
  updateApi(@Param('id') id: string, @Body() updateApiDto: any) {
    return this.apisService.updateApi(id, updateApiDto);
  }

  @Delete('delete/:id')
  removeApi(@Param('id') id: string) {
    return this.apisService.removeApi(id);
  }

  @Post("create/auth/:apiId")
  createApiAuth(@Param("apiId") apiId: string, @Body() createApiAuthDto: any) {
    return this.apisService.createApiAuth(createApiAuthDto);
  }

  @Get("auth/:apiId/all")
  findAllApiAuth(@Param("apiId") apiId: string) {
    return this.apisService.findAllApiAuth();
  }

  @Get("auth/:apiId/:id")
  findApiAuth(@Param("apiId") apiId: string, @Param("id") id: string) {
    return this.apisService.findApiAuth(id);
  }

  @Patch("auth/:apiId/update/:id")
  updateApiAuth(@Param("apiId") apiId: string, @Param("id") id: string, @Body() updateApiAuthDto: any) {
    return this.apisService.updateApiAuth(id, updateApiAuthDto);
  }

  @Delete("auth/:apiId/delete/:id")
  removeApiAuth(@Param("apiId") apiId: string, @Param("id") id: string) {
    return this.apisService.removeApiAuth(id);
  }

  @Post("create/endpoint/:apiId")
  createApiEndpoint(@Body() createApiEndpointDto: any) {
    return this.apisService.createApiEndpoint(createApiEndpointDto);
  }

  @Get("endpoint/:apiId/all")
  findAllApiEndpoint(@Param("apiId") apiId: string) {
    return this.apisService.findAllApiEndpoint();
  }

  @Get("endpoint/:apiId/:id")
  findApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string) {
    return this.apisService.findApiEndpoint(id);
  }

  @Patch("endpoint/:apiId/update/:id")
  updateApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string, @Body() updateApiEndpointDto: any) {
    return this.apisService.updateApiEndpoint(id, updateApiEndpointDto);
  }

  @Delete("endpoint/:apiId/delete/:id")
  removeApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string) {
    return this.apisService.removeApiEndpoint(id);
  }

}
