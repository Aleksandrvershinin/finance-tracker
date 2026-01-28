import { useMemo } from 'react'
import { TAccount } from '../types/account.types'


export interface GroupedAccounts {
    id: string
    name: string
    order: number
    accounts: TAccount[]
    total: number
}

export function useGroupedAccounts(accounts: TAccount[]): GroupedAccounts[] {
    return useMemo(() => {
        const grouped = accounts.reduce((acc, account) => {
            const groupId = account.accountGroup?.id || 'ungrouped'
            const groupName = account.accountGroup?.name || 'Без группы'

            if (!acc[groupId]) {
                acc[groupId] = { id: String(groupId), order: account.accountGroup?.order ?? -1, name: groupName, accounts: [] }
            }
            acc[groupId].accounts.push(account)
            return acc
        }, {} as Record<string, { id: string, order: number, name: string; accounts: TAccount[] }>)

        const groupedArray = Object.values(grouped)
            .map((group) => ({
                ...group,
                total: group.accounts.reduce((sum, acc) => sum + acc.balance, 0),
            }))

        return groupedArray
    }, [accounts])
}
