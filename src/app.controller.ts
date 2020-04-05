import { Controller, Post, Request, UseGuards, Get, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserWithoutPassword } from './users/types';
import { CreateUserDto } from './users/dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { WithAccessToken } from './auth/types';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<WithAccessToken> {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() userDto: CreateUserDto): Promise<WithAccessToken> {
    const user = await this.usersService.create(userDto);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): UserWithoutPassword {
    return req.user;
  }
}
