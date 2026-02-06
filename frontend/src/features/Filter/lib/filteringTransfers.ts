import { TAccount } from '@/entities/account/types/account.types'
import { TTransfer } from '@/entities/transfer/types/transfer.types'

export const filteringTransfers = ({
    transfers,
    accounts,
    months,
}: {
    transfers: TTransfer[]
    accounts: TAccount[]
    months: string[]
}): TTransfer[] => {
    return transfers.filter((t) => {
        const isCorrectMonth =
            !months.length || months.some((month) => t.date.startsWith(month))

        const isCorrectAccount = accounts.some(
            (a) => a.id === t.fromAccountId || a.id === t.toAccountId,
        )
        return isCorrectMonth && isCorrectAccount
    })
}
