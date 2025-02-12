import { create } from 'zustand'
import { TTransfer } from '../types/transfer.types'
import { transferApi } from '../api/transfer.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

interface IStore {
    isLoading: boolean
    error: null | string
    transfers: TTransfer[]
    load: () => void
}

export const useTransfersStore = create<IStore>((set) => ({
    isLoading: false,
    error: null,
    transfers: [],
    async load() {
        set({ isLoading: true, error: null })
        try {
            const transfers = await transferApi.getAll()
            set({ transfers })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
