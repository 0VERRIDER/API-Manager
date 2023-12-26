import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ErrorDataType, ResponseDataType } from 'src/configs/types/response.type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any): Promise<ResponseDataType<any>> {
        return {
            message: 'Login successful',
            data: {
                tokens: await this.authService.getAccessToken(req),
                user: req.user.username
            }
        }
    }

    @UseGuards(AuthGuard('jwt-refresh-token'))
    @Post('refresh-token')
    async refreshToken(@Request() req: any): Promise<ResponseDataType<any>> {
        const { access_token } = req.body;
        const validateRefreshToken = await this.authService.refreshToken(req, access_token);
        if(validateRefreshToken) {
            return {
                message: 'Refresh token successful',
                data: {...validateRefreshToken}
            }
        } else {
            const error: ErrorDataType = {
                statusCode: 401,
                message: 'Error Generating Refresh Token',
                status: 'error'
            }

            throw error;
        }
    }
}