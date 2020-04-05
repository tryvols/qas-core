import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { WithAccessToken } from './types';
import { UserWithoutPassword } from 'src/users/types';
import { UsersService } from 'src/users/users.service';
import { UsersUtils } from 'src/users/users.utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersUtils: UsersUtils,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<UserWithoutPassword | null> {
        const user = await this.usersService.findOneByUsername(username);
        const passwordHash = hash(pass, 10);
        return user?.password === passwordHash
            ? this.usersUtils.excludePassword(user)
            : null;
    }

    async login(user: UserWithoutPassword): Promise<WithAccessToken> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
