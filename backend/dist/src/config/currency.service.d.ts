export declare class CurrencyService {
    private currencyRate;
    getRate(currency: string): number;
    updateRates(): Promise<void>;
}
