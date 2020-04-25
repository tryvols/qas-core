import { Entity, Column, BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer";
import { UsersUtils } from "./utils";
import { BaseEntity } from "src/common/entities/base.entity";

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

  @BeforeInsert()
  async passwordEncryption(): Promise<void> {
    this.password = await UsersUtils.encodePassword(this.password);
  }
}