import { create } from 'zustand'
import { TTransaction } from '../types/transaction.types'
import { transactionApi } from '../api/transaction.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

interface IStore {
    isLoading: boolean
    error: null | string
    transactions: TTransaction[]
    load: () => void
}

export const useTransactionsStore = create<IStore>((set) => ({
    isLoading: false,
    error: null,
    transactions: [],
    async load() {
        set({ isLoading: true, error: null })
        try {
            const transactions = await transactionApi.getAll()
            set({ transactions })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
