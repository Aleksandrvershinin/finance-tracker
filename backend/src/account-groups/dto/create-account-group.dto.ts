import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateAccountGroupDto {
    @IsString()
    name: string
    @IsBoolean()
    isVisible: boolean
    @IsNumber()
    order: number
}
