// src/entities/account/lib/useAccountStore.ts

import { create } from 'zustand'
import { TAccount } from '../types/account.types'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { accountApi } from '../api/account.api'

interface IStore {
    isLoading: boolean
    error: null | string
    accounts: TAccount[]
    filteredAccountIds: number[]
    selectedAccountIds: number[]
    selectedTagIds: number[]
    selectedMonths: string[]

    setSelectedMonths: (months: string[]) => void
    load: () => void
    filterAccounts: (accountIds: number[], tagIds: number[]) => void
    resetFilters: () => void
}

export const useAccountStore = create<IStore>((set, get) => ({
    isLoading: false,
    error: null,
    accounts: [],
    filteredAccountIds: [],
    selectedAccountIds: [],
    selectedTagIds: [],
    selectedMonths: [new Date().toISOString().slice(0, 7)],

    setSelectedMonths: (months: string[]) => {
        set({ selectedMonths: months })
    },
    async load() {
        set({ isLoading: true, error: null })
        try {
            const accounts = await accountApi.index()
            set({ accounts, filteredAccountIds: accounts.map((a) => a.id) })
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ error: errorMessage })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    filterAccounts(accountIds, tagIds) {
        const { accounts } = get()

        const filtered = accounts.filter((account) => {
            const byAccount =
                accountIds.length === 0 || accountIds.includes(account.id)

            const byTag =
                tagIds.length === 0
                    ? true
                    : account.accountTag &&
                      tagIds.includes(account.accountTag.id)

            return byAccount && byTag
        })

        set({
            selectedAccountIds: accountIds,
            selectedTagIds: tagIds,
            filteredAccountIds: filtered.map((a) => a.id),
        })
    },

    resetFilters() {
        const { accounts } = get()
        set({
            selectedAccountIds: [],
            selectedTagIds: [],
            selectedMonths: [new Date().toISOString().slice(0, 7)],
            filteredAccountIds: accounts.map((a) => a.id),
        })
    },
}))
