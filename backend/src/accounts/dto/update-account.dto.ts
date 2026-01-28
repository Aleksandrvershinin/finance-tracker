import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAccountDto {
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
}
