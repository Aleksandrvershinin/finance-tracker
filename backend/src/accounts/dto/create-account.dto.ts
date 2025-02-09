import { IsNumber, IsString } from 'class-validator'
import { IsExist } from 'src/validators/is-exist/is-exist.decorator'
import { IsUnique } from 'src/validators/is-unique/is-unique.decorator'

export class CreateAccountDto {
    @IsUnique('account', 'name')
    @IsString()
    name: string

    @IsExist('currency', 'id')
    @IsNumber()
    currencyId: number

    @IsNumber()
    initialBalance?: number
}
