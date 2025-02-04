import axiosInstance from '@/shared/api/axiosInstance'
import { currencySchema } from '../types/currency.types'

class CurrencyApi {
  async index() {
    const res = await axiosInstance.get('/currencies')
    return currencySchema.array().parse(res.data)
  }
}

export const currencyApi = new CurrencyApi()
