import { CurrencyDto } from 'src/currency/dto/currency.dto';
export declare class UserDto {
    id: string;
    username: string;
    role: string;
    currency: CurrencyDto;
    password: string;
}
