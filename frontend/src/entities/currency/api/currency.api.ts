import { apiAxios } from '@/shared/api/axiosInstance'
import { currencySchema } from '../types/currency.types'

class CurrencyApi {
    async index() {
        const res = await apiAxios.get('/currencies')
        return currencySchema.array().nonempty().parse(res.data)
    }
}

export const currencyApi = new CurrencyApi()
