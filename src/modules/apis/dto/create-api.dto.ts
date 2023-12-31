import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiType } from "../../../common/enums/api-type.enum";

export class CreateApiDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(ApiType)
    type: ApiType;
}
