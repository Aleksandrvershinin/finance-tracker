import { IsString } from 'class-validator'

export class CreateAccountTagDto {
    @IsString()
    name: string
}
