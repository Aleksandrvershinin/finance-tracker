import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    password: string

    @IsExist('user', 'email')
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
}
