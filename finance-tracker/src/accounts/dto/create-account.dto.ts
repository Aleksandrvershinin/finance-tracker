import { IsExist } from 'src/validators/is-exist/is-exist.decorator'

export class CreateAccountDto {
    name: string

    @IsExist('currency', 'id')
    currencyId: number

    balance?: number
}
