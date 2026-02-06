// dto/confirm-login-code.dto.ts
import { IsEmail, Length } from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class ConfirmLoginCodeDto {
    @IsExist('user', 'email')
    @IsEmail()
    email: string

    @Length(6, 6)
    code: string
}
