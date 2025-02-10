import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'
import { IsUnique } from 'src/validators/is-unique/is-unique.decorator'

export class SignupUserDto {
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    password: string

    @IsUnique('user', 'email')
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsInt()
    @IsExist('currency', 'id')
    currencyId: number
}
