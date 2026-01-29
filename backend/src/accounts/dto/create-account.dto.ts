import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAccountDto {
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    accountTagId?: number

    @IsOptional()
    @IsNumber()
    groupId?: number

    @IsNumber()
    initialBalance?: number

    @IsOptional()
    @IsNumber()
    order?: number
}
