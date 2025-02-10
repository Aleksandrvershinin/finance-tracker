import { Exclude, Type } from 'class-transformer'
import { CurrencyDto } from 'src/currency/dto/currency.dto'

export class UserDto {
    id: string
    username: string
    role: string

    @Type(() => CurrencyDto)
    currency: CurrencyDto

    @Exclude()
    password: string
}
