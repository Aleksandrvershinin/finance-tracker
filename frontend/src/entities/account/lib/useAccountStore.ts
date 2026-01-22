import { create } from 'zustand'

interface IStore {
    filteredAccountIds: number[]
    selectedAccountIds: number[]
    selectedTagIds: number[]
    selectedMonths: string[]

    setSelectedMonths: (months: string[]) => void
    filterAccounts: (accountIds: number[], tagIds: number[], allIds: number[]) => void
    resetFilters: (allIds: number[]) => void
}

export const useAccountStore = create<IStore>((set) => ({
    filteredAccountIds: [],
    selectedAccountIds: [],
    selectedTagIds: [],
    selectedMonths: [new Date().toISOString().slice(0, 7)],

    setSelectedMonths: (months) => set({ selectedMonths: months }),

    filterAccounts(accountIds, tagIds, allIds) {
        set({
            selectedAccountIds: accountIds,
            selectedTagIds: tagIds,
            filteredAccountIds:
                accountIds.length || tagIds.length ? allIds : allIds,
        })
    },

    resetFilters(allIds) {
        set({
            selectedAccountIds: [],
            selectedTagIds: [],
            selectedMonths: [new Date().toISOString().slice(0, 7)],
            filteredAccountIds: allIds,
        })
    },
}))