import { apiAxios } from '@/shared/api/axiosInstance'
import { currencySchema } from '../types/currency.types'
import { queryOptions } from '@tanstack/react-query'


export const currencyApi = {
    getCurrencyListQueryOptions: () => {
        return queryOptions({
            queryKey: ['currency', 'list'],
            queryFn: async () => {
                const res = await apiAxios.get('/currencies')
                return currencySchema.array().nonempty().parse(res.data)
            },
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        })
    }
}
