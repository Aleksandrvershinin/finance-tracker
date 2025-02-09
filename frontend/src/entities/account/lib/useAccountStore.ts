import { create } from 'zustand'
import { TAccount } from '../types/account.types'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { accountApi } from '../api/account.api'

interface IStore {
    isLoading: boolean
    error: null | string
    accounts: TAccount[]
    load: () => void
}

export const useAccountStore = create<IStore>((set) => ({
    isLoading: false,
    error: null,
    accounts: [],
    async load() {
        set({ isLoading: true, error: null })
        try {
            const accounts = await accountApi.index()
            set({ accounts })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
