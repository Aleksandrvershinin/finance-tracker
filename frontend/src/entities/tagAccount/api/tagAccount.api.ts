import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { queryOptions } from '@tanstack/react-query'
import { tagAccountSchema, TReorderAccountTag, TTagAccount, TTagAccountForm } from '../types/tagAccount.types'

export const tagAccountApi = {
    getTagAccountListQueryOptions: () => {
        return queryOptions({
            queryKey: ['accountTags', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/account-tags')
                return tagAccountSchema.array().parse(res.data)
            },
            refetchOnReconnect: false,
        })
    },
    getAll: async () => {
        const res = await apiAxiosWithAuthToken.get('/account-tags')
        return tagAccountSchema.array().parse(res.data)
    },
    store: async (data: TTagAccountForm) => {
        const res = await apiAxiosWithAuthToken.post('/account-tags', data)
        return res.data
    },

    update: async (data: TTagAccountForm, id: TTagAccount['id']) => {
        const res = await apiAxiosWithAuthToken.patch(
            `/account-tags/${id}`,
            data,
        )
        return res.data
    },
    delete: async (id: TTagAccount['id']) => {
        const res = await apiAxiosWithAuthToken.delete(`/account-tags/${id}`)
        return res.data
    },
    reorder: async (data: TReorderAccountTag[]) => {
        const res = await apiAxiosWithAuthToken.patch('/account-tags/reorder', data)
        return res.data
    },
}

