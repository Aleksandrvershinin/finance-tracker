import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { accountSchema, TAccount, TAccountForm } from '../types/account.types'
import { queryOptions } from '@tanstack/react-query'

export const accountApi = {
    getAccountListQueryOptions: () => {
        return queryOptions({
            queryKey: ['accounts', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/accounts')
                return accountSchema.array().parse(res.data)
            },
            refetchOnReconnect: false
        })
    },

    store: async (data: TAccountForm) => {
        const res = await apiAxiosWithAuthToken.post('/accounts', data)
        return res.data
    },
    update: async (data: TAccountForm, id: TAccount['id']) => {
        const res = await apiAxiosWithAuthToken.put(`/accounts/${id}`, data)
        return res.data
    }
}

