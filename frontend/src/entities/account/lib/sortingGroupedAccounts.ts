import { GroupedAccounts } from "./groupingAccounts"


export const sortingGroupedAccounts = (groupedAccounts: GroupedAccounts[]) => {
    return groupedAccounts.sort((a, b) => a.order - b.order)
}