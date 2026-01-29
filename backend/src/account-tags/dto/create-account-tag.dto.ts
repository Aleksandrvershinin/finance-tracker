import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAccountTagDto {
    @IsString()
    name: string
    @IsString()
    color: string
    @IsOptional()
    @IsNumber()
    order?: number
}
