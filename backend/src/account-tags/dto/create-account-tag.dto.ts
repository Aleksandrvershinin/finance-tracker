import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateAccountTagDto {
    @IsString()
    name: string
    @IsString()
    color: string
}
