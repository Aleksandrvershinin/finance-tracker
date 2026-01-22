import { useMemo } from 'react'
import { TAccount } from '../types/account.types'


export interface GroupedAccounts {
    name: string
    accounts: TAccount[]
    total: number
}

export function useGroupedAccounts(accounts: TAccount[]): GroupedAccounts[] {
    return useMemo(() => {
        const grouped = accounts.reduce((acc, account) => {
            const groupId = account.groupAccount?.id || 'ungrouped'
            const groupName = account.groupAccount?.name || 'Без группы'

            if (!acc[groupId]) {
                acc[groupId] = { name: groupName, accounts: [] }
            }
            acc[groupId].accounts.push(account)
            return acc
        }, {} as Record<string, { name: string; accounts: TAccount[] }>)

        const groupedArray = Object.values(grouped)
            .map((group) => ({
                ...group,
                total: group.accounts.reduce((sum, acc) => sum + acc.balance, 0),
            }))

        return groupedArray
    }, [accounts])
}
