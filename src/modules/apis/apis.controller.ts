import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create/create-api.dto';
import { API_STRINGS } from 'src/resources/string.constants';
import { UpdateEndpointApiDto } from './dto/update/update-endpoint.dto';
import { CreateApiEndpointDto } from './dto/create/create-endpoint .dto';
import { UpdateApiAuthDto } from './dto/update/update-api-auth.dto';
import { CreateApiAuthDto } from './dto/create/create-api-auth.dto';
import { UpdateApiDto } from './dto/update/update-api.dto';


@Controller('api')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post("create")
  async createApi(@Body() createApiDto: CreateApiDto) {
    const createdApi =  await this.apisService.createApi(createApiDto);

    if (createdApi) {
      return {
        message: "Api created successfully",
        data: createdApi
      }
    } else {
      throw new ServiceUnavailableException(API_STRINGS.API_CREATED_ERROR);
    }
  }

  @Get()
  async findAllApi() {
    const apis = await this.apisService.findAllApi();

    if (apis.length > 0) {
      return {
        message: "Apis found",
        data: apis
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_APIS_FOUND);
    }
  }

  @Get(":id")
  async findApi(@Param('id') id: string) {
    const api = await this.apisService.findApi(id);

    if (api) {
      return {
        message: "Api found",
        data: api
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_API_ID_FOUND(id));
    }
  }

  @Patch(':id')
  async updateApi(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    const api = await this.apisService.findApi(id);

    if (!api) {
      throw new NotFoundException(API_STRINGS.NO_API_ID_FOUND(id));
    }

    const updatedApi = await this.apisService.updateApi(id, updateApiDto);

    if (updatedApi) {
      return {
        message: "Api updated successfully",
        data: updatedApi
      }
    } else {
      throw new NotAcceptableException(API_STRINGS.API_UPDATED_ERROR);
    }
  }

  @Delete(':id')
  async removeApi(@Param('id') id: string) {
    const api = await this.apisService.findApi(id);

    if (!api) {
      throw new NotFoundException(API_STRINGS.NO_API_ID_FOUND(id));
    }

    return {
      message: "Api deleted successfully",
      data: await this.apisService.removeApi(id)
    }
  }

  @Post(":apiId/create/auth")
  async createApiAuth(@Param("apiId") apiId: string, @Body() createApiAuthDto: CreateApiAuthDto) {
    const createdApiAuth = await this.apisService.createApiAuth(createApiAuthDto);

    if (createdApiAuth) {
      return {
        message: "Api auth created successfully",
        data: createdApiAuth
      }
    } else {
      throw new ServiceUnavailableException(API_STRINGS.API_AUTH_CREATED_ERROR);
    }
  }

  @Get(":apiId/auth/")
  async findAllApiAuth(@Param("apiId") apiId: string) {
    const apiAuths = await this.apisService.findAllApiAuth();

    if (apiAuths.length > 0) {
      return {
        message: "Api auths found",
        data: apiAuths
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_API_AUTHS_FOUND);
    }
  }

  @Get(":apiId/auth/:id")
  async findApiAuth(@Param("apiId") apiId: string, @Param("id") id: string) {
    const apiAuth = await this.apisService.findApiAuth(id);

    if (apiAuth) {
      return {
        message: "Api auth found",
        data: apiAuth
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_API_AUTH_ID_FOUND(id));
    }
  }

  @Patch(":apiId/auth/:id")
  async updateApiAuth(@Param("apiId") apiId: string, @Param("id") id: string, @Body() updateApiAuthDto: UpdateApiAuthDto) {
    const apiAuth = await this.apisService.findApiAuth(id);

    if (!apiAuth) {
      throw new NotFoundException(API_STRINGS.NO_API_AUTH_ID_FOUND(id));
    }

    const updatedApiAuth = await this.apisService.updateApiAuth(id, updateApiAuthDto);

    if (updatedApiAuth) {
      return {
        message: "Api auth updated successfully",
        data: updatedApiAuth
      }
    } else {
      throw new NotAcceptableException(API_STRINGS.API_AUTH_UPDATED_ERROR);
    }
  }

  @Delete(":apiId/auth/:id")
  async removeApiAuth(@Param("apiId") apiId: string, @Param("id") id: string) {
    const apiAuth = await this.apisService.findApiAuth(id);

    if (!apiAuth) {
      throw new NotFoundException(API_STRINGS.NO_API_AUTH_ID_FOUND(id));
    }

    return {
      message: "Api auth deleted successfully",
      data: await this.apisService.removeApiAuth(id)
    }
  }

  @Post(":apiId/create/endpoint")
  async createApiEndpoint(@Body() createApiEndpointDto: CreateApiEndpointDto) {
    const createdApiEndpoint = await this.apisService.createApiEndpoint(createApiEndpointDto);

    if (createdApiEndpoint) {
      return {
        message: "Api endpoint created successfully",
        data: createdApiEndpoint
      }
    } else {
      throw new ServiceUnavailableException(API_STRINGS.API_ENDPOINT_CREATED_ERROR);
    }
  }

  @Get(":apiId/endpoint")
  async findAllApiEndpoint(@Param("apiId") apiId: string) {
    const apiEndpoints = await this.apisService.findAllApiEndpoint();

    if (apiEndpoints.length > 0) {
      return {
        message: "Api endpoints found",
        data: apiEndpoints
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_API_ENDPOINTS_FOUND);
    }
  }

  @Get(":apiId/endpoint/:id")
  async findApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string) {
    const apiEndpoint = await this.apisService.findApiEndpoint(id);

    if (apiEndpoint) {
      return {
        message: "Api endpoint found",
        data: apiEndpoint
      }
    } else {
      throw new NotFoundException(API_STRINGS.NO_API_ENDPOINT_ID_FOUND(id));
    }
  }

  @Patch(":apiId/endpoint/:id")
  async updateApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string, @Body() updateApiEndpointDto: UpdateEndpointApiDto) {
    const apiEndpoint = await this.apisService.findApiEndpoint(id);

    if (!apiEndpoint) {
      throw new NotFoundException(API_STRINGS.NO_API_ENDPOINT_ID_FOUND(id));
    }

    const updatedApiEndpoint = await this.apisService.updateApiEndpoint(id, updateApiEndpointDto);

    if (updatedApiEndpoint) {
      return {
        message: "Api endpoint updated successfully",
        data: updatedApiEndpoint
      }
    } else {
      throw new NotAcceptableException(API_STRINGS.API_ENDPOINT_UPDATED_ERROR);
    }
  }

  @Delete(":apiId/endpoint/:id")
  async removeApiEndpoint(@Param("apiId") apiId: string, @Param("id") id: string) {
    const apiEndpoint = await this.apisService.findApiEndpoint(id);

    if (!apiEndpoint) {
      throw new NotFoundException(API_STRINGS.NO_API_ENDPOINT_ID_FOUND(id));
    }

    return {
      message: "Api endpoint deleted successfully",
      data: await this.apisService.removeApiEndpoint(id)
    }
  }
}
