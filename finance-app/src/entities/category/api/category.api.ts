import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    categorySchema,
    TCategory,
    TCategoryForm,
} from '../types/category.types'

class CategoryApi {
    async getAll() {
        const res = await apiAxiosWithAuthToken.get('/categories')
        return categorySchema.array().parse(res.data)
    }
    async store(data: TCategoryForm) {
        const res = await apiAxiosWithAuthToken.post('/categories', data)
        return res.data
    }

    async update(data: TCategoryForm, id: TCategory['id']) {
        const res = await apiAxiosWithAuthToken.put(`/categories/${id}`, data)
        return res.data
    }

    async delete(id: TCategory['id']) {
        const res = await apiAxiosWithAuthToken.delete(`/categories/${id}`)
        return res.data
    }
}

export const categoryApi = new CategoryApi()
