import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class UpdateAccountDto {
    name?: string

    @IsExist('currency', 'id')
    currencyId?: number

    balance?: number
}
