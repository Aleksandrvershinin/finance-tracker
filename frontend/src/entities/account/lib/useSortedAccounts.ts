import { useMemo } from "react"
import { GroupedAccounts } from "./useGroupedAccounts"


export const useSortedAccounts = (groupedAccounts: GroupedAccounts[]) => {
    return useMemo(() => (
        groupedAccounts.sort((a, b) => {
            if (a.name === 'Без группы') return -1
            if (b.name === 'Без группы') return 1
            return a.name.localeCompare(b.name)
        })), [groupedAccounts])
}