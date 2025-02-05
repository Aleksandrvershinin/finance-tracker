import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
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
}
