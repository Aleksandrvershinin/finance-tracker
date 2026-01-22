import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    transactionSchema,
    TTransaction,
    TTransactionForm,
} from '../types/transaction.types'
import { queryOptions } from '@tanstack/react-query'

export const transactionApi = {
    getTransactionListQueryOptions: () => {
        return queryOptions({
            queryKey: ['transactions', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/transactions')
                return transactionSchema.array().parse(res.data)
            },
            refetchOnReconnect: false,
            refetchOnMount: false
        })
    },
    store: async (data: TTransactionForm) => {
        const res = await apiAxiosWithAuthToken.post('/transactions', data)
        return res.data
    },
    update: async (data: TTransactionForm, id: TTransaction['id']) => {
        const res = await apiAxiosWithAuthToken.put(`/transactions/${id}`, data)
        return res.data
    },
    delete: async (id: TTransaction['id']) => {
        const res = await apiAxiosWithAuthToken.delete(`/transactions/${id}`)
        return res.data
    }
}
