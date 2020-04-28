import { Controller, UseGuards, Get, Req, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "./user.entity";
import { Crud } from "@nestjsx/crud";
import { UsersService } from "./users.service";

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getManyBase']
  }
})
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(public readonly service: UsersService) {}

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Req() req) {
    return this.service.findOne(req.user.id);
  }
}