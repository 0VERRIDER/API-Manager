import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ResponseDataType } from 'src/types/response.type';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any): Promise<ResponseDataType<any>> {
        return {
            message: 'Login successful',
            data: await this.authService.generateAccessToken(req.user)
        }
    }
}