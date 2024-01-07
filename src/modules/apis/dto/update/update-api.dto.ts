import { PartialType } from '@nestjs/mapped-types';
import { CreateApiDto } from '../create/create-api.dto';

export class UpdateApiDto extends PartialType(CreateApiDto) {}
