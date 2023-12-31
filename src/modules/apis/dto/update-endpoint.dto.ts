import { PartialType } from '@nestjs/mapped-types';
import { CreateApiEndpointDto } from './create-endpoint .dto';

export class UpdateEndpointApiDto extends PartialType(CreateApiEndpointDto) {}
