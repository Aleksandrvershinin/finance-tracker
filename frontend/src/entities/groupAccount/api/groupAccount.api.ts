import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { queryOptions } from '@tanstack/react-query'
import { groupAccountSchema, type TGroupAccount, type TGroupAccountForm } from '../types/groupAccount.types'

export const groupAccountApi = {
    getGroupAccountListQueryOptions: () => {
        return queryOptions({
            queryKey: ['groupAccounts', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/account-groups')
                return groupAccountSchema.array().parse(res.data)
            },
            refetchOnReconnect: false
        })
    },
    getAll: async () => {
        const res = await apiAxiosWithAuthToken.get('/account-groups')
        return groupAccountSchema.array().parse(res.data)
    },
    store: async (data: TGroupAccountForm) => {
        const res = await apiAxiosWithAuthToken.post('/account-groups', data)
        return res.data
    },

    update: async (data: TGroupAccountForm, id: TGroupAccount['id']) => {
        const res = await apiAxiosWithAuthToken.patch(
            `/account-groups/${id}`,
            data,
        )
        return res.data
    },
    delete: async (id: TGroupAccount['id']) => {
        const res = await apiAxiosWithAuthToken.delete(`/account-groups/${id}`)
        return res.data
    }
}

