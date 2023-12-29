import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiEndpointType } from "../entities/api-endpoint-type.enum";
import { ApiReturnType } from "../entities/api-return-type.enum";

export class CreateApiEndpointDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(ApiEndpointType)
    type: ApiEndpointType;

    @IsString()
    baseUrl: string;

    @IsEnum(ApiReturnType)
    returnType: ApiReturnType;
}
