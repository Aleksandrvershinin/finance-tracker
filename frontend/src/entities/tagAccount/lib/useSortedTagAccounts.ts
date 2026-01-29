import { TagAccountsWithSum } from "@/entities/account/lib/useAccountsByTag"

export const useSortedTagAccounts = (tagAccounts: TagAccountsWithSum[]) => {
    return [...tagAccounts].sort((a, b) => a.order - b.order)
}