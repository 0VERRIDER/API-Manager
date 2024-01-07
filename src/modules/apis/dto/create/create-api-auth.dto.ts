import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiAuthType } from "../../../../common/enums/api-auth-type.enum";
export class CreateApiAuthDto {

    @IsUUID()
    @IsOptional()
    apiId: string;

    @IsEnum(ApiAuthType)
    @IsOptional()
    type: ApiAuthType;

    @IsString()
    @IsOptional()
    accessToken: string;

    @IsString()
    @IsOptional()
    refreshToken: string;

    @IsString()
    @IsOptional()
    redirectUri: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsDate()
    @IsOptional()
    expiresAt: Date;
}
