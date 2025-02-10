import { create } from 'zustand'
import { TCurrency } from '../types/currency.types'
import { currencyApi } from '../api/currency.api'

interface TStore {
    isLoading: boolean
    error: null | string
    currencies: TCurrency[]
    loadCurrencies: () => void
}

export const useCurrencyStore = create<TStore>((set) => ({
    isLoading: false,
    error: null,
    currencies: [],
    async loadCurrencies() {
        set({ error: null, isLoading: true })
        try {
            const currencies = await currencyApi.index()
            set({ currencies })
        } catch (error) {
            if (error instanceof Error) {
                set({ error: error.message })
            } else {
                set({ error: 'An unknown error occurred' })
            }
        } finally {
            set({ isLoading: false })
        }
    },
}))
