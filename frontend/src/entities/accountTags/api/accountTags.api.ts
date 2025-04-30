import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    accountTagSchema,
    TAccountTag,
    TAccountTagForm,
} from '../types/accountTags.types'

class AccountTagsApi {
    async getAll() {
        const res = await apiAxiosWithAuthToken.get('/account-tags')
        return accountTagSchema.array().parse(res.data)
    }
    async store(data: TAccountTagForm) {
        const res = await apiAxiosWithAuthToken.post('/account-tags', data)
        return res.data
    }

    async update(data: TAccountTagForm, id: TAccountTag['id']) {
        const res = await apiAxiosWithAuthToken.patch(
            `/account-tags/${id}`,
            data,
        )
        return res.data
    }

    async delete(id: TAccountTag['id']) {
        const res = await apiAxiosWithAuthToken.delete(`/account-tags/${id}`)
        return res.data
    }
}

export const accountTagsApi = new AccountTagsApi()
