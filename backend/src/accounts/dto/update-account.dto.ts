import { IsNumber, IsString } from 'class-validator'

export class UpdateAccountDto {
    @IsString()
    name: string

    @IsNumber()
    initialBalance?: number
}
