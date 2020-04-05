import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants';
import { UserWithoutPassword } from "src/users/types";
import { UsersService } from "src/users/users.service";
import { UserPayload } from "../types";
import { UnauthorizedException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: UserPayload): Promise<UserWithoutPassword> {
        const user = this.usersService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}