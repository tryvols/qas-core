import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserWithoutPassword } from './types';

@Injectable()
export class UsersUtils {
    excludePassword(user: User): UserWithoutPassword {
        const { password, encryptPassword, ...result } = user;
        return result;
    }
}