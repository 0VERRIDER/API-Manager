import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { checkPassword } from '../../common/functions/password/check-password.functions';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RedisService } from '../../data/redis/redis.service';
import { AUTH_STRINGS } from '../../resources/string.constants';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private redisService: RedisService,
    ) { }

    async validateEmailAndPassword(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        const isAuthorized = await checkPassword(password, user.password);

        if (user && isAuthorized) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    private async checkIfRedisTokenExists(userId: string, token: string) {
        const redisToken = await this.redisService.get(userId);
        // check if token exists in the array of rokens
        if (redisToken) {
            const tokens = JSON.parse(redisToken);
            const tokenExists = tokens.includes(token);
            return tokenExists;
        } else {
            return false;
        }
    }

    private async replaceRefreshToken(userId: string, oldToken: string, newToken: string) { 
        const redisToken = await this.redisService.get(userId);
        if (redisToken) {
            const tokens = JSON.parse(redisToken);
            const tokenIndex = tokens.indexOf(oldToken);
            tokens[tokenIndex] = newToken;
            await this.redisService.set(userId, JSON.stringify(tokens));
        }
    }

    private async deleteRefreshToken(userId: string, token: string) {
        const redisToken = await this.redisService.get(userId);
        if (redisToken) {
            const tokens = JSON.parse(redisToken);
            const tokenIndex = tokens.indexOf(token);
            tokens.splice(tokenIndex, 1);
            await this.redisService.set(userId, JSON.stringify(tokens));
        }
    }

    private async addTokenToRedis(userId: string, token: string) {
        const redisToken = await this.redisService.get(userId);
        if (redisToken) {
            const tokens = JSON.parse(redisToken);
            tokens.push(token);
            await this.redisService.set(userId, JSON.stringify(tokens));
        } else {
            await this.redisService.set(userId, JSON.stringify([token]));
        }
    }


    private async generateAccessToken(payload: any) {
        return this.jwtService.sign(payload);
    }

    private async generateRefreshToken(payload: any) {
        return this.jwtService.signAsync(
            payload,
            {
                expiresIn: jwtConstants.refreshTokenAge,
                secret: jwtConstants.refreshSecret
            }
        );
    }

    async getAccessToken(req: any) {
        const user = req.user;
        const payload = { email: user.email, sub: user.id };
        const access_token = await this.generateAccessToken(payload);
        const refresh_token_payload = { userId: user.id, access_token: access_token };
        const refresh_token = await this.generateRefreshToken(refresh_token_payload
        );
        this.addTokenToRedis(user.id, refresh_token);
        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    async refreshToken(req: any, accessToken: string) {
        const accessTokenPayload = await this.jwtService.decode(accessToken);
        // get refresh token from Authorization header with scheme 'x-refresh-token'
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException(AUTH_STRINGS.INVALID_REFRESH_TOKEN);
        }

        // get the token from the header after the prefix 'x-refresh-token'
        const refreshToken = authHeader.startsWith('x-refresh-token') && authHeader.split(' ')[1];
        // check if refresh token exists in redis
        const tokenExists = await this.checkIfRedisTokenExists(accessTokenPayload.sub, refreshToken);
        if (!tokenExists) {
            throw new UnauthorizedException(AUTH_STRINGS.INVALID_REFRESH_TOKEN);
        }

        // generate new access token
        const payload = { email: accessTokenPayload.email, sub: accessTokenPayload.sub };
        const access_token = await this.generateAccessToken(payload);
        
        // generate new refresh token
        const refresh_token_payload = { userId: accessTokenPayload.sub, access_token: access_token };
        const new_refresh_token = await this.generateRefreshToken(refresh_token_payload);

        // replace old refresh token with new refresh token
        await this.replaceRefreshToken(accessTokenPayload.sub, refreshToken, new_refresh_token);

        return {
            user: payload.sub,
            access_token: access_token,
            refresh_token: new_refresh_token
        }
    }

}
