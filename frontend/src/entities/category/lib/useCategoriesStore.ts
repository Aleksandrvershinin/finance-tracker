import { create } from 'zustand'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { TCategory } from '../types/category.types'
import { categoryApi } from '../api/category.api'

interface IStore {
    isLoading: boolean
    error: null | string
    categories: TCategory[]
    load: () => void
}

export const useCategoriesStore = create<IStore>((set) => ({
    isLoading: false,
    error: null,
    categories: [],
    async load() {
        set({ isLoading: true, error: null })
        try {
            const categories = await categoryApi.getAll()
            set({ categories })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
