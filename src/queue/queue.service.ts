import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Queue } from './queue.entity';
import { Repository } from 'typeorm';
import { QueueItemService } from 'src/queue-item/queue-item.service';
import { User } from 'src/users/user.entity';
import { QueueItem } from 'src/queue-item/queue-item.entity';

@Injectable()
export class QueueService extends TypeOrmCrudService<Queue> {
  constructor(
    @InjectRepository(Queue) queueRepository: Repository<Queue>,
    private readonly queueItemService: QueueItemService,
  ) {
    super(queueRepository);
    this.initQueues();
  }

  async initQueues(): Promise<void> {
    const queues = await this.repo.create([{
      name: 'queue 1',
      address: 'street 1',
    }, {
      name: 'queue 2',
      address: 'street 2',
    }, {
      name: 'queue 3',
      address: 'street 3',
    }]);
    await this.repo.save(queues);
  }

  async addUser(queue: Queue, user: User): Promise<QueueItem> {
    if (await this.queueItemService.exists(queue, user)) {
      throw new BadRequestException('User already exists in queue.');
    }
    return await this.queueItemService.addItem(queue, user);
  }

  async removeUser(queue: Queue, user: User): Promise<QueueItem> {
    return await this.queueItemService.removeItem(queue, user);
  }
}
