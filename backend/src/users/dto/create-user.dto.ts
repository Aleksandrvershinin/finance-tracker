import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
import { IsUnique } from 'src/validators/is-unique/is-unique.decorator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsUnique('user', 'email')
  email: string
}
