import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { UsersUtils } from "./utils";
import { BaseEntity } from "src/common/entities/base.entity";
import { QueueItem } from "src/queue-item/queue-item.entity";

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(type => QueueItem, item => item.user)
  queueItems: QueueItem[];

  @BeforeInsert()
  async passwordEncryption(): Promise<void> {
    this.password = await UsersUtils.encodePassword(this.password);
  }
}