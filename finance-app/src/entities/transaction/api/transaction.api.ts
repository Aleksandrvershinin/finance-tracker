import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    transactionSchema,
    TTransaction,
    TTransactionForm,
} from '../types/transaction.types'

class TransactionApi {
    async getAll() {
        const res = await apiAxiosWithAuthToken.get('/transactions')
        return transactionSchema.array().parse(res.data)
    }
    async store(data: TTransactionForm) {
        const res = await apiAxiosWithAuthToken.post('/transactions', data)
        return res.data
    }

    async update(data: TTransactionForm, id: TTransaction['id']) {
        const res = await apiAxiosWithAuthToken.put(`/transactions/${id}`, data)
        return res.data
    }

    async delete(id: TTransaction['id']) {
        const res = await apiAxiosWithAuthToken.delete(`/transactions/${id}`)
        return res.data
    }
}

export const transactionApi = new TransactionApi()
