import { Entity, Column } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class Queue extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  maxVolume: number;

  @Column({ default: true })
  isActive: boolean;
}