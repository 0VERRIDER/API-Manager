import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from '../users/entities/user.entity';
import { ApisService } from '../apis/apis.service';

@Injectable()
export class CallersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly apisService: ApisService,
    ) {}

  async getRequestedServiceUrl(apiName:string, endpointName: string, body: any) {
    const api = await this.apisService.findApiByName(apiName);
    const endpoint = await this.apisService.findApiEndpointByName(api.id, endpointName);
    const apiAuth = await this.apisService.findApiAuthByApiId(api.id);

    return {
      api,
      endpoint,
      auth: apiAuth,
    }
  }

  async create(apiName:string, endpointName: string, body: any) {
    const requestedServiceData = await this.getRequestedServiceUrl(apiName, endpointName, body);
    return {
      message: "Data retrieved successfully",
      data: {
        apiName,
        endpointName,
        body,
        requestedServiceData,
      }
    };
  }

  async get(user: User, apiName:string, endpointName: string, body: any) {
  }

  async update(user: User, apiName:string, endpointName: string, body: any) {
  }

  async delete(user: User, apiName:string, endpointName: string, body: any) {
  }
}
