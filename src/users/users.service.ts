import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.usersRepository.findOne({ username });
    }

    async create(userDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(userDto);
        return await this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
