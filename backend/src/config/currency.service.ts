import { Injectable } from '@nestjs/common'

@Injectable()
export class CurrencyService {
  // Пример статического курса валюты, в будущем можно интегрировать API
  private currencyRate = {
    USD: 1.1, // Например, 1 RUB = 1.1 USD
    EUR: 0.9, // 1 RUB = 0.9 EUR
  }

  getRate(currency: string): number {
    return this.currencyRate[currency] || 1 // Если валюты нет, возвращаем 1 (по умолчанию)
  }

  // В дальнейшем здесь будет логика для получения данных через API
  async updateRates() {
    // Здесь будет логика обновления курса валют через внешний API
  }
}
