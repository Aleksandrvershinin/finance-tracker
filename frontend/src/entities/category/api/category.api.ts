import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import {
    categorySchema,
    TCategory,
    TCategoryForm,
} from '../types/category.types'
import { queryOptions } from '@tanstack/react-query'


export const categoryApi = {
    getCategoryListQueryOptions: () => {
        return queryOptions({
            queryKey: ['category', 'list'],
            queryFn: async () => {
                const res = await apiAxiosWithAuthToken.get('/categories')
                return categorySchema.array().parse(res.data)
            },
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        })
    },
    store: async (data: TCategoryForm) => {
        const res = await apiAxiosWithAuthToken.post('/categories', data)
        return res.data
    },

    update: async (data: TCategoryForm, id: TCategory['id']) => {
        const res = await apiAxiosWithAuthToken.put(`/categories/${id}`, data)
        return res.data
    },

    delete: async (id: TCategory['id']) => {
        const res = await apiAxiosWithAuthToken.delete(`/categories/${id}`)
        return res.data
    }
}
