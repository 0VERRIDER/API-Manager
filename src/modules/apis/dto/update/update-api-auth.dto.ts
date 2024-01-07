import { PartialType } from '@nestjs/mapped-types';
import { CreateApiAuthDto } from '../create/create-api-auth.dto';

export class UpdateApiAuthDto extends PartialType(CreateApiAuthDto) {}
