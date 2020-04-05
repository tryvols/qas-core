import { IsString, IsNotEmpty } from 'class-validator';
import { PasswordOwnerDto } from './password-owner.dto';
import { Unique } from 'src/common/validators/unique.validator';
import { User } from '../user.entity';

export class CreateUserDto extends PasswordOwnerDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Unique(User)
    username: string;
}