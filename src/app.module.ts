import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ormConfig } from './config';
import { UniqueValidator } from './common/validators/unique.validator';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        AuthModule,
        UsersModule,
    ],
    providers: [
        UniqueValidator,
    ],
    controllers: [AppController],
})
export class AppModule {}
