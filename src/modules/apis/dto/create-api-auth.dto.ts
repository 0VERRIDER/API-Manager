import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiType } from "../entities/api-type.enum";

export class CreateApiEndpointDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsEnum(ApiType)
    type: ApiType;

    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;

    @IsString()
    redirectUri: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsDate()
    expiresAt: Date;
}
