import { TCategory } from '@/entities/category/types/category.types'
import { create } from 'zustand'

export interface FilterState {
    selectedAccountIds: number[]
    selectedGroupIds: number[]
    selectedTagIds: number[]
    selectedMonths: string[]
    selectedExpenseTransactionIds: number[]
    selectedIncomeTransactionIds: number[]
    selectedTypeTransaction: TCategory['type'] | null

    setAccountIds: (ids: number[]) => void
    setGroupAccountIds: (ids: number[]) => void
    setTagAccountIds: (ids: number[]) => void
    setMonths: (months: string[]) => void
    setExpenseTransactionIds: (ids: number[]) => void
    setIncomeTransactionIds: (ids: number[]) => void
    setTypeTransaction: (type: TCategory['type'] | null) => void
}

export const useFilterStore = create<FilterState>((set) => ({
    selectedAccountIds: [],
    selectedGroupIds: [],
    selectedTagIds: [],
    selectedMonths: [new Date().toISOString().slice(0, 7)],
    selectedExpenseTransactionIds: [],
    selectedIncomeTransactionIds: [],
    selectedTypeTransaction: null,

    setAccountIds: (ids) => set({ selectedAccountIds: ids }),
    setGroupAccountIds: (ids) => set({ selectedGroupIds: ids }),
    setTagAccountIds: (ids) => set({ selectedTagIds: ids }),
    setMonths: (months) => set({ selectedMonths: months }),
    setExpenseTransactionIds: (ids) => set({ selectedExpenseTransactionIds: ids }),
    setIncomeTransactionIds: (ids) => set({ selectedIncomeTransactionIds: ids }),
    setTypeTransaction: (type) => set({ selectedTypeTransaction: type })
}))
