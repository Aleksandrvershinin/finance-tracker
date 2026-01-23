import { useMemo } from "react"
import { GroupedAccounts } from "./useGroupedAccounts"


export const useSortedAccounts = (groupedAccounts: GroupedAccounts[]) => {
    return useMemo(
        () => [...groupedAccounts].sort((a, b) => a.order - b.order),
        [groupedAccounts]
    )
}