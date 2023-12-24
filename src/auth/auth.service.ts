import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { checkPassword } from 'src/functions/password/check-password.functions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateEmailAndPassword(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        const isAuthorized = await checkPassword(password, user.password);

        if(user && isAuthorized) {
            const { password, ...result } = user;
            return result;
        }

        // Otherwise, return null
        return null;
    }

    async generateAccessToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
