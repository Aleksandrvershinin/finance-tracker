import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    transferSchema,
    TTransfer,
    TTransferForm,
} from '../types/transfer.types'

class TransferApi {
    async getAll() {
        const res = await apiAxiosWithAuthToken.get('/transfers')
        return transferSchema.array().parse(res.data)
    }
    async store(data: TTransferForm) {
        const res = await apiAxiosWithAuthToken.post('/transfers', data)
        return res.data
    }

    async delete(id: TTransfer['id']) {
        const res = await apiAxiosWithAuthToken.delete(`/transfers/${id}`)
        return res.data
    }
}

export const transferApi = new TransferApi()
