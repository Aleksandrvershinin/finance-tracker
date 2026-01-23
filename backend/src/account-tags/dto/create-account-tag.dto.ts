import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateAccountTagDto {
    @IsString()
    name: string
    @IsBoolean()
    isVisible: boolean
    @IsNumber()
    order: number
}
