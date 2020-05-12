import {
  Controller,
  Post,
  Param,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Queue } from './queue.entity';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { ReplaceQueueDto } from './dto/replace-queue.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Crud({
  model: {
    type: Queue,
  },
  query: {
    join: {
      items: {
        eager: false,
      },
      'items.user': {
        eager: false,
      },
    },
    alwaysPaginate: true,
    limit: 25,
    maxLimit: 25,
  },
  dto: {
    create: CreateQueueDto,
    update: UpdateQueueDto,
    replace: ReplaceQueueDto,
  },
})
@UseGuards(JwtAuthGuard)
@Controller('queues')
export class QueueController {
  constructor(public readonly service: QueueService) {}

  @Post(':queueId/enter')
  async enterQueue(
    @Param('queueId') queueId: number,
    @Req() req,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }

    return await this.service.addUser(queue, req.user);
  }

  @Post(':queueId/leave')
  async leaveQueue(
    @Param('queueId') queueId: number,
    @Req() req,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }

    return await this.service.removeUser(queue, req.user);
  }
}
