import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    findAll(): Promise<{
        symbol: string;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }[]>;
}
