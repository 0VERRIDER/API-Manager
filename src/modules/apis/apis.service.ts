import { Inject, Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from './entities/api.entity';
import { ApiAuth } from './entities/api-auth.entity';
import { ApiEndpoint } from './entities/api-endpoint.entity';
@Injectable()
export class ApisService {
  constructor(
    @InjectRepository(Api) private apisRepository: Repository<Api>,
    @InjectRepository(ApiAuth) private apiAuthsRepository: Repository<ApiAuth>,
    @InjectRepository(ApiEndpoint) private apiEndpointsRepository: Repository<ApiEndpoint>,
  ) { }

  createApi(createApiDto: CreateApiDto) {
    this.apisRepository.save(createApiDto);
  }

  createApiAuth(createApiAuthDto: any) {
    this.apiAuthsRepository.save(createApiAuthDto);
  }

  createApiEndpoint(createApiEndpointDto: any) {
    this.apiEndpointsRepository.save(createApiEndpointDto);
  }
}
