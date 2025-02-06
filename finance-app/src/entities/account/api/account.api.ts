import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { accountSchema, TAccountForm } from '../types/account.types'

class AccountApi {
    async index() {
        const res = await apiAxiosWithAuthToken.get('/accounts')
        return accountSchema.array().parse(res.data)
    }
    async store(data: TAccountForm) {
        const res = await apiAxiosWithAuthToken.post('/accounts', data)
        return res.data
    }
}

export const accountApi = new AccountApi()
