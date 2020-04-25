import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Queue } from './queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueueService extends TypeOrmCrudService<Queue> {
  constructor(@InjectRepository(Queue) queueRepository: Repository<Queue>) {
    super(queueRepository);
  }
}
