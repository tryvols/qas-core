import { BaseEntity } from "src/common/entities/base.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { Queue } from "src/queue/queue.entity";

@Entity()
export class QueueItem extends BaseEntity {
  @Column()
  priority: number;

  @ManyToOne(type => User, user => user.queueItems)
  user: User;

  @ManyToOne(type => Queue, queue => queue.items)
  queue: Queue;
}