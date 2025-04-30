import { create } from 'zustand'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { TAccountTag } from '../types/accountTags.types'
import { accountTagsApi } from '../api/accountTags.api'

interface IStore {
    isLoading: boolean
    error: null | string
    accountTags: TAccountTag[]
    load: () => void
}

export const useAccountTagsStore = create<IStore>((set) => ({
    isLoading: false,
    error: null,
    accountTags: [],
    async load() {
        set({ isLoading: true, error: null })
        try {
            const accountTags = await accountTagsApi.getAll()
            set({ accountTags })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
