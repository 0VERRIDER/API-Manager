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
    return this.apisRepository.save(createApiDto);
  }

  findAllApi() {
    return this.apisRepository.find();
  }

  findApi(id: string) {
    return this.apisRepository.findOne({
      where: {
        id
      }
    });
  }

  updateApi(id: string, updateApiDto: UpdateApiDto) {
    return this.apisRepository.update(id, updateApiDto);
  }

  removeApi(id: string) {
    return this.apisRepository.delete(id);
  }

  createApiAuth(createApiAuthDto: any) {
    return this.apiAuthsRepository.save(createApiAuthDto);
  }

  findAllApiAuth() {
    return this.apiAuthsRepository.find();
  }

  findApiAuth(id: string) {
    return this.apiAuthsRepository.findOne({
      where: {
        id
      }
    });
  }

  updateApiAuth(id: string, updateApiAuthDto: any) {
    return this.apiAuthsRepository.update(id, updateApiAuthDto);
  }

  removeApiAuth(id: string) {
    return this.apiAuthsRepository.delete(id);
  }

  createApiEndpoint(createApiEndpointDto: any) {
    return this.apiEndpointsRepository.save(createApiEndpointDto);
  }

  findAllApiEndpoint() {
    return this.apiEndpointsRepository.find();
  }

  findApiEndpoint(id: string) {
    return this.apiEndpointsRepository.findOne({
      where: {
        id
      }
    });
  }

  updateApiEndpoint(id: string, updateApiEndpointDto: any) {
    return this.apiEndpointsRepository.update(id, updateApiEndpointDto);
  }

  removeApiEndpoint(id: string) {
    return this.apiEndpointsRepository.delete(id);
  }
}