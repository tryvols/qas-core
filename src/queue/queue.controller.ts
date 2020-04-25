import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Queue } from './queue.entity';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { ReplaceQueueDto } from './dto/replace-queue.dto';

@Crud({
  model: {
    type: Queue,
  },
  dto: {
    create: CreateQueueDto,
    update: UpdateQueueDto,
    replace: ReplaceQueueDto,
  },
})
@Controller('queues')
export class QueueController {
  constructor(public service: QueueService) {}
}
