import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiType } from "../entities/api-type.enum";

export class CreateApiDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(ApiType)
    type: ApiType;
}
