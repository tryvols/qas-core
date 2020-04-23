import { IsNotEmpty, IsString, Length, MinLength, MaxLength } from "class-validator";
import { ValidIfCondition } from "src/common/validators/condition.validator";
import { Unique } from "src/common/validators/unique.validator";
import { User } from "../user.entity";

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @Unique(User, 'Username must be unique')
  username: string;
  
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @MinLength(2)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @ValidIfCondition(
    dto => dto.password === dto.passwordConfirmation,
    'passwordConfirmation field must be equal with password field',
  )
  passwordConfirmation: string;
}