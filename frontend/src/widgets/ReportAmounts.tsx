import { TransactionTypeSchema } from '@/entities/category/types/category.types'
import { TTransaction } from '@/entities/transaction/types/transaction.types'
import { useUserStore } from '@/entities/user/lib/useUserStore'
import { getCategoryType } from '@/shared/lib/getCategoryType'

interface Props {
    transactions: TTransaction[]
}

const transactionTypes = TransactionTypeSchema.enum

function ReportAmounts({ transactions }: Props) {
    const user = useUserStore((state) => state.user)
    const totalIncome = transactions
        .filter((t) => t.type === transactionTypes.INCOME)
        .reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = transactions
        .filter((t) => t.type === transactionTypes.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0)
    return (
        <div className="flex gap-x-4 mt-4">
            <p className="text-green-600 text-lg font-semibold">
                {getCategoryType('INCOME')}: {totalIncome.toLocaleString()}{' '}
                {user?.currency.symbol}
            </p>
            <p className="text-red-600 text-lg font-semibold">
                {getCategoryType('EXPENSE')}: {totalExpense.toLocaleString()}{' '}
                {user?.currency.symbol}
            </p>
            <p className="text-blue-600 text-lg font-semibold">
                Остаток : {(totalIncome - totalExpense).toLocaleString()}{' '}
                {user?.currency.symbol}
            </p>
        </div>
    )
}

export default ReportAmounts
