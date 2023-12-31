import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, minLength } from "class-validator";
import { ApiEndpointType } from "../../../common/enums/api-endpoint-type.enum";
import { ApiReturnType } from "../../../common/enums/api-return-type.enum";

export class CreateApiEndpointDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsUUID()
    @IsOptional()
    apiId: string;

    @IsEnum(ApiEndpointType)
    @IsOptional()
    type: ApiEndpointType;

    @IsString()
    @IsOptional()
    path: string;

    @IsEnum(ApiReturnType)
    @IsOptional()
    returnType: ApiReturnType;
}
