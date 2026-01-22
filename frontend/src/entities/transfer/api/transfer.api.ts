import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    transferSchema,
    TTransfer,
    TTransferForm,
} from '../types/transfer.types'
import { queryOptions } from '@tanstack/react-query'

export const transferApi = {
    getTransferListQueryOptions: () => {
        return queryOptions({
            queryKey: ['transfers', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/transfers')
                return transferSchema.array().parse(res.data)
            },
            refetchOnReconnect: false,
            refetchOnMount: false
        })
    },
    store: async (data: TTransferForm) => {
        const res = await apiAxiosWithAuthToken.post('/transfers', data)
        return res.data
    },
    delete: async (id: TTransfer['id']) => {
        const res = await apiAxiosWithAuthToken.delete(`/transfers/${id}`)
        return res.data
    }
}
