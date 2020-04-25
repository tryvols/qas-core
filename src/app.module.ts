import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config';
import { UniqueValidator } from './common/validators/unique.validator';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        UsersModule,
        AuthModule,
        QueueModule,
    ],
    providers: [
        UniqueValidator,
    ],
})
export class AppModule {}
