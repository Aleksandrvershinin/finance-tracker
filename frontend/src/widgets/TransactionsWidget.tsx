import TransactionsTable from '@/entities/transaction/ui/TransactionsTable'
import TrasfersTable from '@/entities/transfer/ui/TrasfersTable'
import ReportAmounts from './ReportAmounts'
import { useFilterStore } from '@/features/Filter/lib/useFilterStore'
import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { useTransactionList } from '@/entities/transaction/lib/useTransactiomList'
import { useTrasferList } from '@/entities/transfer/lib/useTrasferList'

interface Props {
    showReportAmounts: boolean
}

export default function TransactionsWidget({ showReportAmounts }: Props) {
    const { data: accounts = [] } = useAccountList()
    const filteredAccounts = useFilterAccounts(accounts)
    const { data: transactions = [] } = useTransactionList()
    const { data: transfers = [] } = useTrasferList()
    const selectedMonths = useFilterStore((s) => s.selectedMonths)
    const selectedTypeTransaction = useFilterStore(
        (s) => s.selectedTypeTransaction,
    )
    const selectedExpenseTransactionIds = useFilterStore(
        (s) => s.selectedExpenseTransactionIds,
    )
    const selectedIncomeTransactionIds = useFilterStore(
        (s) => s.selectedIncomeTransactionIds,
    )

    const filteredTransactions = transactions.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true

        const isCorrectAccount = filteredAccounts.some(
            (a) => a.id === t.accountId,
        )

        const isCorrectTypeTransaction =
            !selectedTypeTransaction || t.type === selectedTypeTransaction

        const isCorrectExpense =
            !selectedExpenseTransactionIds.length ||
            selectedExpenseTransactionIds.includes(t.categoryId)

        const isCorrectIncome =
            !selectedIncomeTransactionIds.length ||
            selectedIncomeTransactionIds.includes(t.categoryId)

        return (
            isCorrectMonth &&
            isCorrectAccount &&
            isCorrectTypeTransaction &&
            isCorrectExpense &&
            isCorrectIncome
        )
    })

    const filteredTransfers = transfers.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true
        const isCorrectAccount = filteredAccounts.some(
            (a) => a.id === t.fromAccountId || a.id === t.toAccountId,
        )
        return isCorrectMonth && isCorrectAccount
    })

    return (
        <div className="space-y-10 p-4 rounded-2xl shadow-my-soft bg-white">
            <div className="space-y-10">
                {showReportAmounts && (
                    <ReportAmounts
                        transactions={filteredTransactions}
                    ></ReportAmounts>
                )}
                <TransactionsTable
                    transactions={filteredTransactions}
                ></TransactionsTable>
                <TrasfersTable transfers={filteredTransfers}></TrasfersTable>
            </div>
        </div>
    )
}
