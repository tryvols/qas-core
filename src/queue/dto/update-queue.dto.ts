import { BaseQueueDto } from "./base-queue.dto";
import { IsOptional } from "class-validator";

export class UpdateQueueDto extends BaseQueueDto {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;
}
