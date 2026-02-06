import { TAccount } from '@/entities/account/types/account.types'
import { TCategory } from '@/entities/category/types/category.types'
import { TTransaction } from '@/entities/transaction/types/transaction.types'

export const filteringTransactions = ({
    transactions,
    accounts,
    months,
    typeTransaction,
    expenseTransactionIds,
    incomeTransactionIds,
}: {
    transactions: TTransaction[]
    accounts: TAccount[]
    months: string[]
    typeTransaction?: TCategory['type']
    expenseTransactionIds?: number[]
    incomeTransactionIds?: number[]
}): TTransaction[] => {
    return transactions.filter((t) => {
        const isCorrectMonth =
            !months.length || months.some((month) => t.date.startsWith(month))

        const isCorrectAccount = accounts.some((a) => a.id === t.accountId)

        const isCorrectTypeTransaction =
            !typeTransaction || t.type === typeTransaction

        const isCorrectExpense =
            !expenseTransactionIds ||
            !expenseTransactionIds.length ||
            expenseTransactionIds.includes(t.categoryId)

        const isCorrectIncome =
            !incomeTransactionIds ||
            !incomeTransactionIds.length ||
            incomeTransactionIds.includes(t.categoryId)

        return (
            isCorrectMonth &&
            isCorrectAccount &&
            isCorrectTypeTransaction &&
            isCorrectExpense &&
            isCorrectIncome
        )
    })
}
