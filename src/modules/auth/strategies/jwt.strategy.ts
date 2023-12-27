import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("x-auth-token"),
            secretOrKey: jwtConstants.accessSecret
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("x-refresh-token"),
            secretOrKey: jwtConstants.refreshSecret
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, accessToken: payload.access_token }
    }
}