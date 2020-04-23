import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
    this.initUsers();
  }

  // TODO:clear-before-production
  async initUsers(): Promise<void> {
    await this.usersRepository.createQueryBuilder()
      .delete()
      .from(User)
      .execute();
    await this.usersRepository.insert([{
      username: 'john',
      password: 'changeme',
      firstName: 'John',
      lastName: 'Readlock',
    }, {
      username: 'chris',
      password: 'secret',
      firstName: 'Chris',
      lastName: 'Steelbrought',
    }, {
      username: 'maria',
      password: 'guess',
      firstName: 'Maria',
      lastName: 'Cleanington',
    }]);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async create(user: CreateUserDto): Promise<void> {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
  }
}