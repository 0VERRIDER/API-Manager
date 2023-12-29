import { IsEnum, IsNotEmpty, IsString, IsUUID, isNotEmpty } from "class-validator";
import { ApiType } from "../entities/api-type.enum";

export class CreateApiDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(ApiType)
    type: ApiType;

    @IsUUID()
    authId: string;

    @IsUUID()
    endpointId: string;
}
