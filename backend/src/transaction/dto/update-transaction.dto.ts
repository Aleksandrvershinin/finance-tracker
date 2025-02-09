import {
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsEnum,
    IsISO8601,
    Min,
} from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class UpdateTransactionDto {
    @IsExist('account', 'id')
    @IsInt()
    accountId: number

    @IsExist('category', 'id')
    @IsInt()
    categoryId: number

    @IsNumber()
    @Min(0)
    amount: number

    @IsISO8601()
    date: string

    @IsOptional()
    @IsString()
    comment?: string
}
