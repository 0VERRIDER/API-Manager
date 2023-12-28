// create a role guard using the findall function from the users 
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UsersService, private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        // TODO: FIX THE LOGIC
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (!authorization || !authorization.startsWith('x-access-token ')) {
            return false;
        }
        const jwt = request.headers.authorization.split(' ')[1];
        const userId = this.jwtService.decode(jwt)['userId'];

        const user = await this.usersService.findOne(userId);

        const hasRole = () => roles.indexOf(user.role) > -1;

        return user && user.role && hasRole();
    }
}