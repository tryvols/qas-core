import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { QueueItem } from './queue-item.entity';
import { QueueItemService } from './queue-item.service';

@Crud({
  model: {
    type: QueueItem,
  },
  query: {
    join: {
      user: {
        eager: true,
      }
    }
  },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('queue-items')
export class QueueItemController {
  constructor(public readonly service: QueueItemService) {}
}
