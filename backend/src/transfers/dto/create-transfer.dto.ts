import {
    IsInt,
    IsISO8601,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class CreateTransferDto {
    @IsExist('account', 'id')
    @IsInt()
    fromAccountId: number

    @IsExist('account', 'id')
    @IsInt()
    toAccountId: number

    @IsNumber()
    @Min(0)
    amount: number

    @IsISO8601()
    date: Date

    @IsOptional()
    @IsString()
    comment?: string
}
