import { Controller, UseGuards, Post, Req, HttpCode, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('registration')
  @HttpCode(201)
  async registration(@Body() createUserDto: CreateUserDto) {
    this.authService.register(createUserDto);
  }
}