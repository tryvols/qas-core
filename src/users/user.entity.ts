import { PrimaryGeneratedColumn, Entity, Column, BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer";
import { UsersUtils } from "./utils";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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