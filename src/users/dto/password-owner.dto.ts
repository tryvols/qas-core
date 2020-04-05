import { IsString, IsNotEmpty } from 'class-validator';
import { ValidIfCondition } from 'src/common/validators/condition.validator';

export class PasswordOwnerDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @ValidIfCondition(
        (o: PasswordOwnerDto) => o.password === o.passwordConfirmation,
        'passwordConfirmation must equals with password',
    )
    passwordConfirmation: string;
}