import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersUtils } from './users.utils';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersUtils],
  exports: [UsersService, UsersUtils, TypeOrmModule],
})
export class UsersModule {}
